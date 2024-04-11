import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { DrawerTitleKeys } from '@type/drawer';

export const periodOptions = [
    {
        value: 1,
        label: 'Через 1 день',
    },
    {
        value: 2,
        label: 'Через 2 дня',
    },
    {
        value: 3,
        label: 'Через 3 дня',
    },
    {
        value: 4,
        label: 'Через 4 дня',
    },
    {
        value: 5,
        label: 'Через 5 дней',
    },
    {
        value: 6,
        label: 'Через 6 дней',
    },
    {
        value: 7,
        label: '1 раз в неделю',
    },
];

export const getDrawerTitle = (isEditMode: boolean, isJointWorkout?: boolean) => {
    if (isEditMode) {
        return {
            type: DrawerTitleKeys.EDIT,
            text: DrawerTitleKeys.EDIT,
            icon: <EditOutlined style={{ fontSize: 'var(--font-size-base)' }} />,
        };
    }

    if (isJointWorkout) {
        return {
            type: DrawerTitleKeys.JOINT_WORKOUT,
            text: DrawerTitleKeys.JOINT_WORKOUT,
            icon: <PlusOutlined style={{ fontSize: 'var(--font-size-base)' }} />,
        };
    }

    return {
        type: DrawerTitleKeys.NEW_EXERCISE,
        text: DrawerTitleKeys.NEW_EXERCISE,
        icon: <PlusOutlined style={{ fontSize: 'var(--font-size-base)' }} />,
    };
};
