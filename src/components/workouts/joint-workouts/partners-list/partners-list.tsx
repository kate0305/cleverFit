import { Typography } from 'antd';
import { selectPartnersList } from '@redux/redusers/training-partners-slice';

import { useAppSelector } from '@hooks/index';
import { PartnerCardTypes } from '@type/card';

import { PartnerCard } from '../cards/partner-card';

import styles from './partners-list.module.scss';

const { Title } = Typography;

export const PartnersList = () => {
    const partnersList = useAppSelector(selectPartnersList);

    return (
        <div className={styles.container}>
            <Title level={5} className={styles.title}>
                Мои партнёры по тренировкам
            </Title>
            <div className={styles.list}>
                {partnersList?.length ? (
                    partnersList.map((partner, index) => (
                        <PartnerCard
                            key={partner.id}
                            partnerData={partner}
                            index={index}
                            type={PartnerCardTypes.PARTNER}
                        />
                    ))
                ) : (
                    <p className={styles.subtitle}>
                        У вас пока нет партнёров для совместных тренировок
                    </p>
                )}
            </div>
        </div>
    );
};
