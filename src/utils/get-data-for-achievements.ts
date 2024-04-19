import dayjs, { Dayjs } from 'dayjs';

import { DateFormats } from '@type/dates';
import { UserTrainingResp } from '@type/service';
import { AchievementsTabsKeys } from '@type/tabs';
import {
    MostFrequentExercise,
    TrainingDataForStatistics,
    TrainingNames,
    UserTraining,
} from '@type/training';

import { calculateAverageLoad, findMostFrequentExercise } from './calcutate-data-for-achievements';
import { getFormattedDate } from './get-date';

export const getTrainingsForSelectedPeriod = (
    trainingList: UserTrainingResp,
    firstDay: Dayjs,
    lastDay: Dayjs,
    selectedTraining: string,
) => {
    const data = Object.entries(trainingList);
    const isAllFilter = selectedTraining === TrainingNames.ALL;

    const trainingListForSelectedPeriod = data.flatMap(([date, trainings]) =>
        dayjs(date).isBetween(firstDay, lastDay, DateFormats.DAY_UNIT, '[]')
            ? trainings.filter(({ name }) => isAllFilter || name === selectedTraining)
            : [],
    );

    return trainingListForSelectedPeriod;
};

export const getTrainingDataForStatistics = (
    trainingsList: UserTraining[],
    firstDay: Dayjs,
    lastDay: Dayjs,
    selectedTraining: string,
) => {
    let currentDay = firstDay;
    const trainingDataForStatistics = [];

    while (currentDay.isSameOrBefore(lastDay, DateFormats.DAY_UNIT)) {
        const dateString = getFormattedDate(currentDay, DateFormats.EN);
        const trainingsForCurrentDay = trainingsList.filter(
            ({ date, name }) =>
                getFormattedDate(date, DateFormats.EN) === dateString &&
                (selectedTraining === TrainingNames.ALL || name === selectedTraining),
        );

        let averageLoad = 0;
        let mostFrequencyExercise = {
            name: '',
            count: 0,
        };

        if (trainingsForCurrentDay.length > 0) {
            averageLoad = calculateAverageLoad(trainingsForCurrentDay, selectedTraining);
            mostFrequencyExercise = findMostFrequentExercise(trainingsForCurrentDay);
        }

        trainingDataForStatistics.push({
            date: currentDay,
            dayOfWeek: currentDay.weekday(),
            averageLoad,
            mostFrequencyExercise,
        });

        currentDay = currentDay.add(1, DateFormats.DAY_UNIT);
    }

    return trainingDataForStatistics;
};

export const getDataForPieChart = (
    data: TrainingDataForStatistics[],
    dataForMonthStatistic: MostFrequentExercise[],
    activeTab: string,
) => {
    const currentData =
        activeTab === AchievementsTabsKeys.WEEK
            ? data.map(({ mostFrequencyExercise }) => mostFrequencyExercise)
            : dataForMonthStatistic;

    const exercisesData = currentData.reduce<Record<string, number>>((acc, { name }) => {
        if (name) {
            acc[name] = (acc[name] || 0) + 1;
        }

        return acc;
    }, {});

    const exersicesForChart = Object.keys(exercisesData).map((name) => ({
        name,
        count: exercisesData[name],
    }));

    return exersicesForChart;
};
