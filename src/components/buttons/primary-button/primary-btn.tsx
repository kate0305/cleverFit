import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';

export type PrimaryBtnProps = ButtonProps & {
    className: string;
    btnText?: string;
    onClick?: () => void;
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
