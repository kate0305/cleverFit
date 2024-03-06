import React from 'react';
import { Col, Layout, Row, Typography } from 'antd';

import { ContentCard } from '@components/content-card';

import { ActionsList } from './content/actions-list';
import { PossibilitieSection } from './content/possibilities-section';

import styles from './main-page.module.scss';

const { Content } = Layout;
const { Paragraph } = Typography;

export const MainPage: React.FC = () => (
    <Content className={styles.content}>
        <Row gutter={16} style={{ maxWidth: '768px' }}>
            <Col span={24}>
                <ContentCard
                    className={styles.main_card}
                    bordered={false}
                    content={<PossibilitieSection />}
                />
            </Col>
        </Row>
        <Row
            gutter={[
                { xs: 0, sm: 16 },
                { xs: 6, sm: 16 },
            ]}
            style={{ maxWidth: '768px', marginTop: '24px' }}
        >
            <Col span={24}>
                <ContentCard
                    className={styles.main_card}
                    bordered={false}
                    content={
                        <Paragraph className={styles.text}>
                            CleverFit — это не просто приложение, а твой личный помощник в&nbsp;мире
                            фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!
                        </Paragraph>
                    }
                />
            </Col>
        </Row>
        <ActionsList />
    </Content>
);
