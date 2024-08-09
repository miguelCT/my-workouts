import { Grid, Skeleton } from '@mui/material';

function CardSkeleton() {
    return (
        <Grid item xs={6} md={4} container spacing={1}>
            <Grid item xs={12}>
                <Skeleton variant="text" width={'50%'} /> {/* Title */}
            </Grid>
            <Grid item xs={12}>
                <Skeleton variant="text" width="100%" />
            </Grid>
            <Grid item xs={6}>
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={50}
                    sx={{ my: 1 }}
                />{' '}
                {/* Exercise */}
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={50}
                    sx={{ my: 1 }}
                />{' '}
                {/* Exercise */}
            </Grid>
            <Grid item xs={6}>
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={50}
                    sx={{ my: 1 }}
                />{' '}
                {/* Exercise */}
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={50}
                    sx={{ my: 1 }}
                />{' '}
                {/* Exercise */}
            </Grid>
        </Grid>
    );
}

export default function RoutineInfoSkeleton() {
    return (
        <>
            <Skeleton variant="text" width={'35%'} height={50} /> {/* Title */}
            <Grid container spacing={1} direction={'row'}>
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
            </Grid>
        </>
    );
}
