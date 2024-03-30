import { Dispatch, Fragment } from 'react';
import { Badge, Form, Typography } from 'antd';
import { Dayjs } from 'dayjs';
import { selectEditTrainingData } from '@redux/redusers/trainings-slice';

import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/index';
import { DateFormats } from '@type/dates';
import { BadgeColors, UserTraining } from '@type/training';
import { checkIsPastDate } from '@utils/check-is-past-date';
import { getFormattedDate } from '@utils/get-formatted-date';

import { DrawerComponent } from '@components/drawer';
import { AddTrainingForm } from '@components/form/add-training-form';

import styles from './drawer-add-exercise.module.scss';

const { Paragraph } = Typography;

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
                <Fragment>
                    <span className={styles.icon}>
                        {isEditMode ? (
                            <EditOutlined style={{ fontSize: '14px' }} />
                        ) : (
                            <PlusOutlined style={{ fontSize: '14px' }} />
                        )}
                    </span>
                    {isEditMode ? 'Редактирование' : 'Добавление упражнений'}
                </Fragment>
            }
            dataTestId='modal-drawer-right'
        >
            <div className={styles.data}>
                <Badge
                    color={BadgeColors[trainingName as keyof typeof BadgeColors]}
                    text={trainingName}
                    className={styles.badge}
                />
                <Paragraph>{formattedDate}</Paragraph>
            </div>
            <AddTrainingForm
                form={form}
                date={date}
                name={trainingName}
                trainingsListForSelectedDay={trainingsListForSelectedDay}
            />
            {isEditMode && checkIsPastDate(date) && (
                <p className={styles.watning}>
                    После сохранения внесенных изменений отредактировать проведенную тренировку
                    будет невозможно
                </p>
            )}
        </DrawerComponent>
    );
};
