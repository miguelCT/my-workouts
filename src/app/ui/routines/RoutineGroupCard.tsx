'use client';

import { createDayInRoutine, updateDayInRoutine, type UpdateRoutineEntryType } from '@/app/lib/actions';
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

import { CreateRoutineEntrySchema, UpdateRoutineSchema } from '@/app/lib/formSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import EditIcon from '@mui/icons-material/Edit';
import ExerciseEntryCard from './ExerciseEntryCard';

function filterEntriesByDate(exercise: Exercise, date: string): ExerciseEntry[] {
	return exercise.entries.filter(entry => new Date(entry.createdAt).toDateString() === date);
}

type RoutineGroupCardProps = {
	date: string,
	routineInfo: Routine,
	empty?: boolean
}


export default function RoutineGroupCard({date,  routineInfo, empty}: RoutineGroupCardProps) {
	const { routineId } = useParams<{ routineId: string }>()
	const [isEditionEnabled, setIsEditionEnabled] = useState(false);


	const methods = useForm<UpdateRoutineEntryType>({
		defaultValues: {
		  id: routineId,
		  exercises: routineInfo.exercises.map(ex => ({
				...ex,
				// When we're creating an empty register, we set the values to null
				entries: empty ? [...Array(ex.template.series_min).keys()].map(() => ({
					weight:  null,
					repetitions: null
				})) : filterEntriesByDate(ex, date)
		  }))
		},
		resolver: zodResolver(empty ? CreateRoutineEntrySchema : UpdateRoutineSchema),
	  })

	const { handleSubmit, formState } = methods;

	const submitAction = handleSubmit(async (data) => {
		try {
			if(empty) {
				await createDayInRoutine(routineId, data);
				
			} else { 
				await updateDayInRoutine(routineId, data);
			}
			setIsEditionEnabled(false);

		} catch (error) {
			console.error(` Error: ${  (error as Error)?.message}`)
		}
		

	});



	return <Grid item xs={6} md key={date} >
		
		<FormProvider {...methods}>
			<form onSubmit={submitAction} noValidate>
				<Card variant="outlined"  sx={{
					border: t =>  empty ?`1px dashed ${  t.palette.primary.main}` : 'none',
					background: empty ? 'transparent': "linear-gradient(145deg, rgba(255,217,235,1) 0%, rgba(223,236,255,1) 68%)"
				}}>
					<CardContent>
						<Typography variant="subtitle1" color={"secondary"}>{date}</Typography>
						
						{	
							// ! TODO unificar para que los input del form aparezcan en función de los valores del formulario, no de routineInfo
							routineInfo.exercises.map((exercise, index) => 
								<Box 
									key={exercise.template.id}  
									sx={{ '&+&': { mt: 2 } }}>
									<ExerciseEntryCard 
										exerciseIndex={index} 
										entries={empty ? [...Array(exercise.template.series_min).keys()].map(() => ({
											id: ``,
											createdAt: '',
											weight:  null,
											repetitions: null
										})): filterEntriesByDate(exercise, date)} 
										template={exercise.template} 
										readOnly={!isEditionEnabled}/>
								</Box>)
						}
						
					</CardContent>
					 {formState.isSubmitting && <LinearProgress />}
					<CardActions sx={{
						justifyContent: 'flex-end',
					}}>
						{!isEditionEnabled ? <>
							{empty ? 
								<Button onClick={() => setIsEditionEnabled(true)}>Start day</Button>
								: 
								<IconButton color="primary" onClick={() => setIsEditionEnabled(true)}><EditIcon /></IconButton>
							}
						
						</>  : 
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
