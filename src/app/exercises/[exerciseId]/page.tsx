import Exercise from '@/app/ui/exercises/Exercise';
import { type FC, Suspense } from 'react';

type ExercisePageProps = {
    params: Promise<{
        exerciseId: string;
    }>;
};
const ExercisePage: FC<ExercisePageProps> = async ({ params }) => {
    const exerciseId = (await params)?.exerciseId;

    return (
        <div>
            <h1>Exercise Page</h1>
            <Suspense fallback={<div>Loading...</div>}>
                {exerciseId && <Exercise id={exerciseId} />}
            </Suspense>
        </div>
    );
};

export default ExercisePage;
