import { useState } from 'react';
import { Form, FormInstance } from 'antd';
import dayjs from 'dayjs';
import { selectUserData } from '@redux/redusers/user-data-slice';

import { useAppSelector } from '@hooks/index';
import { UserDataReq } from '@type/service';
import { UserFormData } from '@type/user';
import { getAvatarSrc } from '@utils/get-avatar-src';

import { PrimaryBtn } from '@components/buttons/primary-button';
import { ConfirmPasswordInput } from '@components/inputs/confirm-password-input';
import { DatePickerInput } from '@components/inputs/datepicker-input';
import { EmailInput } from '@components/inputs/email-input';
import { PasswordInput } from '@components/inputs/password-input';
import { TextInput } from '@components/inputs/text-input';
import { UploadInput } from '@components/inputs/upload-input';

import styles from './profile-form.module.scss';

type ProfileFormProps = {
    form: FormInstance<UserFormData>;
    updateData: (values: UserDataReq) => Promise<void>;
};

export const ProfileForm = ({ updateData, form }: ProfileFormProps) => {
    const userData = useAppSelector(selectUserData);
    const imgUrl = userData?.imgSrc;
    const initialBirthday = userData?.birthday && dayjs(userData?.birthday);

    const [isSubmitBtnDisabled, setSubmitBtnDisabled] = useState(true);
    const [isHavePasswordValue, setPasswordValue] = useState(false);

    const onFormValuesChange = (changedValues: UserFormData) => {
        const formFieldName = Object.keys(changedValues)[0];

        if (formFieldName === 'password') {
            setPasswordValue(true);
        }
        setSubmitBtnDisabled(false);
    };

    const onSubmit = async (values: UserFormData) => {
        const stringBD = values.birthday && dayjs(values.birthday).toISOString();
        const src = values.imgSrc && getAvatarSrc(values.imgSrc);
        const reqData = {
            ...values,
            birthday: stringBD,
            imgSrc: src,
        };

        await updateData(reqData);
        setSubmitBtnDisabled(true);
        setPasswordValue(false);
    };

    return (
        <Form
            name='profile'
            className={styles.form}
            form={form}
            onFinish={onSubmit}
            onValuesChange={onFormValuesChange}
            size='large'
            initialValues={{
                ...userData,
                birthday: initialBirthday,
            }}
        >
            <fieldset className={styles.info_wrapper}>
                <legend className={styles.title}>Личная информация</legend>
                <div className={styles.inputs_container}>
                    <UploadInput
                        inputName='imgSrc'
                        imgUrl={imgUrl}
                        setBtnDisable={setSubmitBtnDisabled}
                        dataTestId='profile-avatar'
                    />
                    <div className={styles.inputs_column}>
                        <TextInput
                            inputName='firstName'
                            placeholder='Имя'
                            dataTestId='profile-name'
                        />
                        <TextInput
                            inputName='lastName'
                            placeholder='Фамилия'
                            dataTestId='profile-surname'
                        />
                        <DatePickerInput inputName='birthday' dataTestId='profile-birthday' />
                    </div>
                </div>
            </fieldset>
            <fieldset className={styles.auth_wrapper}>
                <legend className={styles.title}>Приватность и авторизация</legend>
                <div>
                    <EmailInput inputName='email' dataTestId='profile-email' />
                    <PasswordInput
                        inputName='password'
                        withHelp={true}
                        required={isHavePasswordValue}
                        dataTestId='profile-password'
                    />
                    <ConfirmPasswordInput
                        inputName='confirmPassword'
                        required={isHavePasswordValue}
                        dataTestId='profile-repeat-password'
                    />
                </div>
            </fieldset>
            <Form.Item className={styles.submit_btn}>
                <PrimaryBtn
                    type='primary'
                    htmlType='submit'
                    btnText='Сохранить изменения'
                    disabled={isSubmitBtnDisabled}
                    className={styles.btn}
                    dataTestId='profile-submit'
                />
            </Form.Item>
        </Form>
    );
};
