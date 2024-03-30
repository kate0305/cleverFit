import { MenuProps } from 'antd';

export type MenuItem = Required<MenuProps>['items'][number];

export const getListItemWithIcon = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    style?: React.CSSProperties | undefined,
    className?: string,
    children?: MenuItem[],
    type?: 'group',
): MenuItem => ({
        key,
        icon,
        className,
        style,
        children,
        label,
        type,
    } as MenuItem);
