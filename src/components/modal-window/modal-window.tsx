import { CSSProperties, ReactNode } from 'react';
import { Modal } from 'antd';

import styles from './modal-window.module.scss';

type ModalWindowgProps = {
    children: ReactNode;
    isOpen?: boolean;
    closable?: boolean;
    title?: ReactNode;
    footer?: ReactNode;
    closeIcon?: ReactNode;
    okText?: string;
    onOk?: () => void;
    onCancel?: () => void;
    maskStyle?: CSSProperties;
    className?: string;
    width?: number;
    dataTestId?: string;
};

export const ModalWindow = ({
    isOpen,
    children,
    closable,
    title,
    footer,
    closeIcon,
    okText,
    onOk,
    onCancel,
    maskStyle,
    className,
    width,
    dataTestId,
}: ModalWindowgProps) => (
    <Modal
        centered={true}
        title={title}
        open={isOpen}
        closeIcon={closeIcon}
        closable={closable || false}
        destroyOnClose={true}
        maskClosable={false}
        footer={footer || null}
        okText={okText}
        width={width || 539}
        onOk={onOk}
        onCancel={onCancel}
        maskStyle={
            maskStyle || {
                background: 'rgba(121, 156, 212, 0.50)',
                backdropFilter: 'blur(6px)',
            }
        }
        className={className || styles.modal}
        zIndex={1}
        data-test-id={dataTestId}
    >
        {children}
    </Modal>
);
