/* eslint-disable import/prefer-default-export */

'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { infer, z } from 'zod';
import { routines } from './mockData';


const ExerciseTemplateSchema = z.object({
	routine_id: z.number(),
	exercise_id: z.number(),
	name: z.string(),
	description: z.string(),
	group: z.string(),
	series_max: z.number(),
	series_min: z.number(),
	repetition_max: z.number(),
	repetition_min: z.number(),
});

const ExerciseEntrySchema = z.object({
	date: z.string(),
	weight: z.number(),
	repetitions: z.number(),
});


const RoutineSchema = z.object({
	id: z.string().or(z.number()),
	name: z.string(),
	created: z.string(),
	updated: z.string(),
	exercises: z.array(z.object({
	//   id: z.number(),
	  template: ExerciseTemplateSchema.pick({ exercise_id: true, routine_id: true }),
	  entries: z.array(ExerciseEntrySchema),
	})),
});


const CreateRoutineEntry = RoutineSchema.pick({ id: true, exercises: true });
export type CreateRoutineEntryType = z.infer<typeof CreateRoutineEntry>;


export async function createDayInRoutine(routineId: string, formData: CreateRoutineEntryType) {
	try {
		await new Promise((resolve) => {setTimeout(resolve, 2000)});
		const validatedFields = CreateRoutineEntry.safeParse(formData);

		const r = routines.get(Number(routineId));

		if(r) {
			const s = [...formData.exercises, ...r.exercises];
			// @ts-expect-error: forced error
			routines.set(Number(routineId), { ...r, exercises: s });

			console.log('routines', routines)
		}

		// If form validation fails, return errors early. Otherwise, continue.
		if (!validatedFields.success) {
			return {
				errors: validatedFields.error.flatten().fieldErrors,
				message: 'Missing Fields. Failed to Create Day.',
			};
		}

		// Prepare data for insertion into the database

		console.log('SQL', validatedFields.data);

		revalidatePath(`/routines/${routineId}`);

		return validatedFields.data;
	} catch (error) {
		console.error(error);
		return {
			message: 'Database Error: Failed to Create Invoice.',
		};
	}
}
	
