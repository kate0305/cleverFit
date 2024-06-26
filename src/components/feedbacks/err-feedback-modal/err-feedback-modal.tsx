import { Dispatch } from 'react';

import { DATA_TEST_ID } from '@constants/data-test-id';
import { ResultRequestKeys } from '@type/result-request-keys';

import { PrimaryBtn } from '@components/buttons/primary-button';
import { ModalWindow } from '@components/modal-window';
import { RequestResult } from '@components/request-result';

import styles from './err-feedback-modal.module.scss';

type ReviewProps = {
    isOpen: boolean;
    setOpenModal: Dispatch<React.SetStateAction<boolean>>;
    setOpenCreateFeedback: Dispatch<React.SetStateAction<boolean>>;
};

export const ErrFeedbackModal = ({ isOpen, setOpenModal, setOpenCreateFeedback }: ReviewProps) => {
    const closeModal = () => setOpenModal(false);
    const writeReview = () => {
        setOpenCreateFeedback(true);
        closeModal();
    };

    return (
        <ModalWindow isOpen={isOpen}>
            <RequestResult
                keyErr={ResultRequestKeys.POST_FEEDBACK_ERR}
                buttonsGroup={[
                    <PrimaryBtn
                        type='primary'
                        htmlType='button'
                        className={styles.btn_err}
                        btnText='Написать отзыв'
                        onClick={writeReview}
                        dataTestId={DATA_TEST_ID.writeReviewNotSavedModal}
                    />,
                    <PrimaryBtn
                        htmlType='button'
                        className={styles.btn_err}
                        btnText='Закрыть'
                        onClick={closeModal}
                    />,
                ]}
            />
        </ModalWindow>
    );
};
