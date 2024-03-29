import React, { useLayoutEffect, useState } from 'react';
import { Layout } from 'antd';

import { XS_WIDTH } from '@constants/index';
import { useMediaQuery } from '@utils/use-media-query';

import { ExitBtn } from '@components/buttons/exit-button';
import { SideToggleBtn } from '@components/buttons/toggle-side-menu-button';
import { Logo } from '@components/logo';
import { Navbar } from '@components/navbar';

import styles from './sidebar.module.scss';

const { Sider } = Layout;

export const Sidebar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const isMobilePhone = useMediaQuery(`(max-width: ${XS_WIDTH})`);
    const defaultCollapsedWidth = 64;
    const [collapsedWidth, setCollapsedWidth] = useState(defaultCollapsedWidth);
    const isWidthChanged = collapsedWidth !== defaultCollapsedWidth;

    useLayoutEffect(() => {
        if (isMobilePhone) setCollapsed(true);
    }, [isMobilePhone]);

    const handleBreakpoint = (broken: boolean) => {
        if (broken) {
            setCollapsedWidth(1);
        } else {
            setCollapsedWidth(defaultCollapsedWidth);
        }
    };

    return (
        <Sider
            trigger={null}
            breakpoint='sm'
            onBreakpoint={handleBreakpoint}
            collapsible={true}
            collapsed={collapsed}
            collapsedWidth={collapsedWidth}
            width={isWidthChanged ? 106 : 208}
            className={styles.wrapper}
        >
            <Logo isClosedSidebar={collapsed} />
            <Navbar isWidthChanged={isWidthChanged} isClosedSidebar={collapsed} />
            <SideToggleBtn
                toggleSideBar={setCollapsed}
                isClosedSidebar={collapsed}
                isWidthChanged={isWidthChanged}
            />
            <ExitBtn isClosedSidebar={collapsed} isWidthChanged={isWidthChanged} />
        </Sider>
    );
};
