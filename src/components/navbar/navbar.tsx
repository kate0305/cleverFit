import { useLocation } from 'react-router-dom';
import { Menu, MenuProps } from 'antd';

import { Paths } from '@type/paths';
import { useCalendarClick } from '@utils/use-click-calendar';

import { createMenuItemsArr } from './data';

import styles from './navbar.module.scss';

type NavbarProps = {
    isWidthChanged: boolean;
    isClosedSidebar: boolean;
};

export const Navbar = ({ isWidthChanged, isClosedSidebar }: NavbarProps) => {
    const { pathname } = useLocation();

    const { handleClick } = useCalendarClick();
    const handleMenuItemsClick: MenuProps['onClick'] = (e) => {
        switch (e.key) {
            case Paths.CALENDAR:
                handleClick();
                break;

            default:
                break;
        }
    };

    return (
        <Menu
            className={styles.wrapper}
            selectedKeys={[pathname]}
            mode='inline'
            onClick={handleMenuItemsClick}
            items={createMenuItemsArr(isWidthChanged, isClosedSidebar)}
        />
    );
};
