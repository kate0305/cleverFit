import { CSSProperties, ReactNode } from 'react';
import { Card } from 'antd';

import styles from './content-card.module.scss';

type ContentCardProps = {
    title?: string;
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
        className={styles[className]}
        style={style}
        data-test-id={dataTestId}
    >
        {content}
    </Card>
);
