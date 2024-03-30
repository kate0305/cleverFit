import { Form, Input } from 'antd';

export type TextInputProps = {
    inputName: string;
    placeholder: string;
    dataTestId?: string;
    className?: string;
};

export const TextInput = ({ inputName, placeholder, dataTestId, className }: TextInputProps) => (
    <Form.Item name={inputName}>
        <Input placeholder={placeholder} data-test-id={dataTestId} className={className} />
    </Form.Item>
);
