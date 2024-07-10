/* eslint-disable import/prefer-default-export */
import { type Routine, type Exercise, type ExerciseEntry, type ExerciseTemplate } from "./definitions";


type Tuple = [ExerciseTemplate, ExerciseEntry[]];
type TupleByGroup = [string, Tuple[]];
export function groupExercisesByGroupName(exercises: Tuple[]): TupleByGroup[] {
	const groupedExercises: [string, Tuple[]][] = [];

	exercises.forEach(([template, entries]) => {
		const groupName = template.group;
		const group = groupedExercises.find(([name]) => name === groupName);
		if (group) {
			group[1].push([template, entries]);
		} else {
			groupedExercises.push([groupName, [[template, entries]]]);
		}
	});

	return groupedExercises;
}


export function groupExercisesByEntryDate(routine: Routine): [date: string, TupleByGroup[]][] {
	const groupedExercises = new Map<string, Map<ExerciseTemplate, ExerciseEntry[]>>();

	// const m = new Map<ExerciseTemplate, ExerciseEntry[]>();

	routine.exercises.forEach((exercise) => {
		exercise.entries.forEach((entry) => {
			const creationDate = new Date(entry.date);
			const key = creationDate.toLocaleDateString(); // Group by date without time

			if (groupedExercises.has(key)) {
				const excerciseMap = groupedExercises.get(key);
				const hasExercise = excerciseMap?.has(exercise.template) ?? false;

				if(hasExercise)  {
					const oldEntries = excerciseMap?.get(exercise.template) ?? [];
				    const newEntries = [...oldEntries, entry].filter(e => new Date(e.date).toDateString() === key);
					excerciseMap?.set(exercise.template, newEntries)
				} else {
					excerciseMap?.set(exercise.template, [entry])
				}
			} else {
				const m = new Map<ExerciseTemplate, ExerciseEntry[]>();
				m.set(exercise.template, [entry])
				groupedExercises.set(key, m);
			}
		});
	});

	return Array.from(groupedExercises.entries()).sort((a, b) => b[0].localeCompare(b[0]) - a[0].localeCompare(b[0])).map(
		([date, exercises]) => 
			[date, groupExercisesByGroupName(Array.from(exercises.entries()))]
	);
}




export function groupExercisesByName(routine: Routine): [group: string, ExerciseTemplate[]][] {
	const groupedExercises: [string, ExerciseTemplate[]][] = [];
  
	routine.exercises.forEach((exercise) => {
		const groupName = exercise.template.group;
		const group = groupedExercises.find(([name]) => name === groupName);
		if (group) {
			group[1].push(exercise.template);
		} else {
			groupedExercises.push([groupName, [exercise.template]]);
		}
	});
  
	return groupedExercises;
}