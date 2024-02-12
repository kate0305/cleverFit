import React from 'react';
import { Layout } from 'antd';

import styles from './main-page.module.scss';
import { Sidebar } from '@components/sidebar';
import { AppHeader } from '@components/header';
import { AppContent } from './layout';
import { AppFooter } from '@components/footer';

export const MainPage: React.FC = () => {
    return (
        <Layout className={styles.wrapper}>
            <Sidebar />
            <Layout style={{ background: 'transparent' }}>
                <AppHeader />
                <AppContent />
                <AppFooter />
            </Layout>
        </Layout>
    );
};
