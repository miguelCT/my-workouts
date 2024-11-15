'use client';

import { updateRoutineStatus } from '@/app/lib/actions';
import { IconButton } from '@mui/material';

import ArchivOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ArchiveIcon from '@mui/icons-material/Archive';

import { type Routine } from '@/app/lib/definitions';
import { useOptimisticAction } from 'next-safe-action/hooks';
import { type FC } from 'react';
import { RoutineStatus } from '@/app/lib/constants';

type ArchiveButtonProps = {
    routineId: string;
    status: Routine['status'];
};

const ArchiveButton: FC<ArchiveButtonProps> = ({ status, routineId }) => {
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
                onStatusChange(
                    status === RoutineStatus.ARCHIVED
                        ? RoutineStatus.ACTIVE
                        : RoutineStatus.ARCHIVED,
                );
            }}
        >
            {optimisticState === RoutineStatus.ARCHIVED ? (
                <ArchiveIcon />
            ) : (
                <ArchivOutlinedIcon />
            )}
        </IconButton>
    );
};

export default ArchiveButton;