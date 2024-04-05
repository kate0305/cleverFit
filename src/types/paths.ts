export enum Paths {
    HOME = '/',
    MAIN = '/main',
    AUTH = '/auth',
    RESULT = '/result',
    FEEDBACKS = '/feedbacks',
    CALENDAR = '/calendar',
    PROFILE = '/profile',
    SETTINGS = '/settings',
    WORKOUTS = '/training',
    NOT_FOUND = '*',
}

export enum AuthPaths {
    REGISTRATION = 'registration',
    CONFIRM_EMAIL = 'confirm-email',
    CHANGE_PASSWORD = 'change-password',
}

export enum ResultPaths {
    LOGIN_ERR = 'error-login',
    REGISTRATION_SUCCESS = 'success',
    REGISTRATION_ERR = 'error',
    REGISTRATION_ERR_409 = 'error-user-exist',
    CHECK_EMAIL_ERR = 'error-check-email',
    CHECK_EMAIL_ERR_404 = 'error-check-email-no-exist',
    CHANGE_PASSWORD_SUCCESS = 'success-change-password',
    CHANGE_PASSWORD_ERR = 'error-change-password',
}
