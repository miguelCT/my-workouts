import { type Metadata } from 'next';
import { Suspense } from 'react';
import { LinearProgress, Typography } from '@mui/material';
import RoutineList from '../ui/routines/RoutineList';

export const metadata: Metadata = {
    title: 'Routines',
};

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
    };
}) {
    const query = searchParams?.query ?? '';

    return (
        <div>
            <Typography
                variant="h5"
                color="primary"
                sx={{
                    my: 1,
                }}
            >
                Routines
            </Typography>
            <Suspense fallback={<LinearProgress />}>
                <RoutineList />
            </Suspense>
        </div>
    );
}
