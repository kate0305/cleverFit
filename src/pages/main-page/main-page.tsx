import { Fragment, useEffect } from 'react';
import { Col, Layout, Row, Typography } from 'antd';
import { selectUserData } from '@redux/redusers/user-data-slice';

import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useGetInvitesQuery } from '@services/invite-service';
import { useLazyGetUserDataQuery } from '@services/user-service';
import { ResultRequestKeys } from '@type/result-request-keys';
import { useCalendarClick } from '@utils/use-click-calendar';

import { PrimaryBtn } from '@components/buttons/primary-button';
import { ContentCard } from '@components/content-card';
import { ModalWindow } from '@components/modal-window';
import { RequestResult } from '@components/request-result';

import { ActionsList } from './content/actions-list';
import { PossibilitieSection } from './content/possibilities-section';

import styles from './main-page.module.scss';

const { Content } = Layout;
const { Paragraph } = Typography;

export const MainPage = () => {
    useGetInvitesQuery();

    const { isErr, handleClick, closeErrModal } = useCalendarClick();
    const userData = useAppSelector(selectUserData);
    const [getUserData] = useLazyGetUserDataQuery();

    useEffect(() => {
        if (!userData?.email) {
            getUserData();
        }
    }, [getUserData, userData?.email]);

    return (
        <Fragment>
            <ModalWindow isOpen={isErr} dataTestId='modal-no-review'>
                <RequestResult
                    keyErr={ResultRequestKeys.GET_FEEDBACK_ERR}
                    buttonsGroup={
                        <PrimaryBtn
                            type='primary'
                            htmlType='button'
                            className={styles.btn_err}
                            btnText='Назад'
                            onClick={closeErrModal}
                            dataTestId='write-review-not-saved-modal'
                        />
                    }
                />
            </ModalWindow>

            <Content className={styles.content}>
                <Row gutter={16} style={{ maxWidth: '768px' }}>
                    <Col span={24}>
                        <ContentCard className={styles.main_card} bordered={false}>
                            <PossibilitieSection />
                        </ContentCard>
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
                        <ContentCard className={styles.main_card} bordered={false}>
                            <Paragraph className={styles.text}>
                                CleverFit — это не просто приложение, а твой личный помощник
                                в&nbsp;мире фитнеса. Не откладывай на завтра — начни тренироваться
                                уже сегодня!
                            </Paragraph>
                        </ContentCard>
                    </Col>
                </Row>
                <ActionsList onClick={handleClick} />
            </Content>
        </Fragment>
    );
};
