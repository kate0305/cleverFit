import { Fragment, useEffect } from 'react';
import { Typography } from 'antd';
import { selectAppData, setAlert, toggleDrawer } from '@redux/redusers/app-slice';
import { selectTrainingData } from '@redux/redusers/trainings-slice';

import { DATA_TEST_ID } from '@constants/data-test-id';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { useLazyGetTrainingListQuery } from '@services/training-service';

import { AlertComponent } from '@components/alert';
import { PrimaryBtn } from '@components/buttons/primary-button';

import { DrawerCreateWorkout } from '../drawer-create-workout';

import { WorkoutsList } from './workouts-list';

import styles from './my-workouts.module.scss';

const { Title } = Typography;

export const MyWorkouts = () => {
    const dispatch = useAppDispatch();
    const { userTrainingsList } = useAppSelector(selectTrainingData);
    const { isOpenDrawer, alert } = useAppSelector(selectAppData);

    const [getTrainingList] = useLazyGetTrainingListQuery();

    const isUserHasWorkouts = Object.keys(userTrainingsList).length;

    const openDrawer = () => dispatch(toggleDrawer());
    const closeAlert = () => dispatch(setAlert({ isShowAlert: false, message: '' }));

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
                            dataTestId={DATA_TEST_ID.createNewTrainingButton}
                        />
                    </div>
                </div>
            )}
            {isOpenDrawer && <DrawerCreateWorkout />}
            {alert.isShowAlert && (
                <AlertComponent
                    message={alert.message}
                    onClose={closeAlert}
                    dataTestId={DATA_TEST_ID.createTrainingSuccessAlert}
                />
            )}
        </Fragment>
    );
};
