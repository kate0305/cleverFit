import { Fragment } from 'react';
import { Typography } from 'antd';

import { DrawerTitleKeys, DrawerTitleProps } from '@type/drawer';

import styles from './drawer-title.module.scss';

const { Title } = Typography;

export const DrawerTitle = ({ type, text, icon }: DrawerTitleProps) => {
    const getTitle = () => {
        if (type !== DrawerTitleKeys.COMPARE) {
            return (
                <Fragment>
                    <span className={styles.icon}>{icon}</span>
                    {text}
                </Fragment>
            );
        }

        return text;
    };

    return (
        <Title level={4} className={styles.title}>
            {getTitle()}
        </Title>
    );
};
