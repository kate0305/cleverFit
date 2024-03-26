import { Form, Input } from 'antd';

import { EMAIL_PATTERN } from '@constants/index';

export type EmailInputProps = {
    inputName: string;
    dataTestId?: string;
};

export const EmailInput = ({ inputName, dataTestId }: EmailInputProps) => (
    <Form.Item
        name={inputName}
        rules={[
            { required: true, message: '' },
            { pattern: EMAIL_PATTERN, message: '' },
        ]}
    >
        <Input addonBefore='e-mail:' data-test-id={dataTestId} autoComplete='email' />
    </Form.Item>
);
