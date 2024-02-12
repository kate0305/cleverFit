import { Col, Row } from 'antd';
import { actions } from '../data';
import { ContentCard } from '@components/content-card';
import { LinkButton } from '@components/buttons/link-button';

import styles from './actions-list.module.scss';

export const ActionsList = () => {
    return (
        <Row
            gutter={[
                { xs: 0, sm: 16 },
                { xs: 6, sm: 16 },
            ]}
            style={{ maxWidth: '768px', marginTop: '16px' }}
        >
            {actions.map(({ id, title, iconLabel, icon }) => (
                <Col md={{ span: 8 }} sm={{ span: 24 }} xs={{ span: 24 }} key={id}>
                    <ContentCard
                        title={title}
                        className='main_card_mini'
                        bordered={false}
                        content={
                            <LinkButton
                                to='/'
                                className={styles.card_body}
                                icon={icon}
                                text={iconLabel}
                            />
                        }
                    />
                </Col>
            ))}
        </Row>
    );
};
