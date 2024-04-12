import { ReactNode } from 'react';

export type DrawerTitleProps = {
    type: string;
    text: string;
    icon?: ReactNode;
};

export enum DrawerTitleKeys {
    EDIT = 'Редактирование',
    COMPARE = 'Сравнить тарифы',
    NEW_EXERCISE = 'Добавление упражнений',
    NEW_WORKOUT = 'Новая тренировка',
    JOINT_WORKOUT = 'Совместная тренировка',
}
