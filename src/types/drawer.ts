import { ReactNode } from 'react';

export type DrawerTitleProps = {
    type: string;
    text: string;
    icon?: ReactNode;
};

export enum DrawerTitleKeys {
    EDIT = 'edit',
    COMPARE = 'compare',
    NEW_EXERCISE = 'new exersise',
    NEW_WORKOUT = 'new workout',
}
