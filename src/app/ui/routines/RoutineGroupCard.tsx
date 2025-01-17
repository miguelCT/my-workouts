'use client';

import {
    createDayInRoutine,
    updateDayInRoutine,
    type UpdateRoutineEntryType,
} from '@/app/lib/actions';
import { type ExerciseEntry, type Routine } from '@/app/lib/definitions';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    IconButton,
    LinearProgress,
} from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form-mui';

import {
    CreateRoutineEntrySchema,
    UpdateRoutineSchema,
} from '@/app/lib/formSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import EditIcon from '@mui/icons-material/Edit';
import SubmissionErrorAlert from '../SumissionErrorAlert';
import ExerciseEntryCard from './ExerciseEntryCard';

function filterEntriesByDate(
    entries: ExerciseEntry[],
    date: string,
): ExerciseEntry[] {
    const entriesByDate = entries.filter(
        entry => new Date(entry.createdAt).toDateString() === date,
    );
    return (
        entriesByDate
            .filter(obj => obj.repetitions !== null)
            // Concatenate with objects having undefined repetitionss
            .concat(entriesByDate.filter(obj => obj.repetitions === null))
    );
}

type RoutineGroupCardProps = {
    date: string;
    routineInfo: Routine;
    empty?: boolean;
    index?: number;
};

export default function RoutineGroupCard({
    date,
    routineInfo,
    empty,
    index,
}: RoutineGroupCardProps) {
    const { routineId } = useParams<{ routineId: string }>();
    const router = useRouter();
    const [isEditionEnabled, setIsEditionEnabled] = useState(empty);
    const [serverSubmitResult, setServerSubmitResult] =
        useState<
            Awaited<
                ReturnType<
                    typeof createDayInRoutine & typeof updateDayInRoutine
                >
            >
        >();
    const methods = useForm<UpdateRoutineEntryType>({
        defaultValues: {
            id: routineId,
            exercises: routineInfo.exercises.map(ex => ({
                ...ex,
                // When we're creating an empty register, we set the values to null
                entries: empty
                    ? [...Array(ex.template.series_min).keys()].map(() => ({
                          weight: null,
                          repetitions: null,
                      }))
                    : filterEntriesByDate(ex.entries, date),
            })),
        },
        resolver: zodResolver(
            empty ? CreateRoutineEntrySchema : UpdateRoutineSchema,
        ),
    });

    const { handleSubmit, formState, getValues } = methods;

    const submitAction = handleSubmit(async data => {
        try {
            const result = empty
                ? await createDayInRoutine(routineId, data)
                : await updateDayInRoutine(routineId, data);

            setServerSubmitResult(result);

            if (!result?.serverError && !result?.validationErrors) {
                setIsEditionEnabled(false);
                router.refresh();
            }
        } catch (error) {
            console.error(` Error: ${(error as Error)?.message}`);
        }
    });

    const formValues = useMemo(() => getValues(), [getValues]);

    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={submitAction} noValidate autoComplete="off">
                    <Card
                        variant="outlined"
                        sx={{
                            border: t =>
                                empty
                                    ? `1px dashed ${t.palette.primary.main}`
                                    : 'none',
                            background: empty
                                ? 'transparent'
                                : 'linear-gradient(145deg, rgba(255,217,235,1) 0%, rgba(223,236,255,1) 68%)',
                        }}
                    >
                        {!empty && (
                            <CardHeader
                                title={`Week ${index} `}
                                sx={{ pb: 1, backgroundColor: '#ffb8f04f' }}
                                subheader={` Created at: ${date} `}
                                subheaderTypographyProps={{
                                    variant: 'caption',
                                }}
                                action={
                                    !isEditionEnabled && (
                                        <>
                                            {empty ? (
                                                <Button
                                                    onClick={() =>
                                                        setIsEditionEnabled(
                                                            true,
                                                        )
                                                    }
                                                >
                                                    Start day
                                                </Button>
                                            ) : (
                                                <IconButton
                                                    color="primary"
                                                    onClick={() =>
                                                        setIsEditionEnabled(
                                                            true,
                                                        )
                                                    }
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            )}
                                        </>
                                    )
                                }
                            />
                        )}
                        <Divider />
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                }}
                            >
                                {formValues.exercises.map(
                                    (exercise, exerciseIndex) => (
                                        <div key={exercise.template.id}>
                                            <ExerciseEntryCard
                                                exerciseIndex={exerciseIndex}
                                                entries={
                                                    empty
                                                        ? [
                                                              ...Array(
                                                                  exercise
                                                                      .template
                                                                      .series_min,
                                                              ).keys(),
                                                          ].map(() => ({
                                                              id: '',
                                                              createdAt: '',
                                                              weight: null,
                                                              repetitions: null,
                                                          }))
                                                        : filterEntriesByDate(
                                                              exercise.entries,
                                                              date,
                                                          )
                                                }
                                                template={exercise.template}
                                                readOnly={!isEditionEnabled}
                                            />
                                            {exerciseIndex <
                                                formValues.exercises.length -
                                                    1 && <Divider />}
                                        </div>
                                    ),
                                )}
                            </Box>
                        </CardContent>
                        {formState.isSubmitting && <LinearProgress />}
                        <SubmissionErrorAlert
                            serverError={serverSubmitResult?.serverError}
                            validationErrors={
                                serverSubmitResult?.validationErrors
                            }
                        />

                        <CardActions
                            sx={{
                                justifyContent: 'flex-end',
                            }}
                        >
                            {isEditionEnabled && (
                                <>
                                    <Button
                                        onClick={() =>
                                            setIsEditionEnabled(false)
                                        }
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="outlined"
                                        disabled={formState.isSubmitting}
                                    >
                                        Save
                                    </Button>
                                </>
                            )}
                        </CardActions>
                    </Card>
                </form>
            </FormProvider>
        </>
    );
}
