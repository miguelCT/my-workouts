import { type UpdateRoutineEntryType } from '@/app/lib/actions';
import {
    type ExerciseEntry,
    type ExerciseTemplate,
} from '@/app/lib/definitions';
import InfoIcon from '@mui/icons-material/Info';
import {
    Box,
    Grid,
    Link,
    styled,
    Tooltip,
    tooltipClasses,
    type TooltipProps,
    Typography,
} from '@mui/material';
import RouterLink from 'next/link';
import { TextFieldElement, useFormContext } from 'react-hook-form-mui';
import { ExerciseInfo } from '../exercises/Exercise';

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 500,
    },
});

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
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <span>
                            <Link
                                variant="h6"
                                color="secondary"
                                component={RouterLink}
                                href={`/exercises/${template.id}`}
                            >
                                {template.name}
                            </Link>

                            <Typography variant="caption">
                                {` (${template.series_min}${template.series_max ? ` - ${template.series_max}` : ''} series)`}
                            </Typography>
                        </span>
                        <CustomWidthTooltip
                            disableFocusListener
                            title={
                                <ExerciseInfo info={template} size="small" />
                            }
                        >
                            <InfoIcon fontSize="small" color="action" />
                        </CustomWidthTooltip>
                    </Box>
                )}
            </div>
            <Box sx={{ my: 2 }}>
                <Grid container spacing={0.5}>
                    <Grid item xs={6}>
                        <Typography variant="caption">Weight</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="caption">Reps</Typography>
                    </Grid>
                </Grid>
                {entries.length === 0 && (
                    <Typography variant="caption">
                        No entries added yet
                    </Typography>
                )}
                {entries.map((entry, index) => (
                    <Grid
                        container
                        spacing={0.5}
                        sx={{
                            mb: 1,
                        }}
                        key={entry.id || index}
                    >
                        <Grid item xs>
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

                        <Grid item xs>
                            <TextFieldElement
                                name={`exercises.${exerciseIndex}.entries.${index}.repetitions`}
                                placeholder={'Reps'}
                                margin="none"
                                size="small"
                                fullWidth
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
        </Box>
    );
}
