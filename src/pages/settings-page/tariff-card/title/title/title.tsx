import { Typography } from 'antd';

import styles from './title.module.scss';

type TariffCardTitleProps = {
    tariffType: string;
};

const { Title } = Typography;

export const TariffCardTitle = ({ tariffType }: TariffCardTitleProps) => (
    <Title level={5} className={styles.title}>
        <span className={styles.tariff_name}>{tariffType}</span> tarif
    </Title>
);
