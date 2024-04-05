import { Tabs } from 'antd';

import { WorkoutsTabsKeys } from '@type/workouts-tabs';

import { JointWorkouts } from '@components/workouts/joint-workouts';
import { Marathons } from '@components/workouts/marathons';
import { MyWorkouts } from '@components/workouts/my-workouts';

import styles from './tabs.module.scss';

export const WorkoutsTabs = () => (
    <Tabs
        defaultActiveKey={WorkoutsTabsKeys.MY_WORKOUTS}
        className={styles.tabs}
        items={[
            {
                label: WorkoutsTabsKeys.MY_WORKOUTS,
                key: WorkoutsTabsKeys.MY_WORKOUTS,
                children: <MyWorkouts />,
            },
            {
                label: WorkoutsTabsKeys.JOINT_WORKOUTS,
                key: WorkoutsTabsKeys.JOINT_WORKOUTS,
                children: <JointWorkouts />,
            },
            {
                label: WorkoutsTabsKeys.MARATHONS,
                key: WorkoutsTabsKeys.MARATHONS,
                children: <Marathons />,
            },
        ]}
    />
);
