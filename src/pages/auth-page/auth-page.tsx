import { AuthTabs } from '@components/tabs';

import styles from './auth-page.module.scss';

export const AuthPage = () => (
    <div className={styles.wrapper}>
        <div className={styles.container}>
            <div className={styles.logo} />
            <AuthTabs />
        </div>
    </div>
);
