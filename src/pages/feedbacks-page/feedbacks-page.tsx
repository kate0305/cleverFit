import { useEffect, useState } from 'react';

import { useGetFeedbackQuery } from '@services/feedbacks-service';
import { ResultRequestKeys } from '@type/result-request-keys';
import { StatusCode } from '@type/status-code';
import { errorHandler } from '@utils/error-handler';
import { useLogOut } from '@utils/use-logout';

import { CreateReviewModal } from '@components/feedbacks/create-feedback-modal';
import { ErrFeedbackModal } from '@components/feedbacks/err-feedback-modal';
import { SuccessFeedbackModal } from '@components/feedbacks/success-feedback-modal/success-feedback-modal';
import { ModalWindow } from '@components/modal-window';
import { RequestResult } from '@components/request-result';

import { FeedbacksContainer } from './feedback-container';

import styles from './feedbacks-page.module.scss';

export const FeedbacksPage = () => {
    const { data: feedbacks, error } = useGetFeedbackQuery();

    const [isOpenCreateFeedback, setOpenCreateFeedback] = useState(false);
    const [isErrModalOpen, setOpenErrModal] = useState(false);
    const [isOpenSuccessPostModal, setOpenSuccessPostModal] = useState(false);
    const [isOpenErrPostModal, setOpenErrPostModal] = useState(false);

    const isHaveFeedbacks = Boolean(feedbacks && feedbacks.length > 0);

    const openModalCreateFeedback = () => setOpenCreateFeedback(true);

    const logOut = useLogOut();

    useEffect(() => {
        if (!error) return;

        const err = errorHandler(error);

        if (typeof err !== 'string' && err) {
            const { errStatus } = err;

            if (errStatus === StatusCode.FORBIDDEN) {
                logOut();
            } else {
                setOpenErrModal(true);
            }
        }
    }, [error, logOut]);

    return (
        <main className={isHaveFeedbacks ? styles.main : styles.main_with_feedbacks}>
            <FeedbacksContainer
                isHaveFeedbacks={isHaveFeedbacks}
                feedbacks={feedbacks}
                openReviewModal={openModalCreateFeedback}
            />

            <ModalWindow isOpen={isErrModalOpen}>
                <RequestResult keyErr={ResultRequestKeys.GET_FEEDBACK_ERR} />
            </ModalWindow>

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
        </main>
    );
};
