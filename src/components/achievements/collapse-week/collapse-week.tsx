import { Collapse } from 'antd';

import { DownOutlined } from '@ant-design/icons';
import { DateFormats } from '@type/dates';
import { StatisticsDataByWeek, StatisticsType, TrainingDataForStatistics } from '@type/training';
import { getFormattedDate } from '@utils/get-formatted-date';

import { ListByWeek } from '../weekly-statistics/list-by-week';
import { TitleByWeek } from '../weekly-statistics/title-by-week';

const { Panel } = Collapse;

type WeeklyStatisticsProps = {
    data: StatisticsDataByWeek[];
    type: `${StatisticsType}`;
};

const CollapseIcon = (props: { isActive?: boolean }) => (
    <DownOutlined
        style={{ fontSize: 'var(--font-size-m)', color: 'var(--light-title-85)' }}
        rotate={props.isActive ? 180 : 0}
    />
);

export const CollapseWeek = ({ data, type }: WeeklyStatisticsProps) => (
    <Collapse bordered={false} ghost={true} expandIcon={CollapseIcon} expandIconPosition='end'>
        {data.map(({ weekStart, weekEnd, weekData }) => (
            <Panel
                header={<TitleByWeek weekStart={weekStart} weekEnd={weekEnd} />}
                key={getFormattedDate(weekStart, DateFormats.DD_MM)}
            >
                <ListByWeek data={weekData as TrainingDataForStatistics[]} type={type} />
            </Panel>
        ))}
    </Collapse>
);
