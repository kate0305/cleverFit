import { Fragment, useEffect, useState } from 'react';
import { Typography } from 'antd';
import { selectTrainingData } from '@redux/redusers/trainings-slice';

import { useAppSelector } from '@hooks/index';
import { useLazyGetTrainingListQuery } from '@services/training-service';

import { AlertComponent } from '@components/alert';
import { PrimaryBtn } from '@components/buttons/primary-button';

import { DrawerCreateWorkout } from '../drawer-create-workout';

import { WorkoutsList } from './workouts-list';

import styles from './my-workouts.module.scss';

const { Title } = Typography;

export const MyWorkouts = () => {
    const { userTrainingsList } = useAppSelector(selectTrainingData);
    const [getTrainingList] = useLazyGetTrainingListQuery();

    const [isOpenCreateWorkout, setOpenCreateWorkout] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const isUserHasWorkouts = Object.keys(userTrainingsList).length;

    const openDrawer = () => setOpenCreateWorkout(true);
    const closeAlert = () => setAlertMessage('');


    useEffect(() => {
        getTrainingList();
    }, [getTrainingList]);

    return (
        <Fragment>
            {isUserHasWorkouts ? (
                <WorkoutsList handleClick={openDrawer} />
            ) : (
                <div className={styles.container}>
                    <div className={styles.empty_training}>
                        <Title level={3} className={styles.title}>
                            У вас ещё нет созданных тренировок
                        </Title>
                        <PrimaryBtn
                            type='primary'
                            btnText='Создать тренировку'
                            onClick={openDrawer}
                            className={styles.btn_create}
                            dataTestId='create-new-training-button'
                        />
                    </div>
                </div>
            )}
            {isOpenCreateWorkout && (
                <DrawerCreateWorkout
                    isOpenDrawer={isOpenCreateWorkout}
                    setCloseDrawer={setOpenCreateWorkout}
                    setAlertMessage={setAlertMessage}
                />
            )}
            {alertMessage && (
                <AlertComponent
                    message={alertMessage}
                    onClose={closeAlert}
                    dataTestId='create-training-success-alert'
                />
            )}
        </Fragment>
    );
};
