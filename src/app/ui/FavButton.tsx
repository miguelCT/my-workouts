'use client';

import { updateRoutineStatus } from '@/app/lib/actions';
import { IconButton } from '@mui/material';

import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import { type Routine } from '@/app/lib/definitions';
import { useOptimisticAction } from 'next-safe-action/hooks';
import { type FC } from 'react';

type FavButtonProps = {
    routineId: string;
    status: Routine['status'];
};

const FavButton: FC<FavButtonProps> = ({ status, routineId }) => {
    const { execute, optimisticState } = useOptimisticAction(
        updateRoutineStatus,
        {
            currentState: status,

            updateFn: (s, input) => {
                return input.status;
            },
        },
    );
    const onStatusChange = (newStatus: Routine['status']): void => {
        execute({
            id: routineId,
            status: newStatus,
        });
    };

    return (
        <IconButton
            onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                onStatusChange(status === 'fav' ? 'active' : 'fav');
            }}
        >
            {optimisticState === 'fav' ? <StarIcon /> : <StarBorderIcon />}
        </IconButton>
    );
};

export default FavButton;
