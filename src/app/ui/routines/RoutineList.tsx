import { fetchRoutines } from '@/app/lib/data';
import { Avatar, Card, CardActionArea, CardHeader } from '@mui/material';
import Box from 'next-auth/providers/box';
import Link from 'next/link';

export default async function RoutineList() {
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
                        />
                    </CardActionArea>
                </Card>
            ))}
        </>
    );
}
