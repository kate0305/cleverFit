import { periodOptions } from '@components/workouts/drawer-create-workout/data';

export const getWorkoutPeriodName = (period: number | undefined) => {
    const perioData = periodOptions.find(({ value }) => value === period);

    return perioData?.label ?? '';
};
