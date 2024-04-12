import { Alert, AlertProps } from 'antd';

import { DATA_TEST_ID } from '@constants/data-test-id';

import styles from './alert.module.scss';

type AlertComponentProps = AlertProps & {
    className?: string;
    dataTestId?: string;
};

export const AlertComponent = ({ message, className, dataTestId, onClose }: AlertComponentProps) => (
    <Alert
        type='success'
        message={message}
        closable={true}
        showIcon={true}
        onClose={onClose}
        className={className || styles.alert}
        data-test-id={dataTestId || DATA_TEST_ID.alert}
    />
);
