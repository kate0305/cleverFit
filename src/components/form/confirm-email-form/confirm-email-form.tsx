import { Fragment, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Result } from 'antd';
import { selectUserEmail } from '@redux/redusers/user-data-slice';

import { CHANGE_PASSWORD } from '@constants/index';
import { useAppSelector } from '@hooks/index';
import { useConfirmEmailMutation } from '@services/auth-service';
import { Paths } from '@type/paths';

import { VerificationCodeInput } from '@components/inputs/verification-input';

import styles from './confirm-email-form.module.scss';

export const ConfirmEmailForm = () => {
    const navigate = useNavigate();
    const userEmail = useAppSelector(selectUserEmail);
    const location = useLocation();
    const [confirmEmail, { isError, isSuccess }] = useConfirmEmailMutation();
    const fromLogin = location.state && location.state.fromLogin;

    const onComplete = async (code: string) => {
        const email = userEmail ?? '';
        const reqData = { email, code };

        await confirmEmail(reqData);
    };

    useEffect(() => {
        if (isSuccess) {
            navigate(CHANGE_PASSWORD, {
                state: { fromConfirm: true },
            });
        }
    }, [isSuccess, navigate]);

    const title = (
        <p className={styles.message}>
            Введите код <br /> для восстановления аккауанта
        </p>
    );

    const errTitle = (
        <p className={styles.message}>
            Неверный код. Введите код <br />
            для восстановления аккауанта
        </p>
    );

    return fromLogin ? (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Result
                    status={isError ? 'error' : 'info'}
                    title={isError ? errTitle : title}
                    subTitle={
                        <Fragment>
                            <p className={styles.message}>
                                Мы отправили вам на e-mail{' '}
                                <span className={styles.email}>{userEmail}</span>
                            </p>
                            <p className={styles.message}>
                                шестизначный код. Введите его в поле ниже.
                            </p>
                        </Fragment>
                    }
                    className={styles.result}
                />
                <VerificationCodeInput onComplete={onComplete} isError={isError} />
                <p className={styles.footer}>Не пришло письмо? Проверьте папку Спам.</p>
            </div>
        </div>
    ) : (
        <Navigate to={Paths.AUTH} />
    );
};
