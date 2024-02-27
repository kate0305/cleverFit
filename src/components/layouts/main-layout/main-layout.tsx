import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { Sidebar } from '@components/sidebar';
import { AppHeader } from '@components/header';
import { AppFooter } from '@components/footer';
import { Loader } from '@components/loader';
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
