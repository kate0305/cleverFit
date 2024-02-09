import { Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import styles from './toggle-side-btn.module.scss';

type SideToggleBtnProps = {
    isClosedSidebar: boolean;
    toggleSideBar: React.Dispatch<React.SetStateAction<boolean>>;
    isWidthChanged: boolean;
};

export const SideToggleBtn = ({ isClosedSidebar, toggleSideBar, isWidthChanged }: SideToggleBtnProps) => {
    const handleClick = () => toggleSideBar(!isClosedSidebar);
    return (
        <Button
            icon={isClosedSidebar ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={handleClick}
            className={styles.button}
            data-test-id={isWidthChanged ? 'sider-switch-mobile' : 'sider-switch'}
        />
    );
};
