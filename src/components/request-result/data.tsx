import { ReactNode } from 'react';
import { LinkProps } from 'react-router-dom';
import { ResultStatusType } from 'antd/lib/result';

import { AuthPaths, Paths } from '@type/paths';
import { CHANGE_PASSWORD } from '@constants/index';

export type ResultProps = {
    status?: ResultStatusType;
    title: string;
    message: string | ReactNode;
    btnText: string;
    btnClassName: string;
    navigateTo: string;
    state?: LinkProps['state'];
    dataTestId?: string;
};

export type RequestResultKeys = {
    signInErr: ResultProps;
    signUpSuccess: ResultProps;
    signUpErr: ResultProps;
    signUpErr409: ResultProps;
    checkEmailErr: ResultProps;
    checkEmailErr404: ResultProps;
    changePasswordSuccess: ResultProps;
    changePasswordErr: ResultProps;
};

export const RequestResultData: RequestResultKeys = {
    signInErr: {
        status: 'warning',
        title: 'Вход не выполнен',
        message: 'Что-то пошло не так. Попробуйте еще раз',
        btnText: 'Повторить',
        btnClassName: 'btn_notice',
        navigateTo: `${Paths.AUTH}`,
        dataTestId: 'login-retry-button',
    },
    signUpSuccess: {
        status: 'success',
        title: 'Регистрация успешна',
        message:
            'Регистрация прошла успешно. Зайдите в\u00A0приложение, используя свои e-mail и пароль.',
        btnText: 'Войти',
        btnClassName: 'btn_notice',
        navigateTo: `${Paths.AUTH}`,
        dataTestId: 'registration-enter-button',
    },
    signUpErr: {
        status: 'error',
        title: 'Данные не сохранились',
        message: 'Что-то пошло не так и ваша регистрация не\u00A0завершилась. Попробуйте ещё раз.',
        btnText: 'Повторить',
        btnClassName: 'btn_notice',
        navigateTo: `${Paths.AUTH}/${AuthPaths.REGISTRATION}`,
        state: { fromErr: true },
        dataTestId: 'registration-retry-button',
    },
    signUpErr409: {
        status: 'error',
        title: 'Данные не сохранились',
        message:
            'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.',
        btnText: 'Назад к регистрации',
        btnClassName: 'btn_notice',
        navigateTo: `${Paths.AUTH}/${AuthPaths.REGISTRATION}`,
        dataTestId: 'registration-back-button',
    },
    checkEmailErr: {
        status: '500',
        title: 'Что-то пошло не так',
        message: 'Произошла ошибка, попробуйте отправить форму ещё раз.',
        btnText: 'Назад',
        btnClassName: 'btn_notice',
        navigateTo: `${Paths.AUTH}`,
        state: { fromErr: true },
        dataTestId: 'check-back-button',
    },
    checkEmailErr404: {
        status: 'error',
        title: 'Такой e-mail не зарегистрирован',
        message: 'Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.',
        btnText: 'Попробовать снова',
        btnClassName: 'btn_notice',
        navigateTo: `${Paths.AUTH}`,
        dataTestId: 'check-retry-button',
    },
    changePasswordSuccess: {
        status: 'success',
        title: 'Пароль успешно изменен',
        message: 'Теперь можно войти в аккаунт, используя свой\u00A0логин и новый пароль',
        btnText: 'Вход',
        btnClassName: 'btn_notice',
        navigateTo: `${Paths.AUTH}`,
        dataTestId: 'change-entry-button',
    },
    changePasswordErr: {
        status: 'error',
        title: 'Данные не сохранились',
        message: 'Что-то пошло не так. Попробуйте ещё раз',
        btnText: 'Повторить',
        btnClassName: 'btn_notice',
        navigateTo: CHANGE_PASSWORD,
        state: { fromErr: true },
        dataTestId: 'change-retry-button',
    },
};
