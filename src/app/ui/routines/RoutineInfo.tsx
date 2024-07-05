import { fetchRoutine } from '@/app/lib/data';
import { type ExerciseEntry, type ExerciseTemplate } from '@/app/lib/definitions';
import { groupExercisesByEntryCreationDate } from '@/app/lib/utils';
import {
	Box,
	Grid,
	TextField,
	Typography
} from '@mui/material';

type ExerciseEntryCardProps = {
	entries: ExerciseEntry[],
	template: ExerciseTemplate
}
function ExerciseEntryCard({ entries, template }: ExerciseEntryCardProps) {

	return (
		<Box>
			<div>
				<Typography variant="h6" component="span">{template.name}</Typography> <Typography variant='caption'>({template.series_min} - {template.series_max} series)</Typography>
			</div>
			{entries.length === 0 ?? <Typography variant="body1">No entries added yet</Typography>}
			<Grid container spacing={0.5} >
				<Grid item xs={6}>
					<Typography variant='caption'>Weight</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography variant='caption'>Reps</Typography>
				</Grid>
			</Grid>
			{entries.map((entry, index) => (
				<Grid container spacing={0.5} key={entry.date}>
					<Grid item xs={6}>
						<TextField margin="none" size='small' fullWidth defaultValue={entry.weight} error={!entry.weight && index < template.series_min}/>
					</Grid>
					<Grid item xs={6}>
						<TextField margin="none" size='small' fullWidth defaultValue={entry.repetitions} error={!entry.repetitions && index < template.series_min}/>
					</Grid>
				</Grid>
			))}
		</Box>
	);
}




export default async function RoutineInfo({ id } : { id: number }) {

	const routineInfo = await fetchRoutine(id);

	const { name,  } = routineInfo;

	const groupedExercisesByDate = groupExercisesByEntryCreationDate(routineInfo)



	return (
		<>
			<Typography variant="h6">{name}</Typography>
			<Grid container spacing={1}>
				{groupedExercisesByDate.map(([date, groupedExercises]) => (
					<Grid item xs={6} md key={new Date(date).toISOString()} sx={{ border: 1 }}>
						<Typography variant="subtitle1">{new Date(date).toLocaleDateString()}</Typography>
						{groupedExercises.map(([group, tuples]) => (
							<Box key={group} sx={{ m: 0.5 }}>
								{group}
								{/* {tuples.map(([template, exercises]) => <ExerciseEntryCard key={template.name} entries={exercises} template={template}/>)} */}
							
								{tuples.map(([template, exercises]) => <ExerciseEntryCard key={template.name} entries={[...Array(template.series_max).keys()].map((i) => ({
									date: new Date().toISOString(),
									weight: exercises[i]?.weight ?? 0,
									repetitions: exercises[i]?.repetitions ?? 0
								}))} template={template}/>)}
							</Box>
						))}
					</Grid>
				))}
			</Grid>
            

			
		</>
	);
}   