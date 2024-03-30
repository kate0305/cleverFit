import { Fragment, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Typography } from 'antd';
import { selectUser } from '@redux/redusers/user-data-slice';

import { useAppSelector } from '@hooks/index';
import { Paths } from '@type/paths';

import { PrimaryBtn } from '@components/buttons/primary-button';
import { CreateReviewModal } from '@components/feedbacks/create-feedback-modal';
import { ErrFeedbackModal } from '@components/feedbacks/err-feedback-modal';
import { SuccessFeedbackModal } from '@components/feedbacks/success-feedback-modal';

import { actions } from './data';
import { SettingsList } from './settings-list';
import { TariffCard } from './tariff-card';

import styles from './settings-page.module.scss';

const { Title } = Typography;

export const SettingsPage = () => {
    const [isOpenCreateFeedback, setOpenCreateFeedback] = useState(false);
    const [isOpenErrPostModal, setOpenErrPostModal] = useState(false);
    const [isOpenSuccessPostModal, setOpenSuccessPostModal] = useState(false);

    const openModalCreateFeedback = () => setOpenCreateFeedback(true);

    const { userData, tariffList } = useAppSelector(selectUser);
    const userTariffId = userData?.tariff?.tariffId;
    const userTariffIexpired = userData?.tariff?.expired;

    // eslint-disable-next-line no-underscore-dangle
    const tariffArr = useMemo(
        () =>
            tariffList.map(({ _id, name, periods }) => {
                const tariffName = name.toLocaleLowerCase();

                return {
                    id: _id,
                    name,
                    isActive: _id === userTariffId,
                    img: `/images/${tariffName}-tariff.jpg`,
                    periods,
                    tariffIexpired: userTariffIexpired,
                    dataTestId: `${tariffName}-tariff-card`,
                };
            }),
        [tariffList, userTariffId, userTariffIexpired],
    );

    const tariffListForRender = [...actions, ...tariffArr];

    return (
        <Fragment>
            <main className={styles.wrapper}>
                <div className={styles.content}>
                    <Title level={1}>Мой тариф</Title>
                    <Row
                        gutter={[
                            { md: 25, xs: 0, sm: 0 },
                            { sm: 12, xs: 12 },
                        ]}
                        className={styles.tariff_list}
                    >
                        {tariffListForRender.map(
                            ({ id, name, isActive, img, tariffIexpired, dataTestId }) => (
                                <Col key={id} sm={{ span: 24 }} md={{ span: 12 }}>
                                    <TariffCard
                                        tariffType={name}
                                        isActive={isActive}
                                        img={img}
                                        tariffIexpired={tariffIexpired}
                                        dataTestId={dataTestId}
                                    />
                                </Col>
                            ),
                        )}
                    </Row>
                    <SettingsList />
                    <div className={styles.btn_group}>
                        <PrimaryBtn
                            type='primary'
                            btnText='Написать отзыв'
                            htmlType='button'
                            className={styles.btn_write_review}
                            onClick={openModalCreateFeedback}
                        />
                        <Link to={Paths.FEEDBACKS} className={styles.link_review}>
                            Смотреть все отзывы
                        </Link>
                    </div>
                </div>
            </main>
            <CreateReviewModal
                isOpen={isOpenCreateFeedback}
                setOpenModal={setOpenCreateFeedback}
                setOpenErrPostModal={setOpenErrPostModal}
                setOpenSuccessPostModal={setOpenSuccessPostModal}
            />
            <SuccessFeedbackModal
                isOpen={isOpenSuccessPostModal}
                setOpenModal={setOpenSuccessPostModal}
            />
            <ErrFeedbackModal
                isOpen={isOpenErrPostModal}
                setOpenModal={setOpenErrPostModal}
                setOpenCreateFeedback={setOpenCreateFeedback}
            />
        </Fragment>
    );
};
