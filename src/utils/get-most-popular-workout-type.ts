import { UserTrainingResp } from '@type/service';
import { TrainingTypes } from '@type/training';

import { getTrainingTotalLoad } from './calcutate-data-for-achievements';

export const getMostPopularWorkoutType = (userTrainingsList: UserTrainingResp) => {
    const mostPopularWorkout = {
        name: '',
        totalLoad: 0,
    };

    Object.values(userTrainingsList)
        .flat()
        .forEach(({ name, exercises }) => {
            const currentLoad = getTrainingTotalLoad(exercises);

            if (mostPopularWorkout.totalLoad < currentLoad) {
                mostPopularWorkout.name = name;
                mostPopularWorkout.totalLoad = currentLoad;
            }
        });

    return TrainingTypes[mostPopularWorkout.name as keyof typeof TrainingTypes];
};
