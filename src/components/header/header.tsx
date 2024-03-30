import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, Typography } from 'antd';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Paths } from '@type/paths';

import { Breadcrumbs } from '@components/breadcrumbs';
import { PrimaryBtn } from '@components/buttons/primary-button';
import { SettingsBtn } from '@components/buttons/settings-button';

import styles from './header.module.scss';

const { Header } = Layout;
const { Title } = Typography;

export const AppHeader = (props: { fromPage: string }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    const mainTitle = (
        <div className={styles.container_main}>
            <Title className={styles.title}>
                Приветствуем тебя в&nbsp;CleverFit — приложении, <br /> которое поможет тебе
                добиться своей мечты!
            </Title>
            <SettingsBtn />
        </div>
    );

    const profileTitle = (
        <div className={styles.container_profile}>
            <Title className={styles.title_profile}>Профиль</Title>
            <SettingsBtn className={styles.btn_profile} isPage={pathname}/>
        </div>
    );

    const settingsTitle = (
        <PrimaryBtn
            type='ghost'
            className={styles.btn_settings}
            onClick={goBack}
            btnText='Настройки'
            icon={<ArrowLeftOutlined style={{ fontSize: '14px', color: '#262626' }} />}
            dataTestId='settings-back'
        />
    );

    return (
        <Header className={styles.header}>
            {props.fromPage !== Paths.PROFILE && props.fromPage !== Paths.SETTINGS && <Breadcrumbs />}
            {props.fromPage === Paths.MAIN && mainTitle}
            {props.fromPage === Paths.PROFILE && profileTitle}
            {props.fromPage === Paths.SETTINGS && settingsTitle}
        </Header>
    );
};
