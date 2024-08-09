import { type UpdateRoutineEntryType } from '@/app/lib/actions';
import {
    type ExerciseEntry,
    type ExerciseTemplate,
} from '@/app/lib/definitions';
import { Box, Grid, Typography } from '@mui/material';
import { TextFieldElement, useFormContext } from 'react-hook-form-mui';

type ExerciseEntryCardProps = {
    entries: ExerciseEntry[];
    template:
        | ExerciseTemplate
        | UpdateRoutineEntryType['exercises'][number]['template'];
    readOnly?: boolean;
    exerciseIndex: number;
};
export default function ExerciseEntryCard({
    entries,
    template,
    readOnly,
    exerciseIndex,
}: ExerciseEntryCardProps) {
    const { control } = useFormContext();
    return (
        <Box>
            <div>
                {'name' in template && (
                    <>
                        <Typography variant="h6" component="span">
                            {template.name}
                        </Typography>{' '}
                        <Typography variant="caption">
                            ({template.series_min}{' '}
                            {template.series_max && `- ${template?.series_max}`}{' '}
                            series)
                        </Typography>
                    </>
                )}
            </div>
            <Grid container spacing={0.5}>
                <Grid item xs={6}>
                    <Typography variant="caption">Weight</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="caption">Reps</Typography>
                </Grid>
            </Grid>
            {entries.length === 0 && (
                <Typography variant="caption">No entries added yet</Typography>
            )}
            {entries.map((entry, index) => (
                <Grid container spacing={0.5} key={entry.id || index}>
                    <Grid item xs={6}>
                        <TextFieldElement
                            name={`exercises.${exerciseIndex}.entries.${index}.weight`}
                            placeholder={'Weight'}
                            margin="none"
                            size="small"
                            fullWidth
                            slotProps={{
                                input: { readOnly },
                            }}
                            sx={{
                                backgroundColor: readOnly
                                    ? 'transparent'
                                    : 'background.paper',
                            }}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextFieldElement
                            name={`exercises.${exerciseIndex}.entries.${index}.repetitions`}
                            placeholder={'Reps'}
                            margin="none"
                            size="small"
                            fullWidth
                            slotProps={{
                                input: { readOnly },
                            }}
                            style={{
                                backgroundColor: readOnly
                                    ? 'transparent'
                                    : 'white',
                            }}
                            control={control}
                        />
                    </Grid>
                </Grid>
            ))}
        </Box>
    );
}
