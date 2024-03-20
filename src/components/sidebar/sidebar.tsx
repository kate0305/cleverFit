import React, { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from 'antd';

import { reset } from '@redux/redusers/user-data-slice';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';

import { useLocalStorage } from '@utils/use-local-storage';
import { useMediaQuery } from '@utils/use-media-query';

import { Paths } from '@type/paths';
import { XS_WIDTH } from '@constants/index';

import { ExitBtn } from '@components/buttons/exit-button';
import { SideToggleBtn } from '@components/buttons/toggle-side-menu-button';
import { Logo } from '@components/logo';
import { Navbar } from '@components/navbar';

import styles from './sidebar.module.scss';

const { Sider } = Layout;

export const Sidebar: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [, , removeLocalStorageItem] = useLocalStorage('token', null);
    const [collapsed, setCollapsed] = useState(false);
    const isMobilePhone = useMediaQuery(`(max-width: ${XS_WIDTH})`);
    const defaultCollapsedWidth = 64;
    const [collapsedWidth, setCollapsedWidth] = useState(defaultCollapsedWidth);
    const isWidthChanged = collapsedWidth !== defaultCollapsedWidth;

    useLayoutEffect(() => {
        if (isMobilePhone) setCollapsed(true);
    }, [collapsed, isMobilePhone]);

    const handleBreakpoint = (broken: boolean) => {
        if (broken) {
            setCollapsedWidth(1);
        } else {
            setCollapsedWidth(defaultCollapsedWidth);
        }
    };

    const logOut = () => {
        dispatch(reset());
        removeLocalStorageItem();
        navigate(Paths.AUTH, { replace: true });
    };

    return (
        <Sider
            trigger={null}
            breakpoint='sm'
            onBreakpoint={handleBreakpoint}
            collapsible
            collapsed={collapsed}
            collapsedWidth={collapsedWidth}
            width={!isWidthChanged ? 208 : 106}
            className={styles.wrapper}
        >
            <Logo isClosedSidebar={collapsed} />
            <Navbar isWidthChanged={isWidthChanged} isClosedSidebar={collapsed} />
            <SideToggleBtn
                toggleSideBar={setCollapsed}
                isClosedSidebar={collapsed}
                isWidthChanged={isWidthChanged}
            />
            <ExitBtn isClosedSidebar={collapsed} isWidthChanged={isWidthChanged} onClick={logOut} />
        </Sider>
    );
};
