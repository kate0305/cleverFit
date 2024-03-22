import { Layout, Typography } from 'antd';

import { Breadcrumbs } from '@components/breadcrumbs';
import { SettingsBtn } from '@components/buttons/settings-button';

import styles from './header.module.scss';

const { Header } = Layout;
const { Title } = Typography;

export const AppHeader = (props: { isMainPage: boolean }) => (
        <Header className={styles.header}>
            <Breadcrumbs />
            {props.isMainPage && (
                <div className={styles.container}>
                    <Title className={styles.title}>
                        Приветствуем тебя в&nbsp;CleverFit — приложении, <br /> которое поможет тебе
                        добиться своей мечты!
                    </Title>
                    <SettingsBtn />
                </div>
            )}
        </Header>
    );
