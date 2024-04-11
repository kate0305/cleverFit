import { Typography } from 'antd';
import Meta from 'antd/lib/card/Meta';

import { PrimaryBtn } from '@components/buttons/primary-button';
import { ContentCard } from '@components/content-card';

import styles from './info.module.scss';

const { Title } = Typography;

type InfoProps = {
    handleRandomChoise: () => void;
    handleMyTypeChoise?: () => void;
};

export const Info = ({ handleMyTypeChoise, handleRandomChoise }: InfoProps) => (
    <ContentCard
        className={styles.wrapper}
        bordered={true}
        actions={[
            <PrimaryBtn
                type='link'
                btnText='Случайный выбор'
                onClick={handleRandomChoise}
                className={styles.choice_random}
            />,
            <PrimaryBtn
                type='link'
                btnText='Выбор друга по моим тренировкам'
                onClick={handleMyTypeChoise}
                className={styles.choice}
            />,
        ]}
    >
        <Meta
            title={
                <Title className={styles.title}>
                    <span>Хочешь тренироваться с тем, кто разделяет твои цели и темп?</span>
                    <span>
                        Можешь найти друга для совместных тренировок среди других пользователей.
                    </span>
                </Title>
            }
            description={
                <p className={styles.description}>
                    Можешь воспользоваться случайным выбором или выбрать друга с&nbsp;похожим
                    на&nbsp;твой уровень и вид тренировки, и&nbsp;мы&nbsp;найдем тебе идеального
                    спортивного друга.
                </p>
            }
            className={styles.meta}
        />
    </ContentCard>
);
