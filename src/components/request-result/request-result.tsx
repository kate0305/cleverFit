import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Result } from 'antd';

import { Paths } from '@type/paths';
import { ResultRequestKeys } from '@type/result-request-keys';

import { LinkButton } from '@components/buttons/link-button';

import { RequestResultData, RequestResultKeys } from './data';

import styles from './request-result.module.scss';

export type RequestResultProps = {
    keyErr: keyof RequestResultKeys;
    buttonsGroup?: ReactNode;
};

export const RequestResult = ({ keyErr, buttonsGroup }: RequestResultProps) => {
    const location = useLocation();
    const isFeedbackPage =
        location.pathname === Paths.FEEDBACKS || location.pathname === Paths.MAIN;
    const fromError = location.state && (location.state.fromErr || location.state.fromServer);
    const isShowResult = isFeedbackPage || fromError;
    const { status, title, message, btnText, navigateTo, state, dataTestId } =
        RequestResultData[keyErr];

    const isClassNameForErr500 =
        keyErr === ResultRequestKeys.CHECK_EMAIL_ERR ||
        keyErr === ResultRequestKeys.CHECK_EMAIL_ERR_404 ||
        keyErr === ResultRequestKeys.GET_FEEDBACK_ERR;

    const button = (
        <LinkButton
            to={navigateTo ?? ''}
            text={btnText}
            className={isClassNameForErr500 ? styles.err_500_btn : styles.btn}
            state={state}
            dataTestId={dataTestId}
        />
    );

    return isShowResult ? (
        <div className={isClassNameForErr500 ? styles.wrapper_err_500 : styles.wrapper}>
            <div className={isClassNameForErr500 ? styles.err_500 : styles.container}>
                <Result
                    status={status}
                    title={title}
                    subTitle={message}
                    extra={buttonsGroup || button}
                    className={
                        keyErr === ResultRequestKeys.CHECK_EMAIL_ERR_404
                            ? styles.result_err_confirm
                            : styles.result
                    }
                />
            </div>
        </div>
    ) : (
        <Navigate to={Paths.AUTH} replace={true} />
    );
};
