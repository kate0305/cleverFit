import dayjs, { Dayjs } from 'dayjs';

import { DURATION_PERIOD_FOR_WEEK, NUMBER_OF_DAYS_IN_WEEK, NUMBER_OF_WEEKS_IN_MONTH } from '@constants/index';
import { DateFormats } from '@type/dates';
import { TrainingDataForStatistics } from '@type/training';

export const getDataByWeeks = (data: TrainingDataForStatistics[], firstDay: Dayjs) => {
    const weeks = [];

    for (let i = 0; i < NUMBER_OF_WEEKS_IN_MONTH; i++) {
        const weekStart = firstDay.add(i * NUMBER_OF_DAYS_IN_WEEK, DateFormats.DAY_UNIT);
        const weekEnd = weekStart.add(DURATION_PERIOD_FOR_WEEK, DateFormats.DAY_UNIT);
        const weekData = data.filter(({ date }) =>
            dayjs(date).isBetween(weekStart, weekEnd, DateFormats.DAY_UNIT, '[]'),
        );

        weeks.push({ weekStart, weekEnd, weekData });
    }

    return weeks;
};

export const getMostFrequentExerciseForMonth = (data: TrainingDataForStatistics[]) => {
    const mostFrequentExercise = Array(7).fill({ name: '', count: 0 });

    data.forEach(({ date, mostFrequencyExercise }) => {
        const dayOfWeek = date.weekday();

        if (mostFrequencyExercise.count > mostFrequentExercise[dayOfWeek].count) {
            mostFrequentExercise[dayOfWeek] = mostFrequencyExercise;
        }
    });

    return mostFrequentExercise;
};
