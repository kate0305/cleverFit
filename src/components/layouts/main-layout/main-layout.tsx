import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import { AppFooter } from '@components/footer';
import { AppHeader } from '@components/header';
import { Loader } from '@components/loader';
import { Sidebar } from '@components/sidebar';

import styles from './main-layout.module.scss';

export const MainLayout: React.FC = () => (
    <Layout className={styles.wrapper}>
        <Sidebar />
        <Layout style={{ background: 'transparent' }}>
            <AppHeader />
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
            <AppFooter />
        </Layout>
    </Layout>
);
