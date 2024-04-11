import { useMemo } from 'react';
import { Select } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { selectTrainingData } from '@redux/redusers/trainings-slice';

import { useAppSelector } from '@hooks/index';
import { UserTraining } from '@type/training';

type SelectTrainingProps = {
    trainingsListForSelectedDay: UserTraining[];
    handleChangeSelect?: (trainingName: string) => void;
    className: string;
    size?: SizeType;
    defaultValue?: string;
    dataTestId?: string;
};

export const SelectTraining = ({
    trainingsListForSelectedDay,
    handleChangeSelect,
    className,
    size,
    defaultValue,
    dataTestId,
}: SelectTrainingProps) => {
    const { appTrainingList, editTrainingData } = useAppSelector(selectTrainingData);
    const { isEditMode, editTrainingIndex } = editTrainingData;

    const dayTrainingList = useMemo(
        () => trainingsListForSelectedDay?.map(({ name }) => name),
        [trainingsListForSelectedDay],
    );
    const trainingListForSelect = useMemo(
        () =>
            appTrainingList.filter(({ name }) =>
                dayTrainingList.length ? !dayTrainingList.includes(name) : name,
            ),
        [appTrainingList, dayTrainingList],
    );

    return (
        <Select
            placeholder='Выбор типа тренировки'
            defaultValue={
                defaultValue ||
                (isEditMode ? dayTrainingList && dayTrainingList[editTrainingIndex] : null)
            }
            onChange={handleChangeSelect}
            options={
                trainingListForSelect &&
                trainingListForSelect.map(({ name }) => ({
                    value: name,
                    label: name,
                }))
            }
            disabled={!!defaultValue}
            size={size}
            className={className}
            data-test-id={dataTestId || 'modal-create-exercise-select'}
        />
    );
};
