import { Fragment, useEffect, useState } from 'react';
import Meta from 'antd/lib/card/Meta';
import classnames from 'classnames/bind';
import { toggleDrawer } from '@redux/redusers/app-slice';
import {
    selectPartnersList,
    setJointTrainingDarwerData,
} from '@redux/redusers/training-partners-slice';

import { MAX_NUMBER_WORKOUT_PARTNERS, XS_WIDTH } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { useRejectInviteMutation } from '@services/invite-service';
import { PartnerCardTypes, UserCardTypes } from '@type/card';
import { ModalErrTypes } from '@type/modal-types';
import { TrainingPartner, UserStatus } from '@type/training';
import { useMediaQuery } from '@utils/use-media-query';

import { PrimaryBtn } from '@components/buttons/primary-button';
import { ContentCard } from '@components/content-card';
import { User } from '@components/feedbacks/feedback/user';
import { ModalWindow } from '@components/modal-window';
import { getModalErr } from '@components/modal-window/modal-err/modal-err';

import { getInfoStatus } from '../helper';
import { ModalCard } from '../modal-card';
import { WorkoutDescription } from '../workout-description';

import styles from './partner-card.module.scss';

const cx = classnames.bind(styles);

type PartnerCardProps = {
    partnerData: TrainingPartner;
    searchValue?: string;
    type?: string;
    index?: number;
};

export const PartnerCard = ({ partnerData, searchValue, type, index }: PartnerCardProps) => {
    const { id, name, trainingType, imageSrc, avgWeightInWeek, inviteId, status } = partnerData;

    const dispatch = useAppDispatch();
    const partnersList = useAppSelector(selectPartnersList);

    const isPhone = useMediaQuery(`(max-width: ${XS_WIDTH})`);

    const [isShowModal, setShowModal] = useState(false);

    const [rejectInvite, { isError }] = useRejectInviteMutation();

    const openModal = () => setShowModal(true);

    const closeModal = () => setShowModal(false);

    const createJointWorkout = () => {
        const data = {
            isJointWorkout: true,
            trainingName: trainingType,
            userId: id,
            userName: name,
            imageSrc,
        };

        dispatch(setJointTrainingDarwerData({ ...data }));
        dispatch(toggleDrawer());
    };

    const rejectWorkout = async () => {
        await rejectInvite(inviteId);
    };

    const isBtnDisabled =
        status === UserStatus.PENDING ||
        status === UserStatus.REJECTED ||
        partnersList.length === MAX_NUMBER_WORKOUT_PARTNERS;

    const wrapper = cx({
        wrapper: true,
        pointer: type === PartnerCardTypes.PARTNER,
        with_bright_bg: type === PartnerCardTypes.JOINT && status !== UserStatus.REJECTED,
        with_gray_bg:
            type === PartnerCardTypes.JOINT &&
            status === UserStatus.REJECTED &&
            partnersList.length === MAX_NUMBER_WORKOUT_PARTNERS,
    });

    useEffect(() => {
        if (isError) {
            getModalErr(ModalErrTypes.SAVE_TRAINING);
        }
    }, [isError]);

    return (
        <Fragment>
            <ContentCard
                onClick={type === PartnerCardTypes.PARTNER ? openModal : undefined}
                className={wrapper}
                bordered={true}
                actions={
                    type === PartnerCardTypes.JOINT
                        ? [
                              <PrimaryBtn
                                  type='primary'
                                  className={
                                      status === UserStatus.ACCEPTED
                                          ? styles.create_btn_cancel
                                          : styles.create_btn
                                  }
                                  btnText={
                                      status === UserStatus.ACCEPTED
                                          ? 'Отменить тренировку'
                                          : 'Создать тренировку'
                                  }
                                  onClick={
                                      status === UserStatus.ACCEPTED
                                          ? rejectWorkout
                                          : createJointWorkout
                                  }
                                  disabled={isBtnDisabled}
                              />,
                              status && getInfoStatus(status),
                          ]
                        : []
                }
                dataTestId={`joint-training-cards${index}`}
            >
                <Meta
                    title={
                        <User
                            fullName={name}
                            image={imageSrc}
                            type={UserCardTypes.CARD}
                            searchValue={searchValue}
                        />
                    }
                    description={
                        <WorkoutDescription
                            trainingType={trainingType}
                            avgWeightInWeek={avgWeightInWeek}
                        />
                    }
                    className={styles.meta}
                />
            </ContentCard>
            <ModalWindow
                isOpen={isShowModal}
                closable={true}
                onCancel={closeModal}
                dataTestId='partner-modal'
                width={isPhone ? 312 : 539}
            >
                <ModalCard partnerData={partnerData} closeModal={closeModal} />
            </ModalWindow>
        </Fragment>
    );
};
