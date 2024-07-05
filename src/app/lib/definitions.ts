// Exercise Template Type
export type ExerciseTemplate = {
  	routine_id: number;
  	exercise_id: number;
  	name: string;
  	description: string;
  	group: string;
  	series_max: number;
  	series_min: number;
  	repetition_max: number;
  	repetition_min: number;
};
  
// Routine Type
export type Routine = {
  	id: number;
  	name: string;
  	created: string;  // ISO date format: YYYY-MM-DD
  	updated: string;  // ISO date format: YYYY-MM-DD
  	exercises: Exercise[];
};
  
// Exercise Type
export type Exercise = {
  	id: number;
  	template: ExerciseTemplate;
  	entries: ExerciseEntry[];
};
  
// Exercise Entry Type
export type ExerciseEntry = {
  	date: string;  // ISO date format: YYYY-MM-DD
  	weight: number;
  	repetitions: number;
};
  