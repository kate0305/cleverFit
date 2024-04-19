import { TrainingNames, UserTraining } from '@type/training';

export const findExersiceByName = (training: UserTraining[], trainingName: string) =>
    training
        .filter(({ name }) => trainingName === TrainingNames.ALL || name === trainingName)
        .flatMap(({ exercises }) => exercises.map(({ name }) => name));
