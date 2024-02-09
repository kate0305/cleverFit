import { CalendarTwoTone, HeartFilled, TrophyFilled, IdcardOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';
import styles from './navbar.module.scss';

const data = [
    {
        key: '1',
        icon: CalendarTwoTone,
        label: 'Календарь',
    },
    {
        key: '2',
        icon: HeartFilled,
        label: 'Тренировки',
    },
    {
        key: '3',
        icon: TrophyFilled,
        label: 'Достижения',
    },
    {
        key: '4',
        icon: IdcardOutlined,
        label: 'Профиль',
    },
];

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    style?: React.CSSProperties | undefined,
    className?: string,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        className,
        style,
        children,
        label,
        type,
    } as MenuItem;
}

export const createMenuItemsArr = (
    isWidthChanged: boolean,
    isClosedSidebar: boolean,
): MenuItem[] => {
    const arr = data.map(({ key, icon, label }) => {
        const Icon = () => {
            const IconComponent = icon;
            return !isWidthChanged ? (
                <IconComponent
                    style={{ color: '#061178', fontSize: '14px' }}
                    twoToneColor='#061178'
                />
            ) : null;
        };
        const padding = () => {
            if (isWidthChanged) return '8px';
            if (!isClosedSidebar) return '18px';
        };
        return getItem(label, key, <Icon />, { paddingLeft: padding() }, styles.link);
    });
    return arr;
};
