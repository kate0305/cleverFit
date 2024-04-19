import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';

import { BREADCRUMB_NAMES } from '@constants/index';
import { Paths } from '@type/paths';

import styles from './breadcrumbs.module.scss';

export const Breadcrumbs = () => {
    const { pathname } = useLocation();
    const pathSnippets = pathname.split(Paths.HOME).filter((i) => i);

    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join(Paths.HOME)}`;

        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{BREADCRUMB_NAMES[url]}</Link>
            </Breadcrumb.Item>
        );
    });

    const breadcrumbItems = [
        <Breadcrumb.Item key={Paths.HOME}>
            <Link to={Paths.MAIN}>Главная</Link>
        </Breadcrumb.Item>,
        ...extraBreadcrumbItems,
    ];

    return (
        <Breadcrumb separator={pathname !== Paths.MAIN && '/'} className={styles.breadcrumbs}>
            {breadcrumbItems}
        </Breadcrumb>
    );
};
