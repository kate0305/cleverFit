import Lottie from 'lottie-react';

import { DATA_TEST_ID } from '@constants/data-test-id';

import loader from './loader.json';

import styles from './loader.module.scss';

export const Loader = () => (
    <div className={styles.wrapper} data-test-id={DATA_TEST_ID.loader}>
        <Lottie animationData={loader} className={styles.loader} />
    </div>
);
