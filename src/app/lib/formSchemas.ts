
/* eslint-disable import/prefer-default-export */
import { z } from 'zod';

export const ExerciseTemplateSchema = z.object({
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

export const ExerciseEntrySchema = z.object({
	id: z.string(),
	createdAt: z.string(),
	weight: z.nullable(z.coerce.number().int().positive()),
	repetitions: z.nullable(z.coerce.number().int().positive()),
});


export const CreateRoutineEntrySchema = z.object({
	id: z.string(),
	exercises: z.array(z.object({
	//   id: z.number(),
	  template: ExerciseTemplateSchema.pick({ routine_id: true , id : true }),
	  entries: z.array(ExerciseEntrySchema.pick({
		  weight: true, 
		  repetitions: true,
	  })),
	})),
});



export const UpdateRoutineSchema = z.object({
	id: z.string(),
	exercises: z.array(z.object({
	//   id: z.number(),
	  template: ExerciseTemplateSchema.pick({ routine_id: true , id : true, series_min: true}),
	  entries: z.array(ExerciseEntrySchema),
	})),
});

