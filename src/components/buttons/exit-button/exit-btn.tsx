import { Button } from 'antd';

import { ExitIcon } from '@components/icons/exit-icon';

import styles from './exit-btn.module.scss';

type ExitBtnProps = {
    isClosedSidebar: boolean;
    isWidthChanged: boolean;
    onClick: () => void;
};

export const ExitBtn = ({ isClosedSidebar, isWidthChanged, onClick }: ExitBtnProps) => (
    <Button
        block={true}
        icon={!isWidthChanged && <ExitIcon />}
        onClick={onClick}
        className={styles.button}
    >
        {!isClosedSidebar && 'Выход'}
    </Button>
);
