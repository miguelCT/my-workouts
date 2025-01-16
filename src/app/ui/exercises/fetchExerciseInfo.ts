'use server';

import type { ExerciseTemplate } from '@/app/lib/definitions';

const fetchExerciseInfo = async (id: string): Promise<ExerciseTemplate> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                id,
                name: 'Bench Press',
                description:
                    'The bench press is a popular exercise for building upper body strength.',
                routine_id: '1',
                group: '1',
                repetition_max: 10,
                repetition_min: 5,
                series_max: 5,
                series_min: 3,
            });
        }, 2000);
    });
};

export default fetchExerciseInfo;
