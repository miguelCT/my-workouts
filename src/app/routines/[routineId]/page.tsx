import RoutineInfo from '@/app/ui/routines/RoutineInfo';
import RoutineInfoSkeleton from '@/app/ui/routines/RoutineInfoSkeleton';
import { type Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Routines',
};

export default async function Page(props: {
    params: Promise<{
        routineId: string;
    }>;
}) {
    const params = await props.params;
    const routineId = params?.routineId;

    return (
        <>
            <Suspense fallback={<RoutineInfoSkeleton />}>
                <RoutineInfo id={routineId} />
            </Suspense>
        </>
    );
}
