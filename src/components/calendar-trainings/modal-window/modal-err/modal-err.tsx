import { Modal } from 'antd';

import { ModalErrTypes } from '@type/modal-types';

import { ModalErrData } from './data';

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
    } = ModalErrData[modalType];

    Modal.error({
        title: title,
        content: message,
        okText: okText,
        icon: icon,
        centered: true,
        okButtonProps: { 'data-test-id': bntDataTestId },
        maskStyle: maskStyle,
        closable: closable,
        closeIcon: closeIcon,
        className: className,
        onCancel() {
            Modal.destroyAll();
        },
        onOk() {
            Modal.destroyAll();
            onClick && onClick();
        },
    });
};
