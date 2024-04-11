import { useEffect, useState } from 'react';
import { Form } from 'antd';

import { useUpdateUserDataMutation } from '@services/user-service';
import { AlertMessage } from '@type/alert-message';
import { ModalErrTypes } from '@type/modal-types';
import { UserDataReq } from '@type/service';
import { UserFormData } from '@type/user';

import { AlertComponent } from '@components/alert';
import { ProfileForm } from '@components/form/profile-form';
import { getModalErr } from '@components/modal-window/modal-err/modal-err';

import styles from './profile-page.module.scss';

export const ProfilePage = () => {
    const [form] = Form.useForm<UserFormData>();
    const [isShowAlert, setShowAlert] = useState(false);

    const [updateUserData, { isError, isSuccess }] = useUpdateUserDataMutation();

    const closeAlert = () => setShowAlert(false);

    const updateData = async (values: UserDataReq) => {
        await updateUserData(values);
        form.resetFields();
    };

    useEffect(() => {
        if (isError) {
            getModalErr(ModalErrTypes.UPDATE_USER_DATA);
        }

        if (isSuccess) {
            setShowAlert(true);
        }
    }, [isError, isSuccess]);

    return (
        <main className={styles.wrapper}>
            <ProfileForm updateData={updateData} form={form} />
            {isShowAlert && (
                <AlertComponent message={AlertMessage.UPDATE_PROFILE} onClose={closeAlert} />
            )}
        </main>
    );
};
