import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Form, Input, Typography } from 'antd';
import { Rule } from 'antd/lib/form';
import { selectChangePasswordData, setChangePasswordData } from '@redux/redusers/user-data-slice';

import { DATA_TEST_ID } from '@constants/data-test-id';
import { CHANGE_PASSWORD_ERR, CHANGE_PASSWORD_SUCCESS } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { useChangePasswordMutation } from '@services/auth-service';
import { Paths } from '@type/paths';
import { ChangePasswordReq } from '@type/service';

import { PrimaryBtn } from '@components/buttons/primary-button';

import styles from './change-password-form.module.scss';

const { Title } = Typography;

export const ChangePasswordForm: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isBtnDisable, setBtnDisable] = useState(false);
    const [form] = Form.useForm<ChangePasswordReq>();
    const changePasswordData = useAppSelector(selectChangePasswordData);
    const [changePassword, { error, isSuccess }] = useChangePasswordMutation();

    const fromError = location.state && location.state.fromErr;
    const fromConfirm = location.state && location.state.fromConfirm;

    const validateConfirmPassword = async (_: Rule, value: string) => {
        if (!value || form.getFieldValue('password') === value) {
            setBtnDisable(false);

            return Promise.resolve();
        }
        setBtnDisable(true);

        return Promise.reject(new Error('Пароли не совпадают'));
    };

    const onSubmit = async (values: ChangePasswordReq) => {
        dispatch(setChangePasswordData(values));
        await changePassword(values);
    };

    useEffect(() => {
        if (fromError && changePasswordData) {
            changePassword(changePasswordData);
        }
        if (isSuccess) {
            navigate(CHANGE_PASSWORD_SUCCESS, {
                state: { fromServer: true },
            });
        }
        if (error) {
            navigate(CHANGE_PASSWORD_ERR, {
                state: { fromServer: true },
            });
        }
    }, [changePassword, changePasswordData, error, fromError, isSuccess, navigate]);

    return fromConfirm || fromError ? (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Title className={styles.title}>Восстановление аккауанта</Title>
                <Form name='sign-up' className={styles.form} form={form} onFinish={onSubmit}>
                    <Form.Item
                        name='password'
                        help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                        rules={[
                            { required: true, message: '' },
                            {
                                pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}/,
                                message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder='Новый пароль'
                            data-test-id={DATA_TEST_ID.changePassword}
                            autoComplete='new-password'
                        />
                    </Form.Item>
                    <Form.Item
                        name='confirmPassword'
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: '',
                            },
                            { validator: validateConfirmPassword },
                        ]}
                    >
                        <Input.Password
                            placeholder='Повторите пароль'
                            data-test-id={DATA_TEST_ID.changeConformPassword}
                            autoComplete='off'
                        />
                    </Form.Item>

                    <Form.Item>
                        <PrimaryBtn
                            type='primary'
                            disabled={isBtnDisable}
                            htmlType='submit'
                            btnText='Сохранить'
                            className={styles.btn_change_password}
                            dataTestId={DATA_TEST_ID.changeSubmitBtn}
                        />
                    </Form.Item>
                </Form>
            </div>
        </div>
    ) : (
        <Navigate to={Paths.AUTH} />
    );
};
