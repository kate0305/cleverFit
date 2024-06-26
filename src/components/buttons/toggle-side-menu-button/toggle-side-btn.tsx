import { Button } from 'antd';
import { toggleSidebar } from '@redux/redusers/app-slice';

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';

import styles from './toggle-side-btn.module.scss';

type SideToggleBtnProps = {
    isClosedSidebar: boolean;
    toggleSideBar: React.Dispatch<React.SetStateAction<boolean>>;
    isWidthChanged: boolean;
};

export const SideToggleBtn = ({
    isClosedSidebar,
    toggleSideBar,
    isWidthChanged,
}: SideToggleBtnProps) => {
    const dispatch = useAppDispatch();
    const handleClick = () => {
        toggleSideBar(!isClosedSidebar);
        dispatch(toggleSidebar());
    };

    return (
        <Button
            icon={isClosedSidebar ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={handleClick}
            className={styles.button}
            data-test-id={
                isWidthChanged ? DATA_TEST_ID.siderSwitchMobile : DATA_TEST_ID.siderSwitch
            }
        />
    );
};
