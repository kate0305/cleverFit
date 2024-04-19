import { AuthPaths, Paths, ResultPaths } from '@type/paths';

// breakpoints width
export const XS_WIDTH = '480px';
export const SM_WIDTH = '576px';
export const MD_WIDTH = '768px';
export const TABLET_WIDTH = '834px';
export const LG_WIDTH = '992px';
export const XL_WIDTH = '1100px';


// base and part url for API
export const BASE_URL = 'https://marathon-api.clevertec.ru';
export const BASE_AVATAR_URL = 'https://training-api.clevertec.ru';
export const SIGN_UP = '/auth/registration';
export const SIGN_IN = '/auth/login';
export const GOOGLE_AUTH = '/auth/google';
export const CHECK_EMAIL = '/auth/check-email';
export const CONFIRM_EMAIL_URL = '/auth/confirm-email';
export const CHANGE_PASSWORD_URL = '/auth/change-password';
export const FEEDBACK = '/feedback';
export const TRAINING = '/training';
export const TRAINING_LIST = '/catalogs/training-list';
export const TARIFF_LIST = '/catalogs/tariff-list';
export const PARTNERS_LIST = '/catalogs/training-pals';
export const USERS_FOR_JOINT_WORKOUTS = '/catalogs/user-joint-training-list';
export const USER = '/user';
export const USER_ME = '/user/me';
export const UPLOAD_IMG = '/upload-image';
export const PAY_NEW_TARIFF = '/tariff';
export const INVITE = '/invite';


// route paths
export const REGISTRATION = `${Paths.AUTH}/${AuthPaths.REGISTRATION}`;
export const CONFIRM_EMAIL = `${Paths.AUTH}/${AuthPaths.CONFIRM_EMAIL}`;
export const CHANGE_PASSWORD = `${Paths.AUTH}/${AuthPaths.CHANGE_PASSWORD}`;
export const LOGIN_ERR = `${Paths.RESULT}/${ResultPaths.LOGIN_ERR}`;
export const REGISTRATION_SUCCESS = `${Paths.RESULT}/${ResultPaths.REGISTRATION_SUCCESS}`;
export const REGISTRATION_ERR = `${Paths.RESULT}/${ResultPaths.REGISTRATION_ERR}`;
export const REGISTRATION_ERR_409 = `${Paths.RESULT}/${ResultPaths.REGISTRATION_ERR_409}`;
export const CHECK_EMAIL_ERR = `${Paths.RESULT}/${ResultPaths.CHECK_EMAIL_ERR}`;
export const CHECK_EMAIL_ERR_404 = `${Paths.RESULT}/${ResultPaths.CHECK_EMAIL_ERR_404}`;
export const CHANGE_PASSWORD_SUCCESS = `${Paths.RESULT}/${ResultPaths.CHANGE_PASSWORD_SUCCESS}`;
export const CHANGE_PASSWORD_ERR = `${Paths.RESULT}/${ResultPaths.CHANGE_PASSWORD_ERR}`;


// date
export const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
};

export const LOCALE_OPTIONS = {
    monthsShort: [
        'Янв',
        'Фев',
        'Мар',
        'Апр',
        'Май',
        'Июн',
        'Июл',
        'Авг',
        'Сен',
        'Окт',
        'Ноя',
        'Дек',
    ],
    weekdaysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
};


// breadcrumbs
export const BREADCRUMB_NAMES: Record<string, string> = {
    '/feedbacks': 'Отзывы пользователей',
    '/calendar': 'Календарь',
    '/training': 'Тренировки',
    '/achievements': 'Достижения',
};

// sizes
export const MAX_NUMBER_WORKOUT_PARTNERS = 4;
export const WEEKDAY_NUMBER_FOR_SUNDAY = 7;
export const DURATION_PERIOD_FOR_WEEK = 6;
export const DURATION_PERIOD_FOR_MONTH = 27;
export const ONE_DAY_PERIOD = 1;
export const SUNDAY_NUMBER_FOR_LOCAL = 6;
export const SATURDAY_NUMBER_FOR_LOCAL = 5;
export const FRIDAY_NUMBER_FOR_LOCAL = 4;
export const NUMBER_OF_WEEKS_IN_MONTH = 4;
export const NUMBER_OF_DAYS_IN_WEEK = 7;

// patterns
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PASSWORD_PATTERN = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}/;

// errors message
export const CONFIRM_PASSWORD_ERR = 'Пароли не совпадают';
