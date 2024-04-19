import { Fragment } from 'react';
import { Badge, Tabs } from 'antd';
import { selectTrainingPartners } from '@redux/redusers/training-partners-slice';

import { MAX_NUMBER_WORKOUT_PARTNERS } from '@constants/index';
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
    const { userInvites, partnersList } = useAppSelector(selectTrainingPartners);
    const isShowBadge = partnersList.length < MAX_NUMBER_WORKOUT_PARTNERS;

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
                            {isShowBadge && (
                                <Badge count={userInvites.length} className={styles.badge} />
                            )}
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
