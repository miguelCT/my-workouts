'use server';

/* eslint-disable import/prefer-default-export */
import { checkAuth } from '@/server/auth';
import { db } from '@/server/db';
import {
    exerciseEntries,
    exerciseTemplates,
    routines,
} from '@/server/db/schema';
import { asc, desc, eq, or } from 'drizzle-orm';
import groupBy from 'lodash.groupby';
import { unstable_noStore as noStore } from 'next/cache';
import { notFound } from 'next/navigation';
import {
    type Exercise,
    type ExerciseTemplate,
    type Routine,
    type RoutineItem,
} from './definitions';

import { RoutineStatus } from './constants';
// import {routines as mockRoutines} from './mockData'

export async function fetchRoutine(routineId: string): Promise<Routine> {
    noStore();
    // await checkAuth();

    const result = await db
        .select()
        .from(routines)
        .where(eq(routines.id, routineId))
        .innerJoin(
            exerciseTemplates,
            eq(exerciseTemplates.routine_id, routines.id),
        )
        .fullJoin(
            exerciseEntries,
            eq(exerciseEntries.template_id, exerciseTemplates.id),
        )
        .orderBy(desc(exerciseEntries.createdAt));

    if (!result?.[0]?.routine) {
        return notFound();
    }

    const routineInfo = result[0].routine;

    const groupedEntriesByTemplate = groupBy(
        result,
        r => r.exercise_template?.name,
    );

    const routine: Routine = {
        ...routineInfo,
        exercises: Object.entries(groupedEntriesByTemplate).map(
            ([, info]): Exercise => ({
                entries:
                    info?.map(r => r.exercise_entry).filter(_ => !!_) ?? [],
                template: info[0]?.exercise_template as ExerciseTemplate,
            }),
        ),
    };

    return routine;
}

type FetchRoutinesFilters = { filteredBy?: Routine['status'] };

export async function fetchRoutines(
    filters?: FetchRoutinesFilters,
): Promise<RoutineItem[]> {
    await checkAuth();
    try {
        return await db
            .select({
                id: routines.id,
                name: routines.name,
                createdAt: routines.createdAt,
                status: routines.status,
            })
            .from(routines)
            .where(
                filters?.filteredBy
                    ? eq(routines.status, filters.filteredBy)
                    : or(
                          eq(routines.status, RoutineStatus.ACTIVE),
                          eq(routines.status, RoutineStatus.FAV),
                      ),
            )
            .orderBy(asc(routines.name));
    } catch (error) {
        console.error('Failed to fetch Routines', error);
        throw new Error('Failed to fetch Routines.');
    }
}
