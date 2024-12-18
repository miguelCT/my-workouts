import { RoutineStatus } from '@/app/lib/constants';
import { Divider, LinearProgress, Typography } from '@mui/material';
import { type Metadata, type NextPage } from 'next';
import { Suspense } from 'react';
import RoutineList from '../ui/routines/RoutineList';

export const metadata: Metadata = {
    title: 'Routines',
};

const Page: NextPage = () => {
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

            <Divider sx={{ my: 3 }} />

            <Typography
                variant="h6"
                sx={{
                    my: 1,
                }}
            >
                Archived Routines
            </Typography>
            <Suspense fallback={<LinearProgress />}>
                <RoutineList filteredBy={RoutineStatus.ARCHIVED} />
            </Suspense>
        </div>
    );
};
export default Page;
