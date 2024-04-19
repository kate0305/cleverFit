import { Tabs } from 'antd';
import { setActiveTab } from '@redux/redusers/achievements-slice';

import { useAppDispatch } from '@hooks/index';
import { AchievementsTabsKeys } from '@type/tabs';

import { WeekAchievements } from '@components/achievements/week-achievements';

import styles from './tabs.module.scss';

export const AchievementsTabs = () => {
    const dispatch = useAppDispatch();

    const handleChangeTab = (activeKey: string) => dispatch(setActiveTab(activeKey));

    return (
        <Tabs
            defaultActiveKey={AchievementsTabsKeys.WEEK}
            className={styles.tabs}
            onChange={handleChangeTab}
            destroyInactiveTabPane={true}
            items={[
                {
                    label: AchievementsTabsKeys.WEEK,
                    key: AchievementsTabsKeys.WEEK,
                    children: <WeekAchievements />,
                },
                {
                    label: AchievementsTabsKeys.MONTH,
                    key: AchievementsTabsKeys.MONTH,
                    children: <WeekAchievements />,
                },
                {
                    label: AchievementsTabsKeys.ALL_TIME,
                    key: AchievementsTabsKeys.ALL_TIME,
                    disabled: true,
                },
            ]}
        />
    );
};
