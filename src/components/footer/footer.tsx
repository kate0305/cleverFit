import React from 'react';
import { Col, Layout, Row } from 'antd';
import { Link } from 'react-router-dom';
import { ContentCard } from '@components/content-card';
import { appsList } from './data';
import { LinkButton } from '@components/buttons/link-button';

import styles from './/footer.module.scss';

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
                        className='card_apps'
                        content={<ContentCardsBodyList />}
                    />
                </Col>
                <Col md={{ order: 1 }} sm={24} className={styles.item}>
                    <Link to='/' className={styles.link}>
                        Смотреть отзывы
                    </Link>
                </Col>
            </Row>
        </Footer>
    );
};
