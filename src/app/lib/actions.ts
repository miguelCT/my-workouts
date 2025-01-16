'use server';

import { db } from '@/server/db';
import { exerciseEntries, routines } from '@/server/db/schema';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';
import { flattenValidationErrors } from 'next-safe-action';
import { setTimeout } from 'timers';
import { revalidatePath } from 'next/cache';
import { CreateRoutineEntrySchema, UpdateRoutineSchema } from './formSchemas';
import actionClient from './safe-action';
import { routineStatusList } from './constants';

export type CreateRoutineEntryType = z.infer<typeof CreateRoutineEntrySchema>;

export const createDayInRoutine = actionClient
    .schema(CreateRoutineEntrySchema, {
        handleValidationErrorsShape: async ve => ({
            errors: flattenValidationErrors(ve).fieldErrors,
            message: 'Missing Fields. Failed to create Day.',
        }),
    })
    .bindArgsSchemas<[routineId: z.ZodString]>([z.string().uuid()])
    .action(
        async ({
            parsedInput: formData,
            bindArgsParsedInputs: [routineId],
        }) => {
            // Prepare data for insertion into the database
            const newEntries = formData.exercises.flatMap(
                ({ template, entries }) =>
                    entries.map(e => ({
                        template_id: template.id,
                        ...e,
                    })),
            );

            const result = await db.insert(exerciseEntries).values(newEntries);

            return result;
        },
    );

export type UpdateRoutineEntryType = z.infer<typeof UpdateRoutineSchema>;

export const updateDayInRoutine = actionClient
    .schema(UpdateRoutineSchema, {
        handleValidationErrorsShape: async ve => ({
            errors: flattenValidationErrors(ve).fieldErrors,
            message: 'Missing Fields. Failed to Update Day.',
        }),
    })
    .bindArgsSchemas<[routineId: z.ZodString]>([z.string().uuid()])
    .action(
        async ({
            parsedInput: formData,
            bindArgsParsedInputs: [routineId],
        }) => {
            // Prepare data for insertion into the database
            const newEntries = formData.exercises.flatMap(
                ({ template, entries }) =>
                    entries.map(e => ({
                        template_id: template.id,
                        ...e,
                    })),
            );

            const promises = newEntries.map(e =>
                db
                    .update(exerciseEntries)
                    .set(e)
                    .where(
                        and(
                            eq(exerciseEntries.id, e.id),
                            eq(exerciseEntries.template_id, e.template_id),
                        ),
                    ),
            );
            await Promise.all(promises);
            return {};
        },
    );

export const updateRoutineStatus = actionClient
    .schema(
        z.object({
            id: z.string().uuid(),
            status: z.enum(routineStatusList), // Update the status enum as needed
        }),
    )
    .action(async ({ parsedInput: { id, status } }) => {
        try {
            await db
                .update(routines)
                .set({ status })
                .where(eq(routines.id, id));

            revalidatePath('/routines');
            return {};
        } catch (error) {
            console.error('Error updating routine status:', error);
            return { message: 'Failed to update routine status' };
        }
    });
