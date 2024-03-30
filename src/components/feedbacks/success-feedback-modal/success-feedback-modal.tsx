import { Dispatch } from 'react';

import { ResultRequestKeys } from '@type/result-request-keys';

import { PrimaryBtn } from '@components/buttons/primary-button';
import { ModalWindow } from '@components/modal-window';
import { RequestResult } from '@components/request-result';

import styles from './success-feedback-modal.module.scss';

type ReviewProps = {
    isOpen: boolean;
    setOpenModal: Dispatch<React.SetStateAction<boolean>>;
};

export const SuccessFeedbackModal = ({ isOpen, setOpenModal }: ReviewProps) => {
    const closeModal = () => setOpenModal(false);

    return (
        <ModalWindow isOpen={isOpen}>
            <RequestResult
                keyErr={ResultRequestKeys.POST_FEEDBACK_SUCCESS}
                buttonsGroup={
                    <PrimaryBtn
                        type='primary'
                        htmlType='button'
                        className={styles.btn_success}
                        btnText='Отлично'
                        onClick={closeModal}
                    />
                }
            />
        </ModalWindow>
    );
};
