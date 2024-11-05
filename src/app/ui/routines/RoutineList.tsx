import { fetchRoutines } from '@/app/lib/data';
import {
    Avatar,
    Card,
    CardActionArea,
    CardHeader,
    IconButton,
    Typography,
} from '@mui/material';

import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ArchiveIcon from '@mui/icons-material/ArchiveOutlined';
import Link from 'next/link';

import { type FC } from 'react';
import { type Routine } from '@/app/lib/definitions';
import FavButton from '../FavButton';

const RoutineList: FC = async () => {
    const routines = await fetchRoutines();
    return (
        <>
            {routines.map(routine => (
                <Card
                    key={routine.id}
                    variant="outlined"
                    // TODO revisar este código duplicado en RoutineGriupCard
                    sx={{
                        background:
                            'linear-gradient(145deg, rgba(255,217,235,1) 0%, rgba(223,236,255,1) 68%)',
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
