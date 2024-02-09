import React, { useState } from 'react';
import { Layout } from 'antd';
import { Logo } from '@components/logo';
import styles from './sidebar.module.scss';
import { Navbar } from '@components/navbar';
import { SideToggleBtn } from '@components/buttons/toggle-side-menu-button';
import { ExitBtn } from '@components/buttons/exit-button';

const { Sider } = Layout;

export const Sidebar: React.FC = () => {
    const defaultCollapsedWidth = 64;
    const [collapsed, setCollapsed] = useState(false);
    const [collapsedWidth, setCollapsedWidth] = useState(defaultCollapsedWidth);
    const isWidthChanged = collapsedWidth !== defaultCollapsedWidth;
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
            breakpoint='xs'
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
            <ExitBtn isClosedSidebar={collapsed} isWidthChanged={isWidthChanged} />
        </Sider>
    );
};
