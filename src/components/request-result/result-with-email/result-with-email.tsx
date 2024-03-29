import { Result } from 'antd';

import styles from './result-with-email.module.scss';

export type RequestResultProps = {
    email?: string;
};

export const ResultWithEmail = ({ email }: RequestResultProps) => (
    <div className={styles.wrapper}>
        <div className={styles.container}>
            <Result
                status='success'
                title='Чек для оплаты у&nbsp;вас&nbsp;на почте'
                subTitle={
                    <p className={styles.message}>
                        Мы отправили инструкцию для оплаты вам на e-mail
                        <span className={styles.email}> {email}. </span>
                        После подтверждения оплаты войдите в&nbsp;приложение заново.
                    </p>
                }
                className={styles.result}
            />
            <p className={styles.footer}>Не пришло письмо? Проверьте папку Спам.</p>
        </div>
    </div>
);
