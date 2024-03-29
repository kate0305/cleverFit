import { Button } from 'antd';

import { useLogOut } from '@utils/use-logout';

import { ExitIcon } from '@components/icons/exit-icon';

import styles from './exit-btn.module.scss';

type ExitBtnProps = {
    isClosedSidebar: boolean;
    isWidthChanged: boolean;
};

export const ExitBtn = ({ isClosedSidebar, isWidthChanged }: ExitBtnProps) => {
    const logOut = useLogOut();

    return (
        <Button
            block={true}
            icon={!isWidthChanged && <ExitIcon />}
            onClick={logOut}
            className={styles.button}
        >
            {!isClosedSidebar && 'Выход'}
        </Button>
    );
};
