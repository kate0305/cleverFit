import { Typography } from 'antd';
import { Dayjs } from 'dayjs';

import { DateFormats } from '@type/dates';
import { getFormattedDate } from '@utils/get-formatted-date';

import styles from './title-by-week.module.scss';

const { Paragraph } = Typography;

type WeeklyStatisticsProps = {
    weekStart: Dayjs;
    weekEnd: Dayjs;
};

export const TitleByWeek = ({ weekStart, weekEnd }: WeeklyStatisticsProps) => {
    const weekStartToString = getFormattedDate(weekStart, DateFormats.DD_MM);
    const weekEndToString = getFormattedDate(weekEnd, DateFormats.DD_MM);

    return (
        <Paragraph className={styles.title}>
            Неделя {weekStartToString}-{weekEndToString}
        </Paragraph>
    );
};
