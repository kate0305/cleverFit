import { CalendarTwoTone, HeartFilled, IdcardOutlined } from '@ant-design/icons';
import { Paths } from '@type/paths';

export const possibilities = [
    {
        id: '1',
        text: 'планировать свои тренировки на\u00A0календаре, выбирая тип и\u00A0уровень нагрузки;',
    },
    {
        id: '2',
        text: 'отслеживать свои достижения в\u00A0разделе статистики, сравнивая свои результаты с\u00A0нормами и\u00A0рекордами;',
    },
    {
        id: '3',
        text: 'создавать свой профиль, где ты\u00A0можешь загружать свои фото, видео и отзывы о\u00A0тренировках;',
    },
    {
        id: '4',
        text: 'выполнять расписанные тренировки для разных частей тела, следуя подробным инструкциям и\u00A0советам профессиональных тренеров.',
    },
];

export const actions = [
    {
        id: Paths.WORKOUTS,
        title: 'Расписать тренировки',
        iconLabel: 'Тренировки',
        icon: <HeartFilled style={{ color: '#2f54eb' }} />,
        navigateTo: '',
        dataTestId: 'menu-button-training',
    },
    {
        id: Paths.CALENDAR,
        title: 'Назначить календарь',
        iconLabel: 'Календарь',
        icon: <CalendarTwoTone twoToneColor={['#2f54eb', '#2f54eb']} />,
        navigateTo: '',
        dataTestId: 'menu-button-calendar',
    },
    {
        id: Paths.PROFILE,
        title: 'Заполнить профиль',
        iconLabel: 'Профиль',
        icon: <IdcardOutlined style={{ color: '#2f54eb' }} />,
        navigateTo: Paths.PROFILE,
        dataTestId: 'menu-button-profile',
    },
];
