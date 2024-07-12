'use client';

import { createDayInRoutine } from '@/app/lib/actions';
import { type Routine } from '@/app/lib/definitions';
import { groupExercisesByName } from '@/app/lib/utils';
import {
	Box,
	Button,
	Grid,
	LinearProgress,
	Typography
} from '@mui/material';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import ExerciseEntryCard from './ExerciseEntryCard';

type NewDayCardProps = {
	routine: Routine
}
export default function NewDayCard({ routine }: NewDayCardProps) {
	const groupedTemplates = groupExercisesByName(routine);


	const { routineId } = useParams<{ routineId: string }>()
	const [pending, startTransaction] = useTransition();
	const submitAction = async () => {
		startTransaction(async () => {

			await createDayInRoutine(routineId, {
				...routine,
				exercises: routine.exercises.map((exercise) => ({
					template: exercise.template,
					entries: [{
						repetitions: Math.floor(Math.random() * 10),
						weight: Math.floor(Math.random() * 10),
					}]}))
			});
		})
	}
	const selectedDate = new Date();
	return <Grid item xs={6} md key={selectedDate.toISOString()} sx={{ border: 1, borderStyle: 'dashed', backgroundColor: t => t.palette.grey[100] }}>
		{pending && <LinearProgress />}
		<form action={
			submitAction
		}>
			<Typography variant="subtitle1">{selectedDate.toDateString()} [today]</Typography>
			{groupedTemplates.map(([group, templates]) => (
				<Box key={group} sx={{ m: 0.5, borderBottom: '1px dashed gray', pb: 1 }}>
					{group}
					{/* {tuples.map(([template, exercises]) => <ExerciseEntryCard key={template.name} entries={exercises} template={template}/>)} */}
					{
						templates.map((template) => <ExerciseEntryCard key={template.name} 
							entries={[...Array(template.series_max).keys()].map(() => ({
								id: '',
								createdAt: '',
								weight:  0,
								repetitions: 0
							}))} 
							template={template} />)
					}
				</Box>
			))}
			<Button type='submit' disabled={pending}>Start day</Button> 
		</form>
	</Grid>
}