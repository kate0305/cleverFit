import { Link } from 'react-router-dom';

import { CalendarTwoTone, HeartFilled, IdcardOutlined, TrophyFilled } from '@ant-design/icons';
import { Paths } from '@type/paths';
import { getListItemWithIcon, MenuItem } from '@utils/get-list-item-with-icon';

import styles from './navbar.module.scss';

const data = [
    {
        key: Paths.CALENDAR,
        icon: (
            <CalendarTwoTone style={{ fontSize: '14px' }} twoToneColor={['#061178', '#061178']} />
        ),
        label: 'Календарь',
    },
    {
        key: Paths.WORKOUTS,
        icon: <HeartFilled style={{ color: '#061178', fontSize: '14px' }} />,
        label: 'Тренировки',
    },
    {
        key: 'achievements',
        icon: <TrophyFilled style={{ color: '#061178', fontSize: '14px' }} />,
        label: 'Достижения',
    },
    {
        key: Paths.PROFILE,
        icon: <IdcardOutlined style={{ color: '#061178', fontSize: '14px' }} />,
        label: <Link to={Paths.PROFILE}>Профиль</Link>,
    },
];

export const createMenuItemsArr = (
    isWidthChanged: boolean,
    isClosedSidebar: boolean,
): MenuItem[] => {
    const arr = data.map(({ key, icon, label }) => {
        const Icon = () => (isWidthChanged ? null : icon);

        const padding = () => {
            if (isWidthChanged) return '8px';
            if (!isClosedSidebar) return '18px';

            return undefined;
        };

        return getListItemWithIcon(label, key, <Icon />, { paddingLeft: padding() }, styles.link);
    });

    return arr;
};
