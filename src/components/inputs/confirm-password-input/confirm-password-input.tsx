import { Form, Input } from 'antd';

import { CONFIRM_PASSWORD_ERR } from '@constants/index';

export type ConfirmPasswordInputProps = {
    inputName: string;
    required: boolean;
    placeholder?: string;
    dataTestId?: string;
};

export const ConfirmPasswordInput = ({
    inputName,
    required,
    placeholder,
    dataTestId,
}: ConfirmPasswordInputProps) => (
    <Form.Item
        name={inputName}
        dependencies={['password']}
        rules={[
            {
                required,
                message: '',
            },
            ({ getFieldValue }) => ({
                validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }

                    return Promise.reject(new Error(CONFIRM_PASSWORD_ERR));
                },
            }),
        ]}
    >
        <Input.Password
            placeholder={placeholder || 'Повторите пароль'}
            data-test-id={dataTestId}
            autoComplete='off'
        />
    </Form.Item>
);

