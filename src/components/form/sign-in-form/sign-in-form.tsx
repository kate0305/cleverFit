import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Checkbox, Form, Input } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';

import { selectUserEmail, setEmail, setToken } from '@redux/redusers/user-data-slice';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useCheckEmailMutation, useSignInUserMutation } from '@services/clever-fit-service';

import { errorHandler } from '@utils/error-handler';
import { useLocalStorage } from '@utils/use-local-storage';

import { SingInFormData } from '@type/auth';
import { Paths } from '@type/paths';
import { StatusCode } from '@type/status-code';
import {
    BASE_URL,
    CHECK_EMAIL_ERR,
    CHECK_EMAIL_ERR_404,
    CONFIRM_EMAIL,
    GOOGLE_AUTH,
    LOGIN_ERR,
} from '@constants/index';

import { PrimaryBtn } from '@components/buttons/primary-button';

import styles from './sign-in-form.module.scss';

export const SignInForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [isForgotDisabled, setIsForgotDisabled] = useState(false);
    const [, setLocalStorageItem] = useLocalStorage('token', '');
    const userEmail = useAppSelector(selectUserEmail);
    const [signInUser, { data, isError, isSuccess }] = useSignInUserMutation();
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
                if (typeof err !== 'string' && err) {
                    const { errStatus, errMsg } = err;

                    errStatus === StatusCode.NOT_FOUND && errMsg.includes('Email не найден')
                        ? navigate(CHECK_EMAIL_ERR_404, {
                              state: { fromServer: true },
                          })
                        : navigate(CHECK_EMAIL_ERR, {
                              state: { fromServer: true },
                          });
                }
            }
        },
        [checkEmail, navigate],
    );

    const validateEmail = async () => {
        try {
            const { email } = await form.validateFields(['email']);
            return email;
        } catch {
            setIsForgotDisabled(true);
        }
    };

    const handleForgotPassword = async () => {
        const email = await validateEmail();
        if (email) {
            const email = form.getFieldValue('email');
            dispatch(setEmail(email));
            await handleCheckEmail(email);
        }
    };

    const onFormValuesChange = (changedValues: SingInFormData) => {
        const formFieldName = Object.keys(changedValues)[0];
        if (formFieldName === 'email') {
            setIsForgotDisabled(false);
        }
    };

    const goToGoogleAuth = () => (window.location.href = `${BASE_URL}${GOOGLE_AUTH}`);

    useEffect(() => {
        if (fromError && userEmail) {
            handleCheckEmail(userEmail);
        }
    }, [fromError, handleCheckEmail, userEmail]);

    useEffect(() => {
        if (isSuccess) {
            if (data) {
                const { accessToken } = data;
                dispatch(setToken(accessToken));
                isChecked && setLocalStorageItem(accessToken);
                navigate(Paths.MAIN);
            }
        }
        if (isError) {
            navigate(LOGIN_ERR, {
                state: { fromServer: true },
            });
        }
    }, [data, dispatch, isChecked, isError, isSuccess, navigate, setLocalStorageItem]);

    return (
        <>
            <Form
                name='sign-in'
                form={form}
                className={styles.form}
                onValuesChange={onFormValuesChange}
                onFinish={onSubmit}
            >
                <Form.Item
                    name='email'
                    rules={[
                        { required: true, message: '' },
                        { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '' },
                    ]}
                >
                    <Input addonBefore='e-mail:' data-test-id='login-email' autoComplete='email' />
                </Form.Item>
                <Form.Item
                    name='password'
                    validateTrigger='onSubmit'
                    rules={[
                        { required: true, message: '' },
                        { pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}/, message: '' },
                    ]}
                >
                    <Input.Password
                        placeholder='Пароль'
                        data-test-id='login-password'
                        autoComplete='new-password'
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name='remember' valuePropName='checked' noStyle>
                        <Checkbox data-test-id='login-remember'>Запомнить меня</Checkbox>
                    </Form.Item>

                    <PrimaryBtn
                        type='link'
                        htmlType='button'
                        btnText='Забыли пароль?'
                        className='forgot'
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
                        className='btn'
                        dataTestId='login-submit-button'
                    />
                </Form.Item>
            </Form>
            <PrimaryBtn
                type='default'
                icon={<GooglePlusOutlined />}
                htmlType='button'
                btnText='Войти через Google'
                className='google'
                onClick={goToGoogleAuth}
            />
        </>
    );
};
