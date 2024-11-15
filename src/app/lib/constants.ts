/* eslint-disable import/prefer-default-export */

export enum RoutineStatus {
    FAV = 'fav',
    ARCHIVED = 'archived',
    ACTIVE = 'active',
}

export const routineStatusList = [
    RoutineStatus.FAV,
    RoutineStatus.ARCHIVED,
    RoutineStatus.ACTIVE,
] as const;
