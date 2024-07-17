'use client';

import { updateDayInRoutine, type UpdateRoutineEntryType } from '@/app/lib/actions';
import { type Exercise, type ExerciseEntry, type ExerciseTemplate, type Routine } from '@/app/lib/definitions';
import {
	Button,
	Grid,
	LinearProgress,
	Typography
} from '@mui/material';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form-mui';

import { UpdateRoutineSchema } from '@/app/lib/formSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import ExerciseEntryCard from './ExerciseEntryCard';

function filterEntriesByDate(exercise: Exercise, date: string): ExerciseEntry[] {
	return exercise.entries.filter(entry => new Date(entry.createdAt).toDateString() === date);
}

type RoutineGroupCardProps = {
	date: string,
	groupedExercises: [group: string, [ExerciseTemplate, ExerciseEntry[]][]][],
	routineInfo: Routine
}


export default function RoutineGroupCard({date, groupedExercises, routineInfo}: RoutineGroupCardProps) {
	const { routineId } = useParams<{ routineId: string }>()
	const [isEditionEnabled, setIsEditionEnabled] = useState(false);

	const methods = useForm<UpdateRoutineEntryType>({
		defaultValues: {
		  id: routineId,
		  exercises: routineInfo.exercises.map(ex => ({
				...ex,
				entries: filterEntriesByDate(ex, date)
		  }))
		},
		resolver: zodResolver(UpdateRoutineSchema),
	  })

	const { handleSubmit, formState } = methods;

	const submitAction = handleSubmit(async (data) => {

		await updateDayInRoutine(routineId, data);

		setIsEditionEnabled(false);
	});

	return <Grid item xs={6} md key={new Date(date).toISOString()} sx={{ border: 1 }}>
		{formState.isSubmitting && <LinearProgress />}
		<FormProvider {...methods}>
			<form onSubmit={submitAction} no-validate="true">
				<Typography variant="subtitle1">{new Date(date).toDateString()}</Typography>
				{	
					routineInfo.exercises.map((exercise, index) => <ExerciseEntryCard 
						key={exercise.template.id}  
						exerciseIndex={index} 
						entries={filterEntriesByDate(exercise, date)} 
						template={exercise.template} 
						readOnly={!isEditionEnabled}/>)
				}
				{!isEditionEnabled ? <Button onClick={() => setIsEditionEnabled(true)}>Edit</Button>  : 
					<div>
						<Button onClick={() => setIsEditionEnabled(false)}>Cancel</Button>
						<Button type='submit' disabled={formState.isSubmitting}>Update</Button> 
					</div>
				}
			

			</form>
		</FormProvider>
	</Grid>;
}
