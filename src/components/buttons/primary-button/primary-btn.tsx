import { Button } from 'antd';
import { ButtonType } from 'antd/lib/button';

import styles from './primary-btn.module.scss';
import { ReactNode } from 'react';

export type PrimaryBtnProps = {
    type?: ButtonType;
    icon?: ReactNode;
    htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
    btnText?: string;
    onClick?: () => void;
    disabled?: boolean;
    className: string;
    dataTestId?: string;
};

export const PrimaryBtn = ({
    type,
    icon,
    htmlType,
    btnText,
    onClick,
    disabled,
    className,
    dataTestId,
}: PrimaryBtnProps) => (
    <Button
        type={type}
        icon={icon}
        htmlType={htmlType}
        onClick={onClick}
        disabled={disabled}
        className={styles[`${className}`]}
        data-test-id={dataTestId}
    >
        {btnText}
    </Button>
);
