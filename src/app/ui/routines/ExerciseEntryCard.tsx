
import { type ExerciseEntry, type ExerciseTemplate } from '@/app/lib/definitions';
import {
	Box,
	Grid,
	Typography
} from '@mui/material';
import { TextFieldElement, useFormContext } from 'react-hook-form-mui';

type ExerciseEntryCardProps = {
	entries: ExerciseEntry[],
	template: ExerciseTemplate,
	readOnly?: boolean,
	exerciseIndex: number
}
export default function ExerciseEntryCard({ entries, template, readOnly, exerciseIndex }: ExerciseEntryCardProps) {

	const {control } = useFormContext();
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
				<Grid container spacing={0.5} key={entry.id}>
					<Grid item xs={6}>
						 <TextFieldElement
							name={`exercises.${exerciseIndex}.entries.${index}.weight`}
							placeholder={'Weight'}
							margin="none" 
							size='small' 
							fullWidth 
							error={!entry.weight && index < template.series_min} 
							slotProps={{
								input: { readOnly }
							}}
							control={control}
							required
						/>
					</Grid>
					<Grid item xs={6}>
						<TextFieldElement
							name={`exercises.${exerciseIndex}.entries.${index}.repetitions`}
							placeholder={'Repetitions'}
							margin="none" 
							size='small' 
							fullWidth 
							error={!entry.repetitions && index < template.series_min} 
							slotProps={{
								input: { readOnly }
							}}
							control={control}
							required
						/>
					</Grid>
				</Grid>
			))}
		</Box>
	);
}
