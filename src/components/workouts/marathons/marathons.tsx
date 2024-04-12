import { Typography } from 'antd';

import styles from './marathons.module.scss';

const { Title, Paragraph } = Typography;

export const Marathons = () => (
    <div className={styles.wrapper}>
        <Title className={styles.title}>
            В данный период <br/> ни один марафон не&nbsp;проводится
        </Title>
        <Paragraph className={styles.subtitle}>
            Заглядывайте сюда почаще <br/> и ваш первый марафон скоро начнётся.
        </Paragraph>
    </div>
);
