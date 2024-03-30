import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

import { SettingOutlined } from '@ant-design/icons';
import { LG_WIDTH, SM_WIDTH, XS_WIDTH } from '@constants/index';
import { useLazyGetTariffListQuery } from '@services/user-service';
import { Paths } from '@type/paths';
import { useMediaQuery } from '@utils/use-media-query';

import styles from './settings-btn.module.scss';

type SettingsBtnProps = {
    className?: string;
    isPage?: string;
};

export const SettingsBtn = ({ className, isPage }: SettingsBtnProps) => {
    const navigate = useNavigate();

    const isDesktop = useMediaQuery(`(min-width: ${LG_WIDTH})`);
    const isMobileSM = useMediaQuery(`(max-width: ${SM_WIDTH})`);
    const isNotMobile = useMediaQuery(`(min-width: ${XS_WIDTH})`);

    const [getTarifflist] = useLazyGetTariffListQuery();

    const handleClick = async() => {
        await getTarifflist();
        navigate(Paths.SETTINGS);
    }

    const desktopBtn = (
        <Button
            icon={<SettingOutlined style={{ marginRight: '2px' }} />}
            onClick={handleClick}
            className={className || styles.button}
            data-test-id='header-settings'
        >
            Настройки
        </Button>
    );

    const desktopLGBtn = (
        <Button
            onClick={handleClick}
            data-test-id='header-settings'
            className={className || styles.button}
        >
            Настройки
        </Button>
    );

    const mobileBtn = (
        <Button
            onClick={handleClick}
            shape='circle'
            icon={<SettingOutlined />}
            className={className || styles.button}
            data-test-id='header-settings'
        />
    );

    const getTypeOfBtn = () => {
        if (isDesktop || (isDesktop && isPage === Paths.PROFILE)) return desktopBtn;
        if (isNotMobile && isPage === Paths.PROFILE) return desktopBtn;
        if (isMobileSM) return mobileBtn;

        return desktopLGBtn;
    };

    return getTypeOfBtn();
};
