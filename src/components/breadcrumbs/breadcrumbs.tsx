import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';

import { BREADCRUMB_NAMES } from '@constants/index';
import { Paths } from '@type/paths';

import styles from './breadcrumbs.module.scss';

export const Breadcrumbs = () => {
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter((i) => i);

    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{BREADCRUMB_NAMES[url]}</Link>
            </Breadcrumb.Item>
        );
    });

    const breadcrumbItems = [
        <Breadcrumb.Item key='home'>
            <Link to={Paths.MAIN}>Главная</Link>
        </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);

    return <Breadcrumb className={styles.breadcrumbs}>{breadcrumbItems}</Breadcrumb>;
};
