/* eslint-disable import/prefer-default-export */
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from 'next/cache';
import { type ExerciseTemplate, type Routine } from "./definitions";

import { routines } from './mockData';


export async function fetchRoutine(routineId: number): Promise<Routine> {
	noStore()
	console.log('routines---------------------- GET', routines)
	const routine = routines.get(routineId);

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
		return [...routines.values()].map(r => ({
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