import { useEffect, useState } from 'react';

import { useGetInvitesQuery } from '@services/invite-service';
import { useGetUserTrainingsQuery, useLazyGetTrainingListQuery } from '@services/training-service';
import { ModalErrTypes } from '@type/modal-types';
import { WorkoutsTabsKeys } from '@type/workouts-tabs';

import { getModalErr } from '@components/modal-window/modal-err/modal-err';

import { WorkoutsTabs } from './tabs';

import styles from './workouts-page.module.scss';

export const WorkoutsPage = () => {
    useGetUserTrainingsQuery();
    useGetInvitesQuery();

    const [getTrainingList, { isError }] = useLazyGetTrainingListQuery();

    const [currentTab, setCurrentTab] = useState('');

    const handleChangeTab = (activeKey: string) => setCurrentTab(activeKey);

    useEffect(() => {
        getTrainingList();
    }, [getTrainingList]);

    useEffect(() => {
        if (isError) {
            getModalErr(ModalErrTypes.GET_TRAININHG_LIST, getTrainingList);
        }
    }, [getTrainingList, isError]);

    return (
        <main
            className={
                currentTab === WorkoutsTabsKeys.MARATHONS ? styles.marathons : styles.wrapper
            }
        >
            <WorkoutsTabs onChange={handleChangeTab} />
        </main>
    );
};
