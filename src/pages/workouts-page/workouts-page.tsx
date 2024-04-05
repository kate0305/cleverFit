import { useEffect } from 'react';

import { useGetUserTrainingsQuery, useLazyGetTrainingListQuery } from '@services/training-service';
import { ModalErrTypes } from '@type/modal-types';

import { getModalErr } from '@components/modal-window/modal-err/modal-err';

import { WorkoutsTabs } from './tabs';

import styles from './workouts-page.module.scss';

export const WorkoutsPage = () => {
    useGetUserTrainingsQuery();

    const [getTrainingList, { isError }] = useLazyGetTrainingListQuery();

    useEffect(() => {
        getTrainingList();
    }, [getTrainingList]);

    useEffect(() => {
        if (isError) {
            getModalErr(ModalErrTypes.GET_TRAININHG_LIST, getTrainingList);
        }
    }, [getTrainingList, isError]);

    return (
        <main className={styles.wrapper}>
            <WorkoutsTabs />
        </main>
    );
};
