import { fetchRoutine } from '@/app/lib/data';
import { groupExercisesByEntryDate } from '@/app/lib/utils';
import { Box, Grid, Typography } from '@mui/material';
import RoutineGroupCard from './RoutineGroupCard';
import RoutineWeekStartDialog from './RoutineWeekStartDialog';

export default async function RoutineInfo({ id }: { id: string }) {
    const routineInfo = await fetchRoutine(id);

    const { name } = routineInfo;

    const groupedExercisesByDate = groupExercisesByEntryDate(routineInfo);

    const hasEntriesToday = groupedExercisesByDate.find(
        g => g[0] === new Date().toDateString(),
    );

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    my: 1,
                }}
            >
                <Typography
                    variant="h5"
                    color="primary"
                    sx={{
                        my: 1,
                    }}
                >
                    Routines - {name}
                </Typography>

                {!hasEntriesToday && (
                    <RoutineWeekStartDialog>
                        <RoutineGroupCard
                            date={new Date().toDateString()}
                            routineInfo={routineInfo}
                            empty
                        />
                    </RoutineWeekStartDialog>
                )}
            </Box>

            <Grid container spacing={1}>
                {groupedExercisesByDate.map(([date], index, array) => (
                    <Grid item xs={6} md key={date}>
                        <RoutineGroupCard
                            date={date}
                            routineInfo={routineInfo}
                            key={date}
                            index={array.length - index}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
