import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';

import { Paths } from '@type/paths';

import { PrimaryBtn } from '@components/buttons/primary-button';
import { ContentCard } from '@components/content-card';

import { actions } from '../data';

import styles from './actions-list.module.scss';

type ActionsListProps = {
    onClick: (path: string) => Promise<void>;
};

export const ActionsList = ({ onClick }: ActionsListProps) => (
    <Row
        gutter={[
            { xs: 0, sm: 16 },
            { xs: 8, sm: 16 },
        ]}
        style={{ maxWidth: '768px', marginTop: '16px' }}
    >
        {actions.map(({ id, title, iconLabel, icon, dataTestId, navigateTo }) => {
            const handleClick = () => onClick(id);

            return (
                <Col md={{ span: 8 }} sm={{ span: 24 }} xs={{ span: 24 }} key={id}>
                    <ContentCard title={title} className={styles.main_card_mini} bordered={false}>
                        {id === Paths.PROFILE ? (
                            <Link
                                to={navigateTo}
                                className={styles.card_body}
                                data-test-id={dataTestId}
                            >
                                <Fragment>
                                    {icon}
                                    {iconLabel}
                                </Fragment>
                            </Link>
                        ) : (
                            <PrimaryBtn
                                type='link'
                                icon={icon}
                                htmlType='button'
                                className={styles.card_body}
                                btnText={iconLabel}
                                dataTestId={dataTestId}
                                onClick={handleClick}
                            />
                        )}
                    </ContentCard>
                </Col>
            );
        })}
    </Row>
);
