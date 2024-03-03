import { Menu } from 'antd';

import { createMenuItemsArr } from './data';

import styles from './navbar.module.scss';

type NavbarProps = {
    isWidthChanged: boolean;
    isClosedSidebar: boolean;
};

export const Navbar = ({ isWidthChanged, isClosedSidebar }: NavbarProps) => {
    return (
        <Menu
            className={styles.wrapper}
            mode='inline'
            items={createMenuItemsArr(isWidthChanged, isClosedSidebar)}
        ></Menu>
    );
};
