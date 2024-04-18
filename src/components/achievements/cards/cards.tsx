import { Col, Row, Typography } from 'antd';
import { Dayjs } from 'dayjs';

import { ONE_DAY_PERIOD } from '@constants/index';
import { DateFormats } from '@type/dates';
import { CalculationType, UserTraining } from '@type/training';
import { calculateTotalData } from '@utils/calcutate-data-for-achievements';

import { ContentCard } from '@components/content-card';

import styles from './cards.module.scss';

const { Paragraph } = Typography;

type WeeklyStatisticsProps = {
    trainigs: UserTraining[];
    firstDay: Dayjs;
    lastDay: Dayjs;
};

export const Cards = ({ trainigs, firstDay, lastDay }: WeeklyStatisticsProps) => {
    const calculationTypes = [
        CalculationType.LOAD,
        CalculationType.REPLAYS,
        CalculationType.APPROACHES,
    ];

    const results = calculationTypes.map((type) => calculateTotalData(trainigs, type));

    const [totalLoad, totalReplays, totalApproaches] = results;

    const period = lastDay.diff(firstDay, DateFormats.DAY_UNIT) + ONE_DAY_PERIOD;
    const loadPerDay = totalLoad / period;

    const dataForRendering = [
        { id: 1, title: 'Общая нагрузка, кг', value: totalLoad },
        {
            id: 2,
            title: 'Нагрузка в\u00A0день, кг',
            value: Number.isInteger(loadPerDay) ? loadPerDay : loadPerDay.toFixed(1),
        },
        { id: 3, title: 'Количество повторений,\u00A0раз', value: totalReplays },
        { id: 4, title: 'Подходы, раз', value: totalApproaches },
    ];

    return (
        <div className={styles.wrapper}>
            <Row
                gutter={[
                    { xs: 0, sm: 16, md: 16, lg: 24 },
                    { xs: 16, sm: 16, md: 16, lg: 0 },
                ]}
            >
                {dataForRendering.map(({ id, title, value }, index) => (
                    <Col
                        lg={{ span: 6 }}
                        md={{ span: 12 }}
                        sm={{ span: 24 }}
                        xs={{ span: 24 }}
                        key={id}
                    >
                        <ContentCard className={styles.card}>
                            <div className={styles.container}>
                                <Paragraph className={styles.value}>{value}</Paragraph>
                                <Paragraph
                                    className={index === 3 ? styles.title_short : styles.title}
                                >
                                    {title}
                                </Paragraph>
                            </div>
                        </ContentCard>
                    </Col>
                ))}
            </Row>
        </div>
    );
};
