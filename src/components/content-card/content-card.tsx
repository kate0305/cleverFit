import { CSSProperties } from 'react';
import { Card } from 'antd';
import { CardProps } from 'antd/lib/card';

type ContentCardProps = CardProps & {
    className: string;
    style?: CSSProperties;
    dataTestId?: string;
};

export const ContentCard = ({
    title,
    children,
    className,
    bordered,
    extra,
    actions,
    tabList,
    cover,
    onClick,
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
        tabList={tabList}
        cover={cover}
        onClick={onClick}
        headStyle={headStyle}
        bodyStyle={bodyStyle}
        className={className}
        style={style}
        data-test-id={dataTestId}
    >
        {children}
    </Card>
);
