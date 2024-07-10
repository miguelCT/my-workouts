import { fetchRoutine } from '@/app/lib/data';
import { type ExerciseEntry, type ExerciseTemplate } from '@/app/lib/definitions';
import { groupExercisesByEntryDate, groupExercisesByName } from '@/app/lib/utils';
import {
	Box,
	Grid,
	TextField,
	Typography
} from '@mui/material';

type ExerciseEntryCardProps = {
	entries: ExerciseEntry[],
	template: ExerciseTemplate,
	readOnly?: boolean
}
export default function ExerciseEntryCard({ entries, template, readOnly }: ExerciseEntryCardProps) {
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
				<Grid container spacing={0.5} key={entry.date || index}>
					<Grid item xs={6}>
						<TextField margin="none" size='small' fullWidth defaultValue={entry.weight} 
							error={!entry.weight && index < template.series_min} 
							slotProps={{
								input: { readOnly }
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField margin="none" size='small' fullWidth defaultValue={entry.repetitions} 
							error={!entry.repetitions && index < template.series_min} slotProps={{
								input: { readOnly }
							}}/>
					</Grid>
				</Grid>
			))}
		</Box>
	);
}
