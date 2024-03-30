import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Checkbox, Form } from 'antd';
import { selectUserEmail, setEmail, setToken } from '@redux/redusers/user-data-slice';

import { CHECK_EMAIL_ERR, CHECK_EMAIL_ERR_404, CONFIRM_EMAIL, LOGIN_ERR } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useCheckEmailMutation, useSignInUserMutation } from '@services/auth-service';
import { SingInFormData } from '@type/auth';
import { Paths } from '@type/paths';
import { StatusCode } from '@type/status-code';
import { errorHandler } from '@utils/error-handler';
import { useLocalStorage } from '@utils/use-local-storage';

import { GoogleAuthBtn } from '@components/buttons/google-auth-button';
import { PrimaryBtn } from '@components/buttons/primary-button';
import { EmailInput } from '@components/inputs/email-input';
import { PasswordInput } from '@components/inputs/password-input';

import styles from './sign-in-form.module.scss';

export const SignInForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [isForgotDisabled, setIsForgotDisabled] = useState(false);
    const [, setLocalStorageItem] = useLocalStorage('token', '');
    const userEmail = useAppSelector(selectUserEmail);
    const [signInUser, { data: userLoginData, isError, isSuccess }] = useSignInUserMutation();
    const [checkEmail] = useCheckEmailMutation();
    const [form] = Form.useForm<SingInFormData>();
    const fromError = location.state && location.state.fromErr;

    const onSubmit = async (values: SingInFormData) => {
        const { email, password, remember } = values;

        setIsChecked(remember);
        await signInUser({ email, password });
    };

    const handleCheckEmail = useCallback(
        async (email: string) => {
            try {
                await checkEmail({ email }).unwrap();
                navigate(CONFIRM_EMAIL, {
                    state: { fromLogin: true },
                });
            } catch (e) {
                const err = errorHandler(e);

                if (typeof err === 'string' || !err) return;

                const { errStatus, errMsg } = err;

                if (errStatus === StatusCode.NOT_FOUND && errMsg.includes('Email не найден')) {
                    navigate(CHECK_EMAIL_ERR_404, { state: { fromServer: true } });
                } else
                    navigate(CHECK_EMAIL_ERR, {
                        state: { fromServer: true },
                    });
            }
        },
        [checkEmail, navigate],
    );

    const validateEmail = async () => {
        try {
            const { email } = await form.validateFields(['email']);

            return email;
        } catch {
            return setIsForgotDisabled(true);
        }
    };

    const handleForgotPassword = async () => {
        const email = await validateEmail();

        if (email) {
            const emailValue = form.getFieldValue('email');

            dispatch(setEmail(emailValue));
            await handleCheckEmail(emailValue);
        }
    };

    const onFormValuesChange = (changedValues: SingInFormData) => {
        const formFieldName = Object.keys(changedValues)[0];

        if (formFieldName === 'email') {
            setIsForgotDisabled(false);
        }
    };

    useEffect(() => {
        if (fromError && userEmail) {
            handleCheckEmail(userEmail);
        }
    }, [fromError, handleCheckEmail, userEmail]);

    useEffect(() => {
        if (isSuccess) {
            if (!userLoginData) return;

            const { accessToken } = userLoginData;

            dispatch(setToken(accessToken));
            if (isChecked) setLocalStorageItem(accessToken);
            navigate(Paths.MAIN);
        }
        if (isError) {
            navigate(LOGIN_ERR, {
                state: { fromServer: true },
            });
        }
    }, [userLoginData, dispatch, isChecked, isError, isSuccess, navigate, setLocalStorageItem]);

    return (
        <React.Fragment>
            <Form
                name='sign-in'
                form={form}
                className={styles.form}
                onValuesChange={onFormValuesChange}
                onFinish={onSubmit}
            >
                <EmailInput inputName='email' dataTestId='login-email' />

                <PasswordInput
                    inputName='password'
                    validateTrigger='onSubmit'
                    withHelp={false}
                    required={true}
                    dataTestId='login-password'
                />
                <Form.Item>
                    <Form.Item name='remember' valuePropName='checked' noStyle={true}>
                        <Checkbox data-test-id='login-remember'>Запомнить меня</Checkbox>
                    </Form.Item>

                    <PrimaryBtn
                        type='link'
                        htmlType='button'
                        btnText='Забыли пароль?'
                        className={styles.forgot_btn}
                        disabled={isForgotDisabled}
                        onClick={handleForgotPassword}
                        dataTestId='login-forgot-button'
                    />
                </Form.Item>

                <Form.Item>
                    <PrimaryBtn
                        type='primary'
                        htmlType='submit'
                        btnText='Войти'
                        className={styles.sign_in_btn}
                        dataTestId='login-submit-button'
                    />
                </Form.Item>
            </Form>
            <GoogleAuthBtn />
        </React.Fragment>
    );
};
