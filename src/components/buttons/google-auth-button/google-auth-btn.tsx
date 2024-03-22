import { GooglePlusOutlined } from '@ant-design/icons';
import { BASE_URL, GOOGLE_AUTH } from '@constants/index';

import { PrimaryBtn } from '../primary-button';

import styles from './google-auth-btn.module.scss';

export const GoogleAuthBtn = (props: { isSignUpForm?: boolean }) => {
    const goToGoogleAuth = () => {
        window.location.href = `${BASE_URL}${GOOGLE_AUTH}`;
    };

    return (
        <PrimaryBtn
            type='default'
            icon={<GooglePlusOutlined />}
            htmlType='button'
            btnText={props.isSignUpForm ? 'Регистрация через Google' : 'Войти через Google'}
            className={props.isSignUpForm ? styles.google_reg : styles.google}
            onClick={goToGoogleAuth}
        />
    );
};
