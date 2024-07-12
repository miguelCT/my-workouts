/* eslint-disable import/prefer-default-export */
import { db } from "@/server/db";
import { exerciseEntries, exerciseTemplates, routines } from "@/server/db/schema";
import { desc, eq } from "drizzle-orm";
import groupBy from 'lodash.groupby';
import { unstable_noStore as noStore } from 'next/cache';
import { notFound } from "next/navigation";
import { type Exercise, type ExerciseTemplate, type Routine, type RoutineItem } from "./definitions";
// import {routines as mockRoutines} from './mockData'


export async function fetchRoutine(routineId: string): Promise<Routine> {
	noStore()

	// const routine = mockRoutines.get(routineId);
	const result = await db.select().from(routines)
		.where(eq(routines.id, routineId))
		.innerJoin(exerciseTemplates, eq(exerciseTemplates.routine_id, routines.id))
		.innerJoin(exerciseEntries, eq(exerciseEntries.template_id, exerciseTemplates.id))
		.orderBy(desc(exerciseEntries.createdAt));

	if(!result) {
		return notFound()
	}

	const routineInfo = result?.[0]?.routine as unknown as Routine;

	const groupedEntriesByTemplate  = groupBy(result, r => r.exercise_template.name);



	const routine: Routine = {
		...routineInfo,
		exercises: Object.entries(groupedEntriesByTemplate).map(([, info]): Exercise => ({
			entries: info?.map(r => r.exercise_entry).filter(_ => !!_) ?? [],
			template: info[0]?.exercise_template as ExerciseTemplate
		}))
	}


	
	return routine;
}


export async function fetchRoutines(): Promise<RoutineItem[]> {
	try {
		return await db.select({
			id: routines.id,
			name: routines.name,
			createdAt: routines.createdAt,
		  }).from(routines);

	} catch (error) {
		console.error('Failed to fetch Routines', error);
		throw new Error('Failed to fetch Routines.');
	}
}