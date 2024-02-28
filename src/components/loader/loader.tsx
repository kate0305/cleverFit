import Lottie from 'lottie-react';
import loader from './loader.json';
import styles from './loader.module.scss';

export const Loader = () => (
    <div className={styles.wrapper} data-test-id='loader'>
        <Lottie animationData={loader} className={styles.loader} />
    </div>
);
