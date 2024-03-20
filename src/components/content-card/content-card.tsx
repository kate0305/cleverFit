import { CSSProperties, ReactNode } from 'react';
import { Card } from 'antd';

type ContentCardProps = {
    content: JSX.Element;
    className: string;
    bordered?: boolean;
    title?: ReactNode;
    extra?: ReactNode;
    actions?: ReactNode[];
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
    actions,
    headStyle,
    bodyStyle,
    style,
    dataTestId,
}: ContentCardProps) => (
    <Card
        title={title}
        bordered={bordered}
        extra={extra}
        actions={actions}
        headStyle={headStyle}
        bodyStyle={bodyStyle}
        className={className}
        style={style}
        data-test-id={dataTestId}
    >
        {content}
    </Card>
);
