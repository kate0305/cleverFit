import { CalendarTwoTone, HeartFilled, TrophyFilled, IdcardOutlined } from '@ant-design/icons';
import { MenuItem, getListItemWithIcon } from '@utils/get-list-item-with-icon';

import styles from './navbar.module.scss';

const data = [
    {
        key: '1',
        icon: (
            <CalendarTwoTone style={{ fontSize: '14px' }} twoToneColor={['#061178', '#061178']} />
        ),
        label: 'Календарь',
    },
    {
        key: '2',
        icon: <HeartFilled style={{ color: '#061178', fontSize: '14px' }} />,
        label: 'Тренировки',
    },
    {
        key: '3',
        icon: <TrophyFilled style={{ color: '#061178', fontSize: '14px' }} />,
        label: 'Достижения',
    },
    {
        key: '4',
        icon: <IdcardOutlined style={{ color: '#061178', fontSize: '14px' }} />,
        label: 'Профиль',
    },
];

export const createMenuItemsArr = (
    isWidthChanged: boolean,
    isClosedSidebar: boolean,
): MenuItem[] => {
    const arr = data.map(({ key, icon, label }) => {
        const Icon = () => (!isWidthChanged ? icon : null);

        const padding = () => {
            if (isWidthChanged) return '8px';
            if (!isClosedSidebar) return '18px';
        };
        return getListItemWithIcon(label, key, <Icon />, { paddingLeft: padding() }, styles.link);
    });
    return arr;
};
