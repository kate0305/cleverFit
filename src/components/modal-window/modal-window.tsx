import { CSSProperties, ReactNode } from 'react';
import { Modal } from 'antd';

import styles from './modal-window.module.scss';

type ModalWindowgProps = {
    children: ReactNode;
    isOpen?: boolean;
    closable?: boolean;
    title?: ReactNode;
    footer?: ReactNode;
    okText?: string;
    onOk?: () => void;
    onCancel?: () => void;
    maskStyle?: CSSProperties;
    className?: string;
    dataTestId?: string;
};

export const ModalWindow = ({
    isOpen,
    children,
    closable,
    title,
    footer,
    okText,
    onOk,
    onCancel,
    maskStyle,
    className,
    dataTestId,
}: ModalWindowgProps) => {
    return (
        <Modal
            centered
            title={title}
            open={isOpen}
            closable={closable || false}
            maskClosable={false}
            footer={footer || null}
            okText={okText}
            width={539}
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
            children={children}
            data-test-id={dataTestId}
        />
    );
};
