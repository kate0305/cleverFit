import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tabs } from 'antd';

import { Paths } from '@type/paths';
import { REGISTRATION } from '@constants/index';

import { SignInForm } from '@components/form/sign-in-form';
import { SignUpForm } from '@components/form/sign-up-form';

import styles from './tabs.module.scss';

export const AuthTabs: React.FC = () => {
    const { pathname } = useLocation();
    const signUpTab = 'registration';
    const signInTab = 'auth';
    const getActiveTab = () => (pathname.includes(signUpTab) ? signUpTab : signInTab);

    return (
        <Tabs
            defaultActiveKey={signInTab}
            className={styles.tabs}
            activeKey={getActiveTab()}
            items={[
                {
                    label: <Link to={Paths.AUTH}>Вход</Link>,
                    key: signInTab,
                    children: <SignInForm />,
                },
                {
                    label: <Link to={REGISTRATION}>Регистрация</Link>,
                    key: signUpTab,
                    children: <SignUpForm />,
                },
            ]}
        />
    );
};
