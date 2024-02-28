import React from 'react';

import styles from './breadcrumbs.module.scss';
import { Breadcrumb } from 'antd';

export const Breadcrumbs: React.FC = () => {
    return (
        <Breadcrumb className={styles.breadcrumbs}>
            <Breadcrumb.Item>Главная</Breadcrumb.Item>
        </Breadcrumb>
    );
};
