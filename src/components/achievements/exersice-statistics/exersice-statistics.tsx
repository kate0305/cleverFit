import { Fragment } from 'react';
import { Badge, List, Typography } from 'antd';
import classnames from 'classnames/bind';
import dayjs from 'dayjs';
import { selectActiveTab } from '@redux/redusers/achievements-slice';

import { useAppSelector } from '@hooks/index';
import { AchievementsTabsKeys } from '@type/tabs';
import { StatisticsType, TrainingDataForStatistics } from '@type/training';
import { getDataForPieChart } from '@utils/calcutate-data-for-achievements';
import { getMostFrequentExerciseForMonth } from '@utils/get-data-per-week';

import { PieChart } from '../diagrams/pie-chart';
import { ListByWeek } from '../weekly-statistics/list-by-week';

import styles from './exersice-statistics.module.scss';

const cx = classnames.bind(styles);

const { Title, Paragraph } = Typography;

type ExerciseStatisticsProps = {
    data: TrainingDataForStatistics[];
};

export const ExerciseStatistics = ({ data }: ExerciseStatisticsProps) => {
    const activeTab = useAppSelector(selectActiveTab);
    const monthData = getMostFrequentExerciseForMonth(data);

    const dataForChart = getDataForPieChart(data, monthData, activeTab);

    return (
        <Fragment>
            <PieChart data={dataForChart} />
            <div className={styles.wrapper}>
                <Title level={5} className={styles.title}>
                    Самые частые упражнения по дням недели{' '}
                    {activeTab === AchievementsTabsKeys.WEEK ? '' : 'за месяц'}
                </Title>
                {activeTab === AchievementsTabsKeys.WEEK ? (
                    <ListByWeek
                        data={data as TrainingDataForStatistics[]}
                        type={StatisticsType.EXERCISE}
                    />
                ) : (
                    <List
                        dataSource={monthData}
                        size='small'
                        className={styles.container}
                        renderItem={(item, index) => {
                            const badge = cx({
                                badge: true,
                                empty: !item.name,
                            });

                            return (
                                <List.Item className={styles.row}>
                                    <Badge count={index + 1} className={badge} />
                                    <Paragraph className={styles.weekday}>
                                        {dayjs().weekday(index).format('dddd')}
                                    </Paragraph>
                                    <Paragraph className={styles.data}>{item.name || ''}</Paragraph>
                                </List.Item>
                            );
                        }}
                    />
                )}
            </div>
        </Fragment>
    );
};
