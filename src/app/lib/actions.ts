/* eslint-disable import/prefer-default-export */

'use server';

import { db } from '@/server/db';
import { exerciseEntries } from '@/server/db/schema';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { type z } from 'zod';
import { CreateRoutineEntrySchema, UpdateRoutineSchema } from './formSchemas';



export type CreateRoutineEntryType = z.infer<typeof CreateRoutineEntrySchema>;


export async function createDayInRoutine(routineId: string, formData: CreateRoutineEntryType) {
	try {
		const validatedFields = CreateRoutineEntrySchema.safeParse(formData);


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
	



export type UpdateRoutineEntryType = z.infer<typeof UpdateRoutineSchema>;
export async function updateDayInRoutine(routineId: string, formData: UpdateRoutineEntryType) {
	try {
		await new Promise((resolve) => {setTimeout(resolve, 2000)});

		const validatedFields = UpdateRoutineSchema.safeParse(formData);
		// If form validation fails, return errors early. Otherwise, continue.
		if (!validatedFields.success) {
			console.error(validatedFields.error.flatten().fieldErrors)
			return {
				errors: validatedFields.error.flatten().fieldErrors,
				message: 'Missing Fields. Failed to Create Day.',
			};
		}

		console.log(JSON.stringify(validatedFields.data, null, 4))

		// Prepare data for insertion into the database
		const newEntries = validatedFields.data.exercises.flatMap(({ template, entries }) => (entries.map(e => ({
			template_id: template.id,
			...e,
		}))));


		// console.log('newEntries', newEntries)
		const promises  = newEntries.map(e => db.update(exerciseEntries).set(e).where(and(eq(exerciseEntries.id, e.id), eq(exerciseEntries.template_id, e.template_id))));
		await Promise.all(promises);
		console.log('promises', promises.length)
		// const result = await db.update(exerciseEntries).set(newEntries).where(eq(exerciseEntries.id, 'Dan'))
			

		revalidatePath(`/routines/${routineId}`);
		return {};
	} catch (error) {
		console.error(error);
		return {
			message: 'Database Error: Failed to Create Invoice.',
		};
	}
}
	
