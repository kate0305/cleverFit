import { Button } from 'antd';

import { SettingOutlined } from '@ant-design/icons';
import { LG_WIDTH, SM_WIDTH } from '@constants/index';
import { useMediaQuery } from '@utils/use-media-query';

import styles from './settings-btn.module.scss';

export const SettingsBtn = (props: { className?: string }) => {
    const isDesktop = useMediaQuery(`(min-width: ${LG_WIDTH})`);
    const isMobileSM = useMediaQuery(`(max-width: ${SM_WIDTH})`);

    const desktopBtn = (
        <Button
            icon={<SettingOutlined style={{ marginRight: '2px' }} />}
            className={props.className || styles.button}
        >
            Настройки
        </Button>
    );

    const desktopLGBtn = <Button className={props.className || styles.button}>Настройки</Button>;

    const mobileBtn = (
        <Button
            shape='circle'
            icon={<SettingOutlined />}
            className={props.className || styles.button}
        />
    );

    const getTypeOfBtn = () => {
        if (isDesktop) return desktopBtn;
        if (isMobileSM) return mobileBtn;

        return desktopLGBtn;
    };

    return getTypeOfBtn();
};
