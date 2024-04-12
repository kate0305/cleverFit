import { CSSProperties, ReactNode } from 'react';
import { Typography } from 'antd';

import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/data-test-id';

import styles from './modal-err.module.scss';

const { Text } = Typography;

export type ModalErrDataProps = {
    title: ReactNode;
    okText: string;
    message: ReactNode;
    icon: ReactNode;
    bntDataTestId: string;
    maskStyle: CSSProperties;
    closable: boolean;
    className: string;
    closeIcon?: ReactNode;
};

export type ModalErrDataKeys = {
    getTrainingListErr: ModalErrDataProps;
    saveTrainingErr: ModalErrDataProps;
    saveUserPhotoErr: ModalErrDataProps;
    updateUserDataErr: ModalErrDataProps;
};

export const modalErrData: ModalErrDataKeys = {
    getTrainingListErr: {
        title: (
            <Text data-test-id={DATA_TEST_ID.modalErrorUserTrainingTitle}>
                При открытии данных произошла ошибка
            </Text>
        ),
        message: (
            <Text type='secondary' data-test-id={DATA_TEST_ID.modalErrorUserTrainingSubTitle}>
                Попробуйте ещё раз.
            </Text>
        ),
        icon: <CloseCircleOutlined style={{ color: 'var(--primary-light-6)' }} />,
        okText: 'Обновить',
        bntDataTestId: DATA_TEST_ID.modalErrorUserTrainingButton,
        maskStyle: { background: 'rgba(121, 156, 212, 0.10)', backdropFilter: 'blur(6px)' },
        closable: true,
        className: styles.modal_training_list_err,
        closeIcon: (
            <CloseOutlined
                data-test-id={DATA_TEST_ID.modalErrorUserTrainingButtonClose}
                style={{ fontSize: 'var(--font-size-base)' }}
            />
        ),
    },

    saveTrainingErr: {
        title: (
            <Text data-test-id={DATA_TEST_ID.modalErrorUserTrainingTitle}>
                При сохранении данных произошла ошибка
            </Text>
        ),
        message: (
            <Text type='secondary' data-test-id={DATA_TEST_ID.modalErrorUserTrainingSubTitle}>
                Придётся попробовать ещё раз
            </Text>
        ),
        icon: <CloseCircleOutlined style={{ color: 'var(--light-error)' }} />,
        okText: 'Закрыть',
        bntDataTestId: DATA_TEST_ID.modalErrorUserTrainingButton,
        maskStyle: { background: 'rgba(121, 156, 212, 0.10)', backdropFilter: 'blur(6px)' },
        closable: false,
        className: styles.modal_save_training_err,
    },

    saveUserPhotoErr: {
        title: <Text>Файл слишком большой</Text>,
        message: (
            <Text type='secondary' data-test-id={DATA_TEST_ID.modalErrorUserTrainingSubTitle}>
                Выберите файл размером до 5 МБ.
            </Text>
        ),
        icon: <CloseCircleOutlined style={{ color: 'var(--light-error)' }} />,
        okText: 'Закрыть',
        bntDataTestId: 'big-file-error-close',
        maskStyle: { background: 'rgba(121, 156, 212, 0.10)', backdropFilter: 'blur(6px)' },
        closable: false,
        className: styles.modal_save_training_err,
    },

    updateUserDataErr: {
        title: <Text>При сохранении данных произошла ошибка</Text>,
        message: (
            <Text type='secondary' data-test-id={DATA_TEST_ID.modalErrorUserTrainingSubTitle}>
                Придётся попробовать ещё раз
            </Text>
        ),
        icon: <CloseCircleOutlined style={{ color: 'var(--light-error)' }} />,
        okText: 'Закрыть',
        bntDataTestId: 'big-file-error-close',
        maskStyle: { background: 'rgba(121, 156, 212, 0.10)', backdropFilter: 'blur(6px)' },
        closable: false,
        className: styles.modal_save_training_err,
    },
};
