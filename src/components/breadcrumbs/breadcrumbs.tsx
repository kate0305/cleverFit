import React from 'react';
import { Breadcrumb } from 'antd';

import styles from './breadcrumbs.module.scss';

export const Breadcrumbs: React.FC = () => {
    return (
        <Breadcrumb className={styles.breadcrumbs}>
            <Breadcrumb.Item>Главная</Breadcrumb.Item>
        </Breadcrumb>
    );
};
