import { type ExerciseTemplate } from '@/app/lib/definitions';
import { Card, CardContent, Typography } from '@mui/material';
import Image from 'next/image';

import ExercisePlaceholder from './exercise_placeholder.jpg';
import fetchExerciseInfo from './fetchExerciseInfo';

enum Size {
    SMALL = 'small',
    NORMAL = 'normal',
}

interface ExerciseProps {
    size?: `${Size}`;
    info: Pick<
        ExerciseTemplate,
        'name' | 'description' | 'series_min' | 'series_max'
    >;
}

export const ExerciseInfo: React.FC<ExerciseProps> = ({
    info,
    size = Size.NORMAL,
}) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { name, description, series_max, series_min } = info;

    const { width, height } =
        size === Size.SMALL
            ? { width: 100, height: 125 }
            : { width: 200, height: 250 };
    return (
        <Card
            sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '20px',
                padding: '20px',
            }}
        >
            <Image
                src={ExercisePlaceholder}
                width={width}
                height={height}
                alt={name}
                style={{
                    borderRadius: '8px',
                }}
            />

            <CardContent sx={{ borderLeft: '1px solid #e0e0e0' }}>
                <Typography
                    gutterBottom
                    sx={{ color: 'text.secondary', fontSize: 14 }}
                >
                    Exercise
                </Typography>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="caption">
                    {`(min: ${series_min} ${series_max ? `- max: ${series_max}` : ''} series)`}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};

const Exercise: React.FC<Pick<ExerciseTemplate, 'id'>> = async ({ id }) => {
    const exercise = await fetchExerciseInfo(id);

    return <ExerciseInfo info={exercise} />;
};

export default Exercise;
