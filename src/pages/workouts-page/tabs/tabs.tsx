import { Fragment } from 'react';
import { Badge, Tabs } from 'antd';
import { selectUserInvites } from '@redux/redusers/training-partners-slice';

import { useAppSelector } from '@hooks/index';
import { WorkoutsTabsKeys } from '@type/tabs';

import { JointWorkouts } from '@components/workouts/joint-workouts';
import { Marathons } from '@components/workouts/marathons';
import { MyWorkouts } from '@components/workouts/my-workouts';

import styles from './tabs.module.scss';

type WorkoutsTabsProps = {
    onChange: (activeKey: string) => void;
};

export const WorkoutsTabs = ({ onChange }: WorkoutsTabsProps) => {
    const invites = useAppSelector(selectUserInvites);

    return (
        <Tabs
            onChange={onChange}
            className={styles.tabs}
            items={[
                {
                    label: WorkoutsTabsKeys.MY_WORKOUTS,
                    key: WorkoutsTabsKeys.MY_WORKOUTS,
                    children: <MyWorkouts />,
                },
                {
                    label: (
                        <Fragment>
                            {WorkoutsTabsKeys.JOINT_WORKOUTS}{' '}
                            <Badge count={invites.length} className={styles.badge} />
                        </Fragment>
                    ),
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
};
