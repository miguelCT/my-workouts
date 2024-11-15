import { fetchRoutines } from '@/app/lib/data';
import { Avatar, Card, CardActionArea, CardHeader } from '@mui/material';

import Link from 'next/link';

import { RoutineStatus } from '@/app/lib/constants';
import { type Routine } from '@/app/lib/definitions';
import { type FC } from 'react';
import FavButton from '../FavButton';

type RoutineListProps = {
    filteredBy?: Routine['status'];
};
const RoutineList: FC<RoutineListProps> = async ({ filteredBy }) => {
    const routines = await fetchRoutines(
        filteredBy
            ? {
                  filteredBy,
              }
            : undefined,
    );
    return (
        <>
            {routines.map(routine => (
                <Card
                    key={routine.id}
                    variant="outlined"
                    // TODO revisar este código duplicado en RoutineGriupCard
                    sx={{
                        background:
                            routine.status !== RoutineStatus.ARCHIVED
                                ? 'linear-gradient(145deg, rgba(255,217,235,1) 0%, rgba(223,236,255,1) 68%)'
                                : 'transparent',
                        '&+&': {
                            mt: 2,
                        },
                    }}
                >
                    <CardActionArea
                        LinkComponent={Link}
                        href={`/routines/${routine.id}`}
                    >
                        <CardHeader
                            title={routine.name}
                            titleTypographyProps={{ variant: 'subtitle1' }}
                            subheader={`Created: ${routine.createdAt}`}
                            avatar={
                                <Avatar>
                                    {routine.name
                                        .split(' ')
                                        .map(word => word[0])
                                        .join('')}
                                </Avatar>
                            }
                            action={
                                <FavButton
                                    status={routine.status}
                                    routineId={routine.id}
                                />
                            }
                        />
                    </CardActionArea>
                </Card>
            ))}
        </>
    );
};

export default RoutineList;
