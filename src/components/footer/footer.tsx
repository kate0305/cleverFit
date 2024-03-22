import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Layout, Row } from 'antd';

import { Paths } from '@type/paths';

import { LinkButton } from '@components/buttons/link-button';
import { ContentCard } from '@components/content-card';

import { appsList } from './data';

import styles from './footer.module.scss';

const { Footer } = Layout;

export const AppFooter: React.FC = () => {
    const ContentCardsBodyList = () =>
        appsList.map(({ id, to, iconLabel, icon }) => (
            <LinkButton key={id} to={to} className={styles.app} icon={icon} text={iconLabel} />
        ));

    return (
        <Footer className={styles.footer}>
            <Row justify='space-between' align='bottom'>
                <Col md={{ order: 2 }} sm={{ span: 24 }} className={styles.item}>
                    <ContentCard
                        title={
                            <LinkButton
                                to='/'
                                text='Скачать на телефон'
                                className={styles.apps_title}
                            />
                        }
                        extra='Доступно в PRO-тарифе'
                        bordered={false}
                        className={styles.card_apps}
                        content={<ContentCardsBodyList />}
                    />
                </Col>
                <Col md={{ order: 1 }} sm={24} className={styles.item}>
                    <Link to={Paths.FEEDBACKS} className={styles.link} data-test-id='see-reviews'>
                        Смотреть отзывы
                    </Link>
                </Col>
            </Row>
        </Footer>
    );
};
