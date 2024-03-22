import React, { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form } from 'antd';
import { selectUserData, setSignUpData } from '@redux/redusers/user-data-slice';

import { REGISTRATION_ERR, REGISTRATION_ERR_409, REGISTRATION_SUCCESS } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { useSignUpUserMutation } from '@services/auth-service';
import { UserReq } from '@type/service';
import { StatusCode } from '@type/status-code';
import { errorHandler } from '@utils/error-handler';

import { GoogleAuthBtn } from '@components/buttons/google-auth-button';

import { FormItem } from '../form-item';

import { signUpFormFildsData } from './data';
import { SubmitButton } from './submit-button';

import styles from './sign-up-form.module.scss';

export const SignUpForm: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [form] = Form.useForm<UserReq>();
    const userData = useAppSelector(selectUserData);
    const [signUpUser, { error, isSuccess }] = useSignUpUserMutation();

    const fromError = location.state && location.state.fromErr;

    const handleSignUpUser = useCallback((values: UserReq) => signUpUser(values), [signUpUser]);

    const onSubmit = async (values: UserReq) => {
        dispatch(setSignUpData(values));
        await signUpUser(values);
    };

    useEffect(() => {
        if (fromError && userData) {
            handleSignUpUser(userData);
        }
        if (isSuccess) {
            navigate(REGISTRATION_SUCCESS, {
                state: { fromServer: true },
            });
        }
        if (error) {
            const err = errorHandler(error);

            if (typeof err === 'string' || !err) return;

            const { errStatus } = err;

            if (errStatus === StatusCode.CONFLICT)
                navigate(REGISTRATION_ERR_409, {
                    state: { fromServer: true },
                });
            else
                navigate(REGISTRATION_ERR, {
                    state: { fromServer: true },
                });
        }
    }, [error, fromError, handleSignUpUser, isSuccess, navigate, userData]);

    return (
        <React.Fragment>
            <Form name='sign-up' className={styles.form} form={form} onFinish={onSubmit}>
                {signUpFormFildsData.map(({ id, name, rules, help, dependencies, children }) => (
                    <FormItem
                        key={id}
                        name={name}
                        rules={rules}
                        help={help}
                        dependencies={dependencies}
                    >
                        {children}
                    </FormItem>
                ))}
                <Form.Item>
                    <SubmitButton form={form} />
                </Form.Item>
            </Form>
            <GoogleAuthBtn isSignUpForm={true} />
        </React.Fragment>
    );
};
