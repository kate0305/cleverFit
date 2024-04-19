import { Fragment } from 'react';
import { Typography } from 'antd';
import { selectActiveTab } from '@redux/redusers/achievements-slice';

import { Column, ColumnConfig } from '@ant-design/charts';
import { XS_WIDTH } from '@constants/index';
import { useAppSelector } from '@hooks/index';
import { DateFormats } from '@type/dates';
import { AchievementsTabsKeys } from '@type/tabs';
import { TrainingDataForStatistics } from '@type/training';
import { getFormattedDate } from '@utils/get-date';
import { useMediaQuery } from '@utils/use-media-query';

import styles from './load-chart.module.scss';

const { Paragraph } = Typography;

type LoadChartProps = {
    data: TrainingDataForStatistics[];
};

export const LoadChart = ({ data }: LoadChartProps) => {
    const isMobile = useMediaQuery(`(max-width: ${XS_WIDTH})`);
    const activeTab = useAppSelector(selectActiveTab);

    const formatedData = data
        .sort((a, b) => a.date.diff(b.date))
        .map((item) => ({
            ...item,
            date: getFormattedDate(item.date, DateFormats.DD_MM),
        }));

    const scrollbar = {
        scrollbar: {
            x: {
                ratio: isMobile ? 0.17 : 0.5,
            },
        },
    };

    const config: ColumnConfig = {
        data: formatedData,
        height: isMobile ? 236 : 374,
        autoFit: true,
        xField: 'date',
        yField: 'averageLoad',
        colorField: '#85A5FF',
        sizeField: isMobile ? 20 : 30,
        tooltip: false,
        axis: {
            y: {
                tick: false,
                grid: true,
                gridLineWidth: 2,
                gridFilter: (_, index: number) => index !== 0,
                gridLineDash: [2, 4],
                gridStroke: '#f0f0f0',
                gridStrokeOpacity: 1,
                label: true,
                labelSpacing: 3,
                labelFormatter: (load: number) => `${load} кг`,
            },
            x: {
                title: 'Нагрузка, кг',
                titleFontFamily: 'Inter',
                titleSpacing: isMobile ? 10 : 16,
                titleFontSize: isMobile ? 9 : 14,
                line: true,
                lineLineDash: [2, 4],
                lineStroke: '#bfbfbf',
                lineStrokeOpacity: 1,
                tick: false,
                labelSpacing: 13,
                labelFontSize: isMobile ? 7.5 : 12,
                labelAutoHide: false,
                labelAutoRotate: false,
            },
        },
    };

    const columnConfig =
        activeTab === AchievementsTabsKeys.WEEK ? { ...config } : { ...config, ...scrollbar };

    return (
        <Fragment>
            {activeTab === AchievementsTabsKeys.MONTH && (
                <Paragraph className={styles.title}>Средняя нагрузка по дням недели</Paragraph>
            )}
            <Column
                {...columnConfig}
                className={
                    activeTab === AchievementsTabsKeys.WEEK ? styles.wrapper : styles.wrapper_month
                }
            />
        </Fragment>
    );
};
