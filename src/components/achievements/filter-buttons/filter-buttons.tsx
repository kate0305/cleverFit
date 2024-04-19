import { Radio, RadioChangeEvent, Typography } from 'antd';
import {
    selectSelectedTrainingFilter,
    setSelectedTrainingFilter,
} from '@redux/redusers/achievements-slice';

import { useAppDispatch, useAppSelector } from '@hooks/index';
import { useGetTrainingListQuery } from '@services/training-service';
import { TrainingNames } from '@type/training';

import styles from './filter-buttons.module.scss';

const { Text } = Typography;

export const FilterButtons = () => {
    const dispatch = useAppDispatch();
    const selectedFilter = useAppSelector(selectSelectedTrainingFilter);
    const { isError } = useGetTrainingListQuery();

    const filterOptions = [
        { label: TrainingNames.ALL, value: TrainingNames.ALL },
        { label: TrainingNames.STRENGTH, value: TrainingNames.STRENGTH },
        { label: TrainingNames.LEGS, value: TrainingNames.LEGS },
        { label: TrainingNames.CHEST, value: TrainingNames.CHEST },
        { label: TrainingNames.BACK, value: TrainingNames.BACK },
        { label: TrainingNames.HANDS, value: TrainingNames.HANDS },
    ];

    const handleChange = ({ target: { value } }: RadioChangeEvent) =>
        dispatch(setSelectedTrainingFilter(value));

    return (
        <div className={styles.wrapper}>
            <Text className={styles.text}>Тип тренировки :</Text>
            <Radio.Group
                options={isError ? [filterOptions[0]] : filterOptions}
                optionType='button'
                value={selectedFilter}
                defaultValue={selectedFilter}
                onChange={handleChange}
                size='small'
                className={styles.btn_group}
            />
        </div>
    );
};
