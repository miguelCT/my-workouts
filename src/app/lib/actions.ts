/* eslint-disable import/prefer-default-export */

'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { infer, z } from 'zod';
import { db } from '@/server/db';
import { exerciseEntries } from '@/server/db/schema';
import { routines } from './mockData';


const ExerciseTemplateSchema = z.object({
	id: z.string(),
	routine_id: z.string(),
	name: z.string(),
	description: z.string(),
	group: z.string(),
	series_max: z.number(),
	series_min: z.number(),
	repetition_max: z.number(),
	repetition_min: z.number(),
});

const ExerciseEntrySchema = z.object({
	createdAt: z.string(),
	weight: z.number(),
	repetitions: z.number(),
});


const RoutineSchema = z.object({
	id: z.string(),
	name: z.string(),
	createdAt: z.string(),
	updated: z.string(),
	exercises: z.array(z.object({
	//   id: z.number(),
	  template: ExerciseTemplateSchema.pick({ routine_id: true , id : true}),
	  entries: z.array(ExerciseEntrySchema.pick({
		  weight: true, 
		  repetitions: true,
	  })),
	})),
});


const CreateRoutineEntry = RoutineSchema.pick({ id: true, exercises: true });
export type CreateRoutineEntryType = z.infer<typeof CreateRoutineEntry>;


export async function createDayInRoutine(routineId: string, formData: CreateRoutineEntryType) {
	try {
		await new Promise((resolve) => {setTimeout(resolve, 2000)});
		const validatedFields = CreateRoutineEntry.safeParse(formData);


		// If form validation fails, return errors early. Otherwise, continue.
		if (!validatedFields.success) {
			return {
				errors: validatedFields.error.flatten().fieldErrors,
				message: 'Missing Fields. Failed to Create Day.',
			};
		}

		// Prepare data for insertion into the database
		const newEntries = validatedFields.data.exercises.flatMap(({ template, entries }) => (entries.map(e => ({
			template_id: template.id,
			...e,
		}))));


		const result = await db.insert(exerciseEntries).values(newEntries)
			

		revalidatePath(`/routines/${routineId}`);

		return result;
	} catch (error) {
		console.error(error);
		return {
			message: 'Database Error: Failed to Create Invoice.',
		};
	}
}
	
