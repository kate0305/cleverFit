import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, Typography } from 'antd';

import { Paths } from '@type/paths';

import { Breadcrumbs } from '@components/breadcrumbs';
import { GoBackBtn } from '@components/buttons/go-back-button';
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
            <SettingsBtn className={styles.btn_profile} isPage={pathname} />
        </div>
    );

    const simpleTitle = (
        <div className={styles.container_workouts}>
            <SettingsBtn className={styles.btn_profile} isPage={pathname} />
        </div>
    );

    return (
        <Header className={styles.header}>
            {(props.fromPage === Paths.MAIN ||
                props.fromPage === Paths.FEEDBACKS ||
                props.fromPage === Paths.CALENDAR ||
                props.fromPage === Paths.WORKOUTS ||
                props.fromPage === Paths.ACHIEVEMENTS) && <Breadcrumbs />}
            {props.fromPage === Paths.MAIN && mainTitle}
            {props.fromPage === Paths.PROFILE && profileTitle}
            {props.fromPage === Paths.SETTINGS && <GoBackBtn text='Настройки' onClick={goBack} />}
            {props.fromPage === Paths.WORKOUTS && simpleTitle}
            {props.fromPage === Paths.ACHIEVEMENTS && simpleTitle}
        </Header>
    );
};
