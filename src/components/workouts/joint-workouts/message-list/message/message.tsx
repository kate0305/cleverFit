import { useState } from 'react';
import { Typography } from 'antd';

import { useReplyToInviteMutation } from '@services/invite-service';
import { UserCardTypes } from '@type/card';
import { DateFormats } from '@type/dates';
import { InviteResp } from '@type/service';
import { TypesWorkoutForMessage, UserStatus } from '@type/training';
import { getFormattedDate } from '@utils/get-date';
import { getElement } from '@utils/get-target-element';

import { PrimaryBtn } from '@components/buttons/primary-button';
import { ContentCard } from '@components/content-card';
import { User } from '@components/feedbacks/feedback/user';
import { Portal } from '@components/portal';

import { WorkoutDetailsCard } from '../../cards/workout-details-card';

import styles from './message.module.scss';

const { Paragraph } = Typography;

type MessageProps = {
    inviteData: InviteResp;
};

export const Message = ({ inviteData }: MessageProps) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { _id, from, training, createdAt } = inviteData;
    const { date, name, exercises } = training;
    const [replyInvite] = useReplyToInviteMutation();

    const [isShowPortal, setShowPortal] = useState(false);

    const handleClickDetails = () => setShowPortal(true);
    const closePortal = () => setShowPortal(false);

    const handleClickAccepted = async () => {
        await replyInvite({ id: _id, status: UserStatus.ACCEPTED });
    };

    const targetElem = getElement(`[id='${_id}']`) || document.body;

    return (
        <ContentCard className={styles.wrapper} bordered={false}>
            <User
                firstName={from.firstName}
                surname={from.lastName}
                image={from.imageSrc}
                type={UserCardTypes.MESSAGE}
            />
            <div className={styles.info}>
                <Paragraph className={styles.date}>
                    {getFormattedDate(createdAt, DateFormats.LOCAL)}
                </Paragraph>
                <Paragraph className={styles.message}>
                    {`Привет, я ищу партнёра для совместных ${
                        TypesWorkoutForMessage[training.name as keyof typeof TypesWorkoutForMessage]
                    }. Ты хочешь
                    присоединиться ко мне на следующих тренировках?`}
                </Paragraph>
                <span id={_id} className={styles.target}>
                    <PrimaryBtn
                        type='link'
                        btnText='Посмотреть детали тренировки'
                        onClick={handleClickDetails}
                        className={styles.details}
                    />
                </span>
                {isShowPortal && (
                    <Portal
                        element={
                            <WorkoutDetailsCard
                                date={date}
                                workoutName={name}
                                exercise={exercises}
                                closeModal={closePortal}
                            />
                        }
                        container={targetElem}
                    />
                )}
            </div>
            <div className={styles.btn_group}>
                <PrimaryBtn
                    type='primary'
                    btnText='Тренироваться вместе'
                    onClick={handleClickAccepted}
                    className={styles.btn}
                />
                <PrimaryBtn btnText='Отклонить запрос' className={styles.btn_cancel} />
            </div>
        </ContentCard>
    );
};
