import { Navigate, useLocation } from 'react-router-dom';
import { Result } from 'antd';

import { Paths } from '@type/paths';
import { ResultRequestKeys } from '@type/result-request-keys';

import { LinkButton } from '@components/buttons/link-button';

import { RequestResultData, RequestResultKeys } from './data';

import styles from './request-result.module.scss';

export type RequestResultProps = {
    keyErr: keyof RequestResultKeys;
};

export const RequestResult = ({ keyErr }: RequestResultProps) => {
    const location = useLocation();
    const fromError = location.state && (location.state.fromErr || location.state.fromServer);
    const { status, title, message, btnText, navigateTo, state, dataTestId } =
        RequestResultData[keyErr];

    const button = (
        <LinkButton
            to={navigateTo}
            text={btnText}
            className={
                keyErr === ResultRequestKeys.CHECK_EMAIL_ERR ||
                keyErr === ResultRequestKeys.CHECK_EMAIL_ERR_404
                    ? styles.err_500_btn
                    : styles.btn
            }
            state={state}
            dataTestId={dataTestId}
        />
    );

    return (
        <>
            {fromError ? (
                <div
                    className={
                        keyErr === ResultRequestKeys.CHECK_EMAIL_ERR ||
                        keyErr === ResultRequestKeys.CHECK_EMAIL_ERR_404
                            ? styles.wrapper_err_500
                            : styles.wrapper
                    }
                >
                    <div
                        className={
                            keyErr === ResultRequestKeys.CHECK_EMAIL_ERR ||
                            keyErr === ResultRequestKeys.CHECK_EMAIL_ERR_404
                                ? styles.err_500
                                : styles.container
                        }
                    >
                        <Result
                            status={status}
                            title={title}
                            subTitle={message}
                            extra={button}
                            className={
                                keyErr === ResultRequestKeys.CHECK_EMAIL_ERR_404
                                    ? styles.result_err_confirm
                                    : styles.result
                            }
                        />
                    </div>
                </div>
            ) : (
                <Navigate to={Paths.AUTH} replace />
            )}
        </>
    );
};
