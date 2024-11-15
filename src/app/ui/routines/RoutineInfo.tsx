import { fetchRoutine } from '@/app/lib/data';
import { groupExercisesByEntryDate } from '@/app/lib/utils';
import { Box, Grid, Typography } from '@mui/material';
import RoutineGroupCard from './RoutineGroupCard';
import RoutineWeekStartDialog from './RoutineWeekStartDialog';
import FavButton from '../FavButton';
import ArchiveButton from '../ArchiveButton';

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
                <Box sx={{ display: 'flex' }}>
                    <FavButton
                        routineId={routineInfo.id}
                        status={routineInfo.status}
                    />
                    <ArchiveButton
                        routineId={routineInfo.id}
                        status={routineInfo.status}
                    />
                    <Typography
                        variant="h5"
                        color="primary"
                        sx={{
                            my: 1,
                        }}
                    >
                        Routines - {name}
                    </Typography>
                </Box>

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
                    <Grid item xs={6} md={3} key={date}>
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
