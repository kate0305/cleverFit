import { Button } from 'antd';

import styles from './exit-btn.module.scss';
import { ExitIcon } from '@components/icons/exit-icon';

type ExitBtnProps = {
    isClosedSidebar: boolean;
    isWidthChanged: boolean;
};

export const ExitBtn = ({ isClosedSidebar, isWidthChanged }: ExitBtnProps) => {
    const handleClick = () => console.log('click');
    return (
        <Button
            block
            icon={!isWidthChanged && <ExitIcon />}
            onClick={handleClick}
            className={styles.button}
        >
            {!isClosedSidebar && 'Выход'}
        </Button>
    );
};
