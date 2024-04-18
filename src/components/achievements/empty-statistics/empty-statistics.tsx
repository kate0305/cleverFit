import { Typography } from 'antd';
import { selectAchievements } from '@redux/redusers/achievements-slice';

import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { AchievementsTabsKeys } from '@type/tabs';

import styles from './empty-statistics.module.scss';

const { Title } = Typography;

export const EmptyStatistics = () => {
    const { activeTab } = useAppSelector(selectAchievements);

    return (
        <div className={styles.wrapper}>
            <div className={styles.icon} />
            <Title level={5} className={styles.title}>
                Ой, такой тренировки
                {activeTab === AchievementsTabsKeys.WEEK
                    ? ' на\u00A0этой неделе '
                    : ' в этом месяце '}
                не&nbsp;было.
            </Title>
        </div>
    );
};
