import { Link } from 'react-router-dom';
import { Badge } from 'antd';

import { CalendarTwoTone, HeartFilled, IdcardOutlined, TrophyFilled } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { Paths } from '@type/paths';
import { getListItemWithIcon, MenuItem } from '@utils/get-list-item-with-icon';

import styles from './navbar.module.scss';

const iconStyle = { color: 'var(--primary-light-9)', fontSize: 'var(--font-size-base)' };
const selectedIconStyle = { color: 'var(--primary-light-5)', fontSize: 'var(--font-size-base)' };

const data = [
    {
        key: Paths.CALENDAR,
        icon: (
            <CalendarTwoTone
                style={{ fontSize: 'var(--font-size-base)' }}
                twoToneColor={['var(--primary-light-9)', 'var(--primary-light-9)']}
            />
        ),
        selectedIcon: (
            <CalendarTwoTone
                style={{ fontSize: 'var(--font-size-base)' }}
                twoToneColor={['var(--primary-light-5)', 'var(--primary-light-5)']}
            />
        ),
        label: 'Календарь',
    },
    {
        key: Paths.WORKOUTS,
        icon: <HeartFilled style={iconStyle} />,
        selectedIcon: <HeartFilled style={selectedIconStyle} />,
        label: 'Тренировки',
    },
    {
        key: Paths.ACHIEVEMENTS,
        icon: <TrophyFilled style={iconStyle} />,
        selectedIcon: <TrophyFilled style={selectedIconStyle} />,
        label: <span data-test-id={DATA_TEST_ID.sidebarAchievements}>Достижения</span>,
    },
    {
        key: Paths.PROFILE,
        icon: <IdcardOutlined style={iconStyle} />,
        selectedIcon: <IdcardOutlined style={selectedIconStyle} />,
        label: <Link to={Paths.PROFILE}>Профиль</Link>,
    },
];

export const createMenuItemsArr = (
    isWidthChanged: boolean,
    isClosedSidebar: boolean,
    numberOfInvites: number,
    isSelected: string,
): MenuItem[] => {
    const arr = data.map(({ key, icon, selectedIcon, label }) => {
        const currentIcon = isSelected === key ? selectedIcon : icon
        const Icon = () => {
            if (isWidthChanged) return null;
            if (key === Paths.WORKOUTS && !!numberOfInvites) {
                return (
                    <Badge
                        count={numberOfInvites}
                        className={styles.badge}
                        data-test-id={DATA_TEST_ID.notificationAboutJointTraining}
                    >
                        {currentIcon}
                    </Badge>
                );
            }

            return currentIcon;
        };

        const padding = () => {
            if (isWidthChanged) return '8px';
            if (!isClosedSidebar) return '18px';

            return undefined;
        };

        return getListItemWithIcon(label, key, <Icon />, { paddingLeft: padding() });
    });

    return arr;
};
