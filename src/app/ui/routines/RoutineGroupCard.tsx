'use client';

import { updateDayInRoutine } from '@/app/lib/actions';
import { type ExerciseEntry, type ExerciseTemplate } from '@/app/lib/definitions';
import {
	Box,
	Button,
	Grid,
	LinearProgress,
	Typography
} from '@mui/material';
import { useParams } from 'next/navigation';
import { useState, useTransition } from 'react';
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
			await updateDayInRoutine(routineId, {
				id: routineId,
				exercises: groupedExercises
					.map(([, tuples]) => tuples)
					.flatMap((tuples) => tuples.map(([template, entries]) => ({
						template,
						// TODO improve date equiality
						entries: entries?.filter(e => new Date(e.createdAt).toDateString()  === new Date(date).toDateString()).map(e => ({
							...e,
							repetitions: Math.floor(Math.random() * 10),
							weight: Math.floor(Math.random() * 10),
						}))
				
					})))
			});
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
					{tuples.map(([template, exercises]) => <ExerciseEntryCard key={template.name} entries={[...Array(template.series_min).keys()].map((i) => ({
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
