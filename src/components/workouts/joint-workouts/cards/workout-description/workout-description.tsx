import { Typography } from 'antd';

import styles from './workout-description.module.scss';

const { Text } = Typography;

type WorkoutDescriptionProps = {
    trainingType: string;
    avgWeightInWeek: number;
};

export const WorkoutDescription = ({ trainingType, avgWeightInWeek }: WorkoutDescriptionProps) => (
    <div className={styles.block}>
        <p className={styles.description}>
            <span>Тип тренировки:</span>
            <Text>{trainingType}</Text>
        </p>

        <p className={styles.description}>
            <span>Средняя нагрузка:</span>

            <Text ellipsis={{ tooltip: `${avgWeightInWeek} кг/нед` }}>
                {avgWeightInWeek} кг/нед
            </Text>
        </p>
    </div>
);
