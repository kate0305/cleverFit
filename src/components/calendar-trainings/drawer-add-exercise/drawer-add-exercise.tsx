import { Dispatch } from 'react';
import { Form } from 'antd';
import { Dayjs } from 'dayjs';
import { selectEditTrainingData } from '@redux/redusers/trainings-slice';

import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/index';
import { DateFormats } from '@type/dates';
import { DrawerTitleKeys } from '@type/drawer';
import { UserTraining } from '@type/training';
import { checkIsPastDate } from '@utils/check-is-past-date';
import { getFormattedDate } from '@utils/get-formatted-date';

import { DrawerComponent } from '@components/drawer';
import { DrawerInfo } from '@components/drawer/drawer-info';
import { DrawerNotification } from '@components/drawer/drawer-notification';
import { AddTrainingForm } from '@components/form/add-training-form';

type DrawerAddExerciseProps = {
    date: Dayjs;
    trainingName: string;
    isOpenDrawer: boolean;
    trainingsListForSelectedDay: UserTraining[];
    setCloseDrawer: Dispatch<React.SetStateAction<boolean>>;
};

export const DrawerAddExercise = ({
    isOpenDrawer,
    date,
    trainingName,
    trainingsListForSelectedDay,
    setCloseDrawer,
}: DrawerAddExerciseProps) => {
    const [form] = Form.useForm();
    const { isEditMode } = useAppSelector(selectEditTrainingData);
    const formattedDate = getFormattedDate(date, DateFormats.LOCAL);

    const closeDrawer = () => {
        form.submit();
        setCloseDrawer(false);
    };

    return (
        <DrawerComponent
            isOpenDrawer={isOpenDrawer}
            setCloseDrawer={closeDrawer}
            titleChildren={
                isEditMode
                    ? {
                          type: DrawerTitleKeys.EDIT,
                          text: 'Редактирование',
                          icon: <EditOutlined style={{ fontSize: 'var(--font-size-base)' }} />,
                      }
                    : {
                          type: DrawerTitleKeys.NEW_EXERCISE,
                          text: 'Добавление упражнений',
                          icon: <PlusOutlined style={{ fontSize: 'var(--font-size-base)' }} />,
                      }
            }
        >
            <DrawerInfo trainingName={trainingName} date={formattedDate} />
            <AddTrainingForm
                form={form}
                date={date}
                trainingName={trainingName}
                trainingsListForSelectedDay={trainingsListForSelectedDay}
            />
            {isEditMode && checkIsPastDate(date) && <DrawerNotification />}
        </DrawerComponent>
    );
};
