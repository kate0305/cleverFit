import { Badge, List, Typography } from 'antd';
import classnames from 'classnames/bind';
import { selectActiveTab } from '@redux/redusers/achievements-slice';

import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { DateFormats } from '@type/dates';
import { AchievementsTabsKeys } from '@type/tabs';
import { StatisticsType, TrainingDataForStatistics } from '@type/training';
import { getFormattedDate } from '@utils/get-formatted-date';

import styles from './list-by-week.module.scss';

const cx = classnames.bind(styles);

const { Paragraph } = Typography;

type WeeklyStatisticsProps = {
    data: TrainingDataForStatistics[];
    type: `${StatisticsType}`;
};

export const ListByWeek = ({ data, type }: WeeklyStatisticsProps) => {
    const activeTab = useAppSelector(selectActiveTab);

    return (
        <List
            dataSource={data}
            size='small'
            className={styles.container}
            renderItem={(item, index) => {
                const { date, averageLoad, mostFrequencyExercise } = item;
                const value =
                    type === StatisticsType.LOAD ? averageLoad : mostFrequencyExercise?.name;

                const badge = cx({
                    badge: true,
                    load: type === StatisticsType.LOAD && value,
                    load_empty: type === StatisticsType.LOAD && !value,
                    exersice_empty: type === StatisticsType.EXERCISE && !value,
                });

                return (
                    <List.Item className={styles.row}>
                        <Badge count={index + 1} className={badge} />
                        <Paragraph className={styles.weekday}>
                            {activeTab === AchievementsTabsKeys.WEEK
                                ? getFormattedDate(date, DateFormats.DAY_OF_WEEK_UNIT)
                                : getFormattedDate(date, DateFormats.LOCAL)}
                        </Paragraph>
                        <Paragraph className={styles.data}>
                            {value || ''} {type === StatisticsType.LOAD && averageLoad ? 'кг' : ''}
                        </Paragraph>
                    </List.Item>
                );
            }}
        />
    );
};
