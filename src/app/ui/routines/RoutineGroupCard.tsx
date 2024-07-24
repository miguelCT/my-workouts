'use client';

import { updateDayInRoutine, type UpdateRoutineEntryType } from '@/app/lib/actions';
import { type Exercise, type ExerciseEntry, type ExerciseTemplate, type Routine } from '@/app/lib/definitions';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Grid,
	IconButton,
	LinearProgress,
	Typography
} from '@mui/material';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form-mui';

import { UpdateRoutineSchema } from '@/app/lib/formSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import EditIcon from '@mui/icons-material/Edit';
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

	return <Grid item xs={6} md key={date} >
		
		<FormProvider {...methods}>
			<form onSubmit={submitAction} no-validate="true">
				<Card variant="outlined"  sx={{
					background: "linear-gradient(145deg, rgba(255,217,235,1) 0%, rgba(223,236,255,1) 68%)"
				}}>
					<CardContent>
						<Typography variant="subtitle1" color={"secondary"}>{date}</Typography>
						
						{	
							routineInfo.exercises.map((exercise, index) => 
								<Box 
									key={exercise.template.id}  
									sx={{ '&+&': { mt: 2 } }}>
									<ExerciseEntryCard 
										exerciseIndex={index} 
										entries={filterEntriesByDate(exercise, date)} 
										template={exercise.template} 
										readOnly={!isEditionEnabled}/>
								</Box>)
						}
						
					</CardContent>
					 {formState.isSubmitting && <LinearProgress />}
					<CardActions sx={{
						justifyContent: 'flex-end',
					}}>
						{!isEditionEnabled ? <IconButton color="primary" onClick={() => setIsEditionEnabled(true)}><EditIcon /></IconButton>  : 
							<>
								<Button onClick={() => setIsEditionEnabled(false)}>Cancel</Button>
								<Button type='submit' variant="outlined" disabled={formState.isSubmitting}>Update</Button> 
							</>
						}
					</CardActions>
				</Card>

			</form>
		</FormProvider>
	</Grid>;
}
