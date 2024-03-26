import { Form, Input } from 'antd';

import { PASSWORD_PATTERN } from '@constants/index';

export type PasswordInputProps = {
    inputName: string;
    required: boolean;
    validateTrigger?: string;
    withHelp?: boolean;
    placeholder?: string;
    dataTestId?: string;
};

export const PasswordInput = ({
    inputName,
    required,
    validateTrigger,
    withHelp,
    placeholder,
    dataTestId,
}: PasswordInputProps) => (
    <Form.Item
        name={inputName}
        validateTrigger={validateTrigger}
        help={withHelp && 'Пароль не менее 8 символов, с заглавной буквой и\u00A0цифрой'}
        rules={[
            { required, message: '' },
            {
                pattern: PASSWORD_PATTERN,
                message: '',
            },
        ]}
    >
        <Input.Password
            placeholder={placeholder || 'Пароль'}
            data-test-id={dataTestId}
            autoComplete='new-password'
        />
    </Form.Item>
);

