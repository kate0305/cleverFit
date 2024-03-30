import { Alert, AlertProps } from 'antd';

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
        data-test-id={dataTestId || 'alert'}
    />
);
