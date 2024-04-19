import { Fragment, useMemo } from 'react';
import dayjs from 'dayjs';
import { selectAchievements } from '@redux/redusers/achievements-slice';
import { selectTrainingData } from '@redux/redusers/trainings-slice';

import {
    DURATION_PERIOD_FOR_MONTH,
    DURATION_PERIOD_FOR_WEEK,
    SUNDAY_NUMBER_FOR_LOCAL,
} from '@constants/index';
import { useAppSelector } from '@hooks/index';
import { DateFormats } from '@type/dates';
import { AchievementsTabsKeys } from '@type/tabs';
import { StatisticsType } from '@type/training';
import { getTrainingDataForStatistics, getTrainingsForSelectedPeriod } from '@utils/get-data-for-achievements';
import { getFirstDayOfPeriod } from '@utils/get-date';

import { LoadChart } from '@components/achievements/diagrams/load-chart';

import { Cards } from '../cards';
import { EmptyStatistics } from '../empty-statistics';
import { ExerciseStatistics } from '../exersice-statistics';
import { FilterButtons } from '../filter-buttons';
import { FrequentTrainingCard } from '../frequent-training-card';
import { WeeklyStatistics } from '../weekly-statistics';

import styles from './week-achievements.module.scss';

export const WeekAchievements = () => {
    const { userTrainingsList } = useAppSelector(selectTrainingData);
    const { selectedTrainingFilter, activeTab } = useAppSelector(selectAchievements);

    const durationOfPeriod =
        activeTab === AchievementsTabsKeys.WEEK
            ? DURATION_PERIOD_FOR_WEEK
            : DURATION_PERIOD_FOR_MONTH;

    const lastDay =
        activeTab === AchievementsTabsKeys.WEEK
            ? dayjs()
            : dayjs().weekday(SUNDAY_NUMBER_FOR_LOCAL);

    const firstDay = getFirstDayOfPeriod(durationOfPeriod, DateFormats.DAY_UNIT, lastDay);

    const trainigsForSelectedPeriod = useMemo(() => getTrainingsForSelectedPeriod(
        userTrainingsList,
        firstDay,
        lastDay,
        selectedTrainingFilter,
    ), [firstDay, lastDay, selectedTrainingFilter, userTrainingsList]);

    const data = getTrainingDataForStatistics(
        trainigsForSelectedPeriod,
        firstDay,
        lastDay,
        selectedTrainingFilter,
    );

    return (
        <div className={styles.wrapper}>
            <FilterButtons />
            {trainigsForSelectedPeriod.length ? (
                <Fragment>
                    <div
                        className={
                            activeTab === AchievementsTabsKeys.WEEK
                                ? styles.load
                                : styles.load_month
                        }
                    >
                        <LoadChart data={data} />
                        <WeeklyStatistics
                            data={data}
                            type={StatisticsType.LOAD}
                            title='Средняя нагрузка'
                            firstDay={firstDay}
                        />
                    </div>
                    <Cards
                        trainigs={trainigsForSelectedPeriod}
                        firstDay={firstDay}
                        lastDay={lastDay}
                    />
                    <FrequentTrainingCard trainigs={trainigsForSelectedPeriod} />
                    <div className={styles.load}>
                        <ExerciseStatistics data={data} />
                    </div>
                </Fragment>
            ) : (
                <EmptyStatistics />
            )}
        </div>
    );
};
