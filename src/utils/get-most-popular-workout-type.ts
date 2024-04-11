import { UserTrainingResp } from '@type/service';
import { TrainingTypes } from '@type/training';

export const getMostPopularWorkoutType = (userTrainingsList: UserTrainingResp) => {
    const mostPopularWorkout = {
        name: '',
        totalLoad: 0,
    };

    Object.values(userTrainingsList)
        .flat()
        .forEach(({ name, exercises }) => {
            const currentLoad = exercises.reduce(
                (sum, { approaches, weight, replays }) =>
                    sum + (approaches ?? 1) * (weight ?? 1) * (replays ?? 1),
                0,
            );

            if (mostPopularWorkout.totalLoad < currentLoad) {
                mostPopularWorkout.name = name;
                mostPopularWorkout.totalLoad = currentLoad
            }
        });

    return TrainingTypes[mostPopularWorkout.name as keyof typeof TrainingTypes];
};
