import React from 'react';
import { Layout, Typography } from 'antd';
import { Breadcrumbs } from '@components/breadcrumbs';
import { SettingsBtn } from '@components/buttons/settings-button';

import styles from './header.module.scss';

const { Header } = Layout;
const { Title } = Typography;

export const AppHeader: React.FC = () => {

    return (
        <Header className={styles.header}>
            <Breadcrumbs />
            <div className={styles.container}>
                <Title className={styles.title}>
                    Приветствуем тебя в&nbsp;CleverFit — приложении, <br /> которое поможет тебе
                    добиться своей мечты!
                </Title>
                <SettingsBtn />
            </div>
        </Header>
    );
};
