import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Layout } from 'antd';

import { Paths } from '@type/paths';

import { AppFooter } from '@components/footer';
import { AppHeader } from '@components/header';
import { Loader } from '@components/loader';
import { Sidebar } from '@components/sidebar';

import styles from './main-layout.module.scss';

type MainLayoutProps = {
    withHeader?: boolean;
};

export const MainLayout = ({ withHeader }: MainLayoutProps) => {
    const { pathname } = useLocation();
    const fromPage = pathname;
    const isMainPage = pathname === Paths.MAIN;

    return (
        <Layout className={styles.wrapper}>
            <Sidebar />
            <Layout style={{ background: 'transparent' }}>
                {withHeader && <AppHeader fromPage={fromPage} />}
                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
                {isMainPage && <AppFooter />}
            </Layout>
        </Layout>
    );
};
