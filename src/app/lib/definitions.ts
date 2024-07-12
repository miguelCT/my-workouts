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
export type Routine = {
  	id: string;
  	name: string;
  	createdAt: string;  // ISO date format: YYYY-MM-DD
  	updatedAt: string;  // ISO date format: YYYY-MM-DD
  	exercises: Exercise[];
};

export type RoutineItem = Pick<Routine, 'id' | 'name' | 'createdAt'>
  
// Exercise Type
export type Exercise = {
  	template: ExerciseTemplate;
  	entries: ExerciseEntry[];
};
  
// Exercise Entry Type
export type ExerciseEntry = {
	id: string;
  	createdAt: string;  // ISO date format: YYYY-MM-DD
  	weight: number;
  	repetitions: number;
};
  