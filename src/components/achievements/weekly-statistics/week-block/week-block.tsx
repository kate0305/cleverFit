import { Fragment } from 'react';
import { Typography } from 'antd';
import { selectActiveTab } from '@redux/redusers/achievements-slice';

import { useAppSelector } from '@hooks/index';
import { DateFormats } from '@type/dates';
import { AchievementsTabsKeys } from '@type/tabs';
import { StatisticsDataByWeek, StatisticsType, TrainingDataForStatistics } from '@type/training';
import { getFormattedDate } from '@utils/get-date';

import { ListByWeek } from '../list-by-week';
import { TitleByWeek } from '../title-by-week';

import styles from './week-block.module.scss';

const { Title } = Typography;

type WeeklyStatisticsProps = {
    title: string;
    data: TrainingDataForStatistics[] | StatisticsDataByWeek[];
    type: `${StatisticsType}`;
};

export const WeekBlock = ({ title, data, type }: WeeklyStatisticsProps) => {
    const activeTab = useAppSelector(selectActiveTab);

    return (
        <div
            className={
                activeTab === AchievementsTabsKeys.WEEK ? styles.wrapper : styles.wrapper_month
            }
        >
            {activeTab === AchievementsTabsKeys.WEEK ? (
                <Fragment>
                    <Title level={5} className={styles.title}>
                        {title} по&nbsp;дням&nbsp;недели
                    </Title>
                    <ListByWeek data={data as TrainingDataForStatistics[]} type={type} />
                </Fragment>
            ) : (
                (data as StatisticsDataByWeek[]).map(({ weekStart, weekEnd, weekData }) => (
                    <div className={styles.week} key={getFormattedDate(weekStart, DateFormats.EN)}>
                        <TitleByWeek weekStart={weekStart} weekEnd={weekEnd} />
                        <ListByWeek data={weekData} type={type} />
                    </div>
                ))
            )}
        </div>
    );
};
