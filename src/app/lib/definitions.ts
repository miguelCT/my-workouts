import { type routines } from '@/server/db/schema';
import { type InferSelectModel } from 'drizzle-orm';
import { type z } from 'zod';
import { type ExerciseEntrySchema } from './formSchemas';
// Exercise Template Type
export type ExerciseTemplate = {
    routine_id: string;
    id: string;
    name: string;
    description: string;
    group: string;
    series_max: number;
    series_min: number;
    repetition_max: number;
    repetition_min: number;
};

// Routine Type
export type Routine = InferSelectModel<typeof routines> & {
    exercises: Exercise[];
};

export type RoutineItem = Pick<Routine, 'id' | 'name' | 'createdAt' | 'status'>;

// Exercise Type
export type Exercise = {
    template: ExerciseTemplate;
    entries: ExerciseEntry[];
};

// Exercise Entry Type
export type ExerciseEntry = z.infer<typeof ExerciseEntrySchema>;
