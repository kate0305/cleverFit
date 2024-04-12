import { DATA_TEST_ID } from '@constants/data-test-id';

export const actions = [
    {
        id: '1',
        name: 'FREE',
        isActive: true,
        img: '/images/free-tariff.jpg',
        tariffIexpired: '',
        dataTestId: '',
    },
];

export const settings = [
    {
        id: '1',
        fieldName: 'readyForJointTraining',
        type: 'Открыт для совместных тренировок',
        tooltipText:
            'включеная функция позволит\u00A0участвовать в\u00A0совместных\u00A0тренировках',
        dataTestId: DATA_TEST_ID.tariffTrainings,
        iconTestId: DATA_TEST_ID.tariffTrainingsIcon,
    },
    {
        id: '2',
        fieldName: 'sendNotification',
        type: 'Уведомления',
        tooltipText:
            'включеная\u00A0функция позволит\u00A0получать уведомления\u00A0об\u00A0активностях',
        dataTestId: DATA_TEST_ID.tariffNotifications,
        iconTestId: DATA_TEST_ID.tariffNotificationsIcon,
    },
    {
        id: '3',
        fieldName: 'darkTheme',
        type: 'Тёмная тема',
        tooltipText: 'темная тема доступна\u00A0для PRO\u00A0tarif',
        dataTestId: DATA_TEST_ID.tariffTheme,
        iconTestId: DATA_TEST_ID.tariffThemeIcon,
    },
];
