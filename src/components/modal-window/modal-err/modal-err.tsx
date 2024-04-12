import { Modal } from 'antd';

import { ModalErrTypes } from '@type/modal-types';

import { modalErrData } from './data';

export const getModalErr = (modalType: ModalErrTypes, onClick?: () => void) => {
    const {
        title,
        message,
        icon,
        okText,
        bntDataTestId,
        maskStyle,
        closable,
        closeIcon,
        className,
    } = modalErrData[modalType];

    Modal.error({
        title,
        content: message,
        okText,
        icon,
        centered: true,
        okButtonProps: { 'data-test-id': bntDataTestId },
        maskStyle,
        closable,
        closeIcon,
        className,
        onCancel() {
            Modal.destroyAll();
        },
        onOk() {
            if (onClick) {
                onClick();
            }
        },
    });
};
