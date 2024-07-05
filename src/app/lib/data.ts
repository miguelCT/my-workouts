/* eslint-disable import/prefer-default-export */
import { notFound } from "next/navigation";
import { type ExerciseTemplate, type Routine } from "./definitions";

// Sample Exercise Template Data
const exerciseTemplate1: ExerciseTemplate = {
	routine_id: 1,
	exercise_id: 1,
	name: "Push-ups",
	description: "A classic bodyweight exercise",
	group: "Day 1",
	series_max: 3,
	series_min: 2,
	repetition_max: 12,
	repetition_min: 8,
};

const exerciseTemplate2: ExerciseTemplate = {
	routine_id: 2,
	exercise_id: 2,
	name: "Squats",
	description: "A lower body compound exercise",
	group: "Day 2",
	series_max: 4,
	series_min: 3,
	repetition_max: 15,
	repetition_min: 10,
};

const exerciseTemplate3: ExerciseTemplate = {
	routine_id: 2,
	exercise_id: 3,
	name: "Shoulders",
	description: "A shoulder exercise",
	group: "Day 2",
	series_max: 2,
	series_min: 1,
	repetition_max: 10,
	repetition_min: 8,
};


// Sample Routine Data
const routine1: Routine = {
	id: 1,
	name: "Full Body Strength",
	created: "2024-07-04", // Today's date (assuming you want a sample for today)
	updated: "2024-07-04",
	exercises: [
		{
			id: 1,
			template: exerciseTemplate1,
			entries: [{
				date: "2024-07-03T00:01:00.000Z", // Example entry from yesterday
				weight: 20,
				repetitions: 8,
			}], // No entries yet
		},
		{
			id: 2,
			template: exerciseTemplate2,
			entries: [{
				date: "2024-07-03T00:01:00.000Z", // Example entry from yesterday
				weight: 20,
				repetitions: 8,
			}, {
				date: "2024-07-03T00:02:00.000Z", // Example entry from yesterday
				weight: 20,
				repetitions: 8,
			}, {
				date: "2024-07-03T00:03:00.000Z", // Example entry from yesterday
				weight: 20,
				repetitions: 10,
			}, {
				date: "2024-07-04T00:03:00.000Z", // Example entry from yesterday
				weight: 1,
				repetitions: 1,
			}, {
				date: "2024-07-05T00:03:00.000Z", // Example entry from yesterday
				weight: 5,
				repetitions: 5,
			}],
		},
		{
			id: 3,
			template: exerciseTemplate3,
			entries: [{
				date: "2024-07-03T00:01:00.000Z", // Example entry from yesterday
				weight: 20,
				repetitions: 8,
			}, {
				date: "2024-07-03T00:02:00.000Z", // Example entry from yesterday
				weight: 20,
				repetitions: 8,
			}, {
				date: "2024-07-04T00:03:00.000Z", // Example entry from yesterday
				weight: 1,
				repetitions: 1,
			}
			, {
				date: "2024-07-04T00:04:00.000Z", // Example entry from yesterday
				weight: 4,
				repetitions: 4,
			}],
		},
	],
};

// Sample Routine Data
const routine2: Routine = {
	id: 2,
	name: "Upper Body Strength",
	created: "2024-07-05", // Today's date (assuming you want a sample for today)
	updated: "2024-07-05",
	exercises: [
	],
};


const routines = [routine1, routine2];

export async function fetchRoutine(routineId: number): Promise<Routine> {

	const routine = routines.find(r => r.id === routineId);

	if(!routine) {
		return notFound()
	}

	const delay = Math.floor(Math.random() * 1500);

	// eslint-disable-next-line no-promise-executor-return
	await new Promise((resolve) => setTimeout(resolve, delay));
	return routine;
}


export async function fetchRoutines() {
	const delay = Math.floor(Math.random() * 1500);

	try {

		// eslint-disable-next-line no-promise-executor-return
		await new Promise((resolve) => setTimeout(resolve, delay));
		return [routine1, routine2].map(r => ({
			id: r.id,
			name: r.name,
			created: r.created,
			updated: r.updated,
		}));
	} catch (error) {
		console.error('Failed to fetch Routines', error);
		throw new Error('Failed to fetch Routines.');
	}
}