import { ReactNode } from 'react';
import { Drawer, DrawerProps } from 'antd';

import { CloseOutlined } from '@ant-design/icons';
import { MD_WIDTH } from '@constants/index';
import { DrawerTitleProps } from '@type/drawer';
import { useMediaQuery } from '@utils/use-media-query';

import { DrawerTitle } from './drawer-title';

import styles from './drawer.module.scss';

type DrawerComponentProps = DrawerProps & {
    isOpenDrawer: boolean;
    children: ReactNode;
    titleChildren: DrawerTitleProps;
    setCloseDrawer: () => void;
    dataTestId?: string;
};

export const DrawerComponent = ({
    isOpenDrawer,
    children,
    titleChildren,
    footer,
    setCloseDrawer,
    dataTestId,
}: DrawerComponentProps) => {
    const isLaptop = useMediaQuery(`(min-width: ${MD_WIDTH})`);

    return (
        <Drawer
            title={<DrawerTitle {...titleChildren} />}
            footer={footer}
            onClose={setCloseDrawer}
            open={isOpenDrawer}
            closeIcon={<CloseOutlined data-test-id='modal-drawer-right-button-close' />}
            destroyOnClose={true}
            placement={isLaptop ? 'right' : 'bottom'}
            mask={true}
            maskClosable={false}
            maskClassName={styles.mask}
            width={408}
            height={555}
            className={styles.wrapper}
            data-test-id={dataTestId || 'modal-drawer-right'}
        >
            <div className={styles.body}>{children}</div>
        </Drawer>
    );
};
