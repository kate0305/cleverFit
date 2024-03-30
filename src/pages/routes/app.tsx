import { Fragment, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HistoryRouter } from 'redux-first-history/rr6';
import { history } from '@redux/configure-store';
import { selectIsLoading } from '@redux/redusers/app-slice';

import { useAppSelector } from '@hooks/index';
import { AuthPaths, Paths, ResultPaths } from '@type/paths';
import { ResultRequestKeys } from '@type/result-request-keys';

import { NotFoundPage } from '@pages/not-found-page';
import { ProfilePage } from '@pages/profile-page';
import { SettingsPage } from '@pages/settings-page';
import { ChangePasswordForm } from '@components/form/change-password-form';
import { ConfirmEmailForm } from '@components/form/confirm-email-form';
import { AuthLayout } from '@components/layouts/auth-layout';
import { MainLayout } from '@components/layouts/main-layout';
import { Loader } from '@components/loader';
import { RequestResult } from '@components/request-result/request-result';

import { AuthPage, CalendarPage, FeedbacksPage, PrivateRoute, PublicRoute } from '..';

const MainPage = lazy(() => import('..'));

export const App = () => {
    const isLoading = useAppSelector(selectIsLoading);

    return (
        <Fragment>
            <HistoryRouter history={history}>
                <Routes>
                    <Route
                        path={Paths.HOME}
                        element={
                            <PrivateRoute>
                                <MainLayout withHeader={true}/>
                            </PrivateRoute>
                        }
                    >
                        <Route index={true} element={<Navigate to={Paths.MAIN} replace={true} />} />
                        <Route path={Paths.MAIN} element={<MainPage />} />
                        <Route path={Paths.FEEDBACKS} element={<FeedbacksPage />} />
                        <Route path={Paths.CALENDAR} element={<CalendarPage />} />
                        <Route path={Paths.PROFILE} element={<ProfilePage />} />
                        <Route path={Paths.SETTINGS} element={<SettingsPage />} />
                    </Route>
                    <Route
                        path={Paths.AUTH}
                        element={
                            <PublicRoute>
                                <AuthLayout />
                            </PublicRoute>
                        }
                    >
                        <Route index={true} element={<AuthPage />} />
                        <Route path={AuthPaths.REGISTRATION} element={<AuthPage />} />
                        <Route path={AuthPaths.CONFIRM_EMAIL} element={<ConfirmEmailForm />} />
                        <Route path={AuthPaths.CHANGE_PASSWORD} element={<ChangePasswordForm />} />
                    </Route>
                    <Route path={Paths.RESULT} element={<AuthLayout />}>
                        <Route
                            path={ResultPaths.REGISTRATION_SUCCESS}
                            element={<RequestResult keyErr={ResultRequestKeys.SIGN_UP_SUCCESS} />}
                        />
                        <Route
                            path={ResultPaths.REGISTRATION_ERR}
                            element={<RequestResult keyErr={ResultRequestKeys.SIGN_UP_ERR} />}
                        />
                        <Route
                            path={ResultPaths.REGISTRATION_ERR_409}
                            element={<RequestResult keyErr={ResultRequestKeys.SIGN_UP_ERR_409} />}
                        />
                        <Route
                            path={ResultPaths.LOGIN_ERR}
                            element={<RequestResult keyErr={ResultRequestKeys.SIGN_IN_ERR} />}
                        />
                        <Route
                            path={ResultPaths.CHECK_EMAIL_ERR}
                            element={<RequestResult keyErr={ResultRequestKeys.CHECK_EMAIL_ERR} />}
                        />
                        <Route
                            path={ResultPaths.CHECK_EMAIL_ERR_404}
                            element={
                                <RequestResult keyErr={ResultRequestKeys.CHECK_EMAIL_ERR_404} />
                            }
                        />
                        <Route
                            path={ResultPaths.CHANGE_PASSWORD_SUCCESS}
                            element={
                                <RequestResult keyErr={ResultRequestKeys.CHANGE_PASSWORD_SUCCESS} />
                            }
                        />
                        <Route
                            path={ResultPaths.CHANGE_PASSWORD_ERR}
                            element={
                                <RequestResult keyErr={ResultRequestKeys.CHANGE_PASSWORD_ERR} />
                            }
                        />
                    </Route>
                    <Route element={<MainLayout withHeader={false} />}>
                        <Route path={Paths.NOT_FOUND} element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </HistoryRouter>
            {isLoading && <Loader />}
        </Fragment>
    );
};
