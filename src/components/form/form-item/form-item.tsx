import { ReactNode } from 'react';
import { Form } from 'antd';
import { Rule } from 'antd/lib/form';

export type FormItemProps = {
    name?: string;
    rules?: Rule[];
    help?: ReactNode;
    dependencies?: string[];
    valuePropName?: string;
    noStyle?: boolean;
    children?: ReactNode;
};

export const FormItem = ({
    name,
    rules,
    help,
    dependencies,
    valuePropName,
    noStyle,
    children,
}: FormItemProps) => (
    <Form.Item
        name={name}
        rules={rules}
        dependencies={dependencies}
        help={help}
        valuePropName={valuePropName}
        noStyle={noStyle}
    >
        {children}
    </Form.Item>
);
