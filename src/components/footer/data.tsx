import { AndroidFilled, AppleFilled } from '@ant-design/icons';

export const appsList = [
    {
        id: '1',
        to: '/',
        iconLabel: 'Android OS',
        icon: <AndroidFilled style={{ color: 'var(--neutral-gray-13)' }} />,
        className: '.app',
    },
    {
        id: '2',
        to: '/',
        iconLabel: 'Apple iOS',
        icon: <AppleFilled style={{ color: 'var(--neutral-gray-13)' }} />,
        className: '.app',
    },
];
