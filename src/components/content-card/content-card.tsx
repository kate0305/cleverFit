import { CSSProperties, ReactNode } from 'react';
import { Card } from 'antd';

type ContentCardProps = {
    title?: ReactNode;
    content: JSX.Element;
    className: string;
    bordered: boolean;
    extra?: ReactNode;
    headStyle?: CSSProperties;
    bodyStyle?: CSSProperties;
    style?: CSSProperties;
    dataTestId?: string;
};

export const ContentCard = ({
    title,
    content,
    className,
    bordered,
    extra,
    headStyle,
    bodyStyle,
    style,
    dataTestId,
}: ContentCardProps) => (
    <Card
        title={title}
        bordered={bordered}
        extra={extra}
        headStyle={headStyle}
        bodyStyle={bodyStyle}
        className={className}
        style={style}
        data-test-id={dataTestId}
    >
        {content}
    </Card>
);
