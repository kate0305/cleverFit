import React, { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';

import { selectUserData, setSignUpData } from '@redux/redusers/user-data-slice';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { useSignUpUserMutation } from '@services/clever-fit-service';

import { errorHandler } from '@utils/error-handler';

import { UserReq } from '@type/service';
import { StatusCode } from '@type/status-code';
import { REGISTRATION_ERR, REGISTRATION_ERR_409, REGISTRATION_SUCCESS } from '@constants/index';

import { PrimaryBtn } from '@components/buttons/primary-button';

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

    const handleSignUpUser = useCallback(
        async (values: UserReq) => await signUpUser(values),
        [signUpUser],
    );

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
            if (typeof err !== 'string' && err) {
                const { errStatus } = err;
                errStatus === StatusCode.CONFLICT
                    ? navigate(REGISTRATION_ERR_409, {
                          state: { fromServer: true },
                      })
                    : navigate(REGISTRATION_ERR, {
                          state: { fromServer: true },
                      });
            }
        }
    }, [error, fromError, handleSignUpUser, isSuccess, navigate, userData]);

    return (
        <>
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
            <PrimaryBtn
                type='default'
                icon={<GooglePlusOutlined />}
                htmlType='button'
                btnText='Регистрация через Google'
                className='google_reg'
            />
        </>
    );
};
