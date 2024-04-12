import { Input } from 'antd';

import { DATA_TEST_ID } from '@constants/data-test-id';

import { FormItemProps } from '../form-item/form-item';

type SignUpFormFild = FormItemProps & {
    id: string;
};

export const signUpFormFildsData: SignUpFormFild[] = [
    {
        id: '1',
        name: 'email',
        rules: [
            { required: true, message: '' },
            { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '' },
        ],
        children: (
            <Input
                addonBefore='e-mail:'
                data-test-id={DATA_TEST_ID.registrationEmail}
                autoComplete='email'
            />
        ),
    },
    {
        id: '2',
        name: 'password',
        help: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
        rules: [
            { required: true, message: '' },
            {
                pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}/,
                message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
            },
        ],
        children: (
            <Input.Password
                placeholder='Пароль'
                data-test-id={DATA_TEST_ID.registrationPassword}
                autoComplete='new-password'
            />
        ),
    },
    {
        id: '3',
        name: 'confirmPassword',
        dependencies: ['password'],
        rules: [
            {
                required: true,
                message: '',
            },
            ({ getFieldValue }) => ({
                validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }

                    return Promise.reject(new Error('Пароли не совпадают'));
                },
            }),
        ],
        children: (
            <Input.Password
                placeholder='Повторите пароль'
                data-test-id={DATA_TEST_ID.registrationConfirmPassword}
                autoComplete='off'
            />
        ),
    },
];
