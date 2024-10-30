'use server';

import { db } from '@/server/db';
import { exerciseEntries } from '@/server/db/schema';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';
import { flattenValidationErrors } from 'next-safe-action';
import { CreateRoutineEntrySchema, UpdateRoutineSchema } from './formSchemas';
import actionClient from './safe-action';

export type CreateRoutineEntryType = z.infer<typeof CreateRoutineEntrySchema>;

export const createDayInRoutine = actionClient
    .schema(CreateRoutineEntrySchema, {
        handleValidationErrorsShape: ve => ({
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
        handleValidationErrorsShape: ve => ({
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
