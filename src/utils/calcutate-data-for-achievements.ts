import {
    CalculationType,
    Exercise,
    ExerciseField,
    TrainingNames,
    UserTraining,
} from '@type/training';

const calculateTotalDataInExercise = (exercises: Exercise[], value: ExerciseField) =>
    exercises.reduce((sum, exercise) => sum + (exercise[value] || 0), 0);

export const calculateTrainingTotalLoad = (exercises: Exercise[]) =>
    exercises.reduce(
        (sum, { approaches, weight, replays }) =>
            sum + (approaches || 1) * (weight || 0) * (replays || 1),
        0,
    );

export const calculateAverageLoad = (data: UserTraining[], selectedTraining: string) => {
    const filteredData = data.filter(
        ({ name }) => selectedTraining === TrainingNames.ALL || name === selectedTraining,
    );

    const dayTotalLoad = filteredData.reduce(
        (total, { exercises }) => total + calculateTrainingTotalLoad(exercises),
        0,
    );

    const dayTotalExercises = filteredData.reduce(
        (total, { exercises }) => total + exercises.length,
        0,
    );

    return Math.round(dayTotalLoad / dayTotalExercises) || 0;
};

export const calculateTotalData = (traingsList: UserTraining[], value: `${CalculationType}`) => {
    const totalData = traingsList.reduce((total, { exercises }) => {
        const calculationFunction = () => {
            if (value === CalculationType.LOAD) {
                return calculateTrainingTotalLoad(exercises);
            }

            return calculateTotalDataInExercise(exercises, value);
        };

        return total + calculationFunction();
    }, 0);

    return totalData;
};

export const findMostFrequentExercise = (trainings: UserTraining[]) => {
    const exersisesNameAndCount = trainings
        .flatMap(({ exercises }) => exercises.map(({ name }) => name))
        .reduce<Record<string, number>>((acc, name) => {
            acc[name] = (acc[name] || 0) + 1;

            return acc;
        }, {});

    const mostFrequencyExercise = Object.entries(exersisesNameAndCount).reduce(
        (maxValue, currentValue) => (currentValue[1] > maxValue[1] ? currentValue : maxValue),
        ['', 0],
    );

    return { name: mostFrequencyExercise[0], count: mostFrequencyExercise[1] };
};

export const findMostFrequentValue = (values: string[]) => {
    const valueCount: Record<string, number> = {};

    values.forEach((value) => {
        valueCount[value] = (valueCount[value] || 0) + 1;
    });

    const mostFrequentValue = {
        value: '',
        totalCount: 0,
    };

    Object.entries(valueCount).forEach(([value, count]) => {
        if (count > mostFrequentValue.totalCount) {
            mostFrequentValue.totalCount = count;
            mostFrequentValue.value = value;
        }
    });

    return mostFrequentValue.value;
};
