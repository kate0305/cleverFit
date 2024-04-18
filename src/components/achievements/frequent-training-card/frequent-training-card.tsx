import { useMemo } from 'react';
import { Typography } from 'antd';
import { selectSelectedTrainingFilter } from '@redux/redusers/achievements-slice';

import { useAppSelector } from '@hooks/index';
import { TrainingNames, UserTraining } from '@type/training';
import { getMostFrequentValue } from '@utils/calcutate-data-for-achievements';

import styles from './frequent-training-card.module.scss';

const { Paragraph, Text } = Typography;

type FrequentTrainingCardProps = {
    trainigs: UserTraining[];
};

export const FrequentTrainingCard = ({ trainigs }: FrequentTrainingCardProps) => {
    const selectedFilter = useAppSelector(selectSelectedTrainingFilter);

    const trainingNames = trainigs.map(({ name }) => name);

    const exerciseNames = useMemo(
        () =>
            trainigs
                .filter(
                    ({ name }) => selectedFilter === TrainingNames.ALL || name === selectedFilter,
                )
                .flatMap(({ exercises }) => exercises.map(({ name }) => name)),
        [selectedFilter, trainigs],
    );

    const mostFrequentWorkout = getMostFrequentValue(trainingNames).toLocaleLowerCase();
    const mostFrequentExercise = getMostFrequentValue(exerciseNames).toLocaleLowerCase();

    return (
        <div className={styles.wrapper}>
            {selectedFilter === TrainingNames.ALL && (
                <Paragraph className={styles.row}>
                    <Text className={styles.title}>Самая частая тренировка</Text>
                    <Text className={styles.value}>{mostFrequentWorkout}</Text>
                </Paragraph>
            )}
            <Paragraph className={styles.row}>
                <Text className={styles.title}>Самое частое упражнение</Text>
                <Text className={styles.value}>{mostFrequentExercise}</Text>
            </Paragraph>
        </div>
    );
};
