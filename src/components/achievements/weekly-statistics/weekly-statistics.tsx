import { Dayjs } from 'dayjs';
import { selectActiveTab } from '@redux/redusers/achievements-slice';

import { XL_WIDTH } from '@constants/index';
import { useAppSelector } from '@hooks/index';
import { AchievementsTabsKeys } from '@type/tabs';
import { StatisticsDataByWeek, StatisticsType, TrainingDataForStatistics } from '@type/training';
import { getDataByWeeks } from '@utils/get-data-per-week';
import { useMediaQuery } from '@utils/use-media-query';

import { CollapseWeek } from '../collapse-week';

import { WeekBlock } from './week-block/week-block';

type WeeklyStatisticsProps = {
    title: string;
    data: TrainingDataForStatistics[];
    firstDay: Dayjs;
    type: `${StatisticsType}`;
};

export const WeeklyStatistics = ({ title, data, firstDay, type }: WeeklyStatisticsProps) => {
    const isMobile = useMediaQuery(`(max-width: ${XL_WIDTH})`);
    const activeTab = useAppSelector(selectActiveTab);

    const getDataForRendering = () => {
        if (type === StatisticsType.LOAD && activeTab === AchievementsTabsKeys.MONTH) {
            const dataByWeeks = getDataByWeeks(data, firstDay);

            return dataByWeeks;
        }
        const sortedDataByDayOfWeek = data.sort((a, b) => a.date.weekday() - b.date.weekday());

        return sortedDataByDayOfWeek;
    };

    const dataForRendering = getDataForRendering();

    return isMobile && type === StatisticsType.LOAD && activeTab === AchievementsTabsKeys.MONTH ? (
        <CollapseWeek data={dataForRendering as StatisticsDataByWeek[]} type={type} />
    ) : (
        <WeekBlock title={title} data={dataForRendering} type={type} />
    );
};
