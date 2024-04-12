import { useEffect } from 'react';

import { useRejectInviteMutation } from '@services/invite-service';
import { UserCardTypes } from '@type/card';
import { ModalErrTypes } from '@type/modal-types';
import { TrainingPartner } from '@type/training';

import { PrimaryBtn } from '@components/buttons/primary-button';
import { User } from '@components/feedbacks/feedback/user';
import { getModalErr } from '@components/modal-window/modal-err/modal-err';

import { getInfoStatus } from '../helper';
import { WorkoutDescription } from '../workout-description';

import styles from './modal-card.module.scss';

type ModalCardProps = {
    partnerData: TrainingPartner;
    closeModal: () => void;
};

export const ModalCard = ({ partnerData, closeModal }: ModalCardProps) => {
    const { name, trainingType, imageSrc, avgWeightInWeek, status, inviteId } = partnerData;

    const [rejectInvite, { isError }] = useRejectInviteMutation();

    const rejectWorkout = async () => {
        await rejectInvite(inviteId);
        closeModal();
    };

    useEffect(() => {
        if (isError) {
            getModalErr(ModalErrTypes.SAVE_TRAINING);
        }
    }, [isError]);

    return (
        <div className={styles.wrapper}>
            <User fullName={name} image={imageSrc} type={UserCardTypes.CARD} />
            <WorkoutDescription trainingType={trainingType} avgWeightInWeek={avgWeightInWeek} />
            {getInfoStatus(status || '')}
            <PrimaryBtn
                btnText='Отменить тренировку'
                onClick={rejectWorkout}
                className={styles.btn}
            />
        </div>
    );
};
