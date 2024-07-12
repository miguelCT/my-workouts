'use client';

import { type ExerciseEntry, type ExerciseTemplate } from '@/app/lib/definitions';
import {
	Box,
	Button,
	Grid,
	LinearProgress,
	Typography
} from '@mui/material';
import { useState, useTransition } from 'react';
import { useParams } from 'next/navigation';
import { type CreateRoutineEntryType } from '@/app/lib/actions';
import ExerciseEntryCard from './ExerciseEntryCard';



type RoutineGroupCardProps = {
	date: string,
	groupedExercises: [group: string, [ExerciseTemplate, ExerciseEntry[]][]][]
}
export default function RoutineGroupCard({date, groupedExercises}: RoutineGroupCardProps) {
	const { routineId } = useParams<{ routineId: string }>()
	const [pending, startTransaction] = useTransition();
	const [isEditionEnabled, setIsEditionEnabled] = useState(false);

	const submitAction = async () => {
		startTransaction(async () => {
			const r = await new Promise(resolve => {setTimeout(resolve, 2000)});

			const s: CreateRoutineEntryType = {
				id: routineId,
				exercises: groupedExercises.flatMap(([group, tuples]) => tuples.map(([template, entries]) => ({entries, template})))
			}
			console.log('update',s)
			setIsEditionEnabled(false);
		})
	}
	return <Grid item xs={6} md key={new Date(date).toISOString()} sx={{ border: 1 }}>
		{pending && <LinearProgress />}
		<form action={submitAction}>
			<Typography variant="subtitle1">{new Date(date).toDateString()}</Typography>
			{groupedExercises.map(([group, tuples]) => (
				<Box key={group} sx={{ m: 0.5, borderBottom: '1px dashed gray', pb: 1 }}>
					{group}
					{/* {tuples.map(([template, exercises]) => <ExerciseEntryCard key={template.name} entries={exercises} template={template}/>)} */}
					{tuples.map(([template, exercises]) => <ExerciseEntryCard key={template.name} entries={[...Array(template.series_max).keys()].map((i) => ({
						id: '',
						createdAt: '',
						weight: exercises[i]?.weight ?? 0,
						repetitions: exercises[i]?.repetitions ?? 0
					}))} template={template}  readOnly={!isEditionEnabled}/>)}
				</Box>
			
			))}
			{!isEditionEnabled ? <Button onClick={() => setIsEditionEnabled(true)}>Edit</Button>  : 
				<div>
					<Button onClick={() => setIsEditionEnabled(false)}>Cancel</Button>
					<Button type='submit' disabled={pending}>Update</Button> 
				</div>
			}
			

		</form>
	</Grid>;
}
