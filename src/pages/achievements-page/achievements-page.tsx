import { useGetUserTrainingsQuery } from '@services/training-service';

import { AchievementsTabs } from './tabs';

import styles from './achievements-page.module.scss';

export const AchievementsPage = () => {
    useGetUserTrainingsQuery();

    return (
        <main className={styles.wrapper}>
            <AchievementsTabs />
        </main>
    );
};
