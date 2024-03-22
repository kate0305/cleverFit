import { ReactNode } from 'react';
import { Button } from 'antd';
import { ButtonType } from 'antd/lib/button';

export type PrimaryBtnProps = {
    className: string;
    type?: ButtonType;
    icon?: ReactNode;
    htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
    btnText?: string;
    href?: string;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    dataTestId?: string;
};

export const PrimaryBtn = ({
    type,
    icon,
    htmlType,
    btnText,
    href,
    onClick,
    disabled,
    loading,
    className,
    dataTestId,
}: PrimaryBtnProps) => (
    <Button
        type={type}
        icon={icon}
        htmlType={htmlType}
        href={href}
        onClick={onClick}
        disabled={disabled}
        loading={loading}
        className={className}
        data-test-id={dataTestId}
    >
        {btnText}
    </Button>
);
