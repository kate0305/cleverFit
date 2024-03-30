import { Link } from 'react-router-dom';
import { Result } from 'antd';

import { Paths } from '@type/paths';

import styles from './not-found-page.module.scss';

export const NotFoundPage = () => (
    <main className={styles.wrapper}>
        <Result
            status='404'
            title='Такой страницы нет'
            subTitle='Извините, страница не найдена, возможно, она&nbsp;была удалена или перемещена.'
            extra={
                <Link to={Paths.MAIN} className={styles.btn}>
                    На главную
                </Link>
            }
            className={styles.result}
        />
    </main>
);
