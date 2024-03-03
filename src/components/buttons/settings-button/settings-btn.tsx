import { Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import { useMediaQuery } from '@utils/use-media-query';

import { LG_WIDTH, SM_WIDTH } from '@constants/index';

import styles from './settings-btn.module.scss';

export const SettingsBtn = () => {
    const isDesktop = useMediaQuery(`(min-width: ${LG_WIDTH})`);
    const isMobileSM = useMediaQuery(`(max-width: ${SM_WIDTH})`);

    const DesktopBtn = () => (
        <Button icon={<SettingOutlined style={{ marginRight: '2px' }} />} className={styles.button}>
            Настройки
        </Button>
    );

    const DesktopLGBtn = () => <Button className={styles.button}>Настройки</Button>;

    const MobileBtn = () => (
        <Button shape='circle' icon={<SettingOutlined />} className={styles.button} />
    );

    return isDesktop ? <DesktopBtn /> : isMobileSM ? <MobileBtn /> : <DesktopLGBtn />;
};
