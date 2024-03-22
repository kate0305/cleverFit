import { useEffect, useState } from 'react';
import { Form, FormInstance } from 'antd';

import { PrimaryBtn } from '@components/buttons/primary-button';

import styles from './sign-up-form.module.scss';

export const SubmitButton = (prop: { form: FormInstance }) => {
    const values = Form.useWatch([], prop.form);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

    useEffect(() => {
        prop.form
            .validateFields({ validateOnly: true })
            .then(() => {
                setIsSubmitDisabled(false);
            })
            .catch(() => {
                const isTouched = prop.form.isFieldsTouched();

                if (isTouched) setIsSubmitDisabled(true);
            });
    }, [prop.form, values]);

    return (
        <PrimaryBtn
            type='primary'
            htmlType='submit'
            btnText='Войти'
            disabled={isSubmitDisabled}
            className={styles.btn}
            dataTestId='registration-submit-button'
        />
    );
};
