import { Tooltip, Typography } from 'antd';

import { CheckCircleFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { UserStatus } from '@type/training';

import styles from './partner-card/partner-card.module.scss';

const { Paragraph } = Typography;

export const getInfoStatus = (status: string) => {
    if (status === UserStatus.PENDING) {
        return <Paragraph className={styles.status}>ожидает подтверждения</Paragraph>;
    }

    if (status === UserStatus.ACCEPTED) {
        return (
            <Paragraph className={styles.status}>
                тренировка одобрена
                <CheckCircleFilled
                    style={{ color: 'var(--light-success)', fontSize: 'var(--font-size-base)' }}
                />
            </Paragraph>
        );
    }

    if (status === UserStatus.REJECTED) {
        return (
            <Paragraph className={styles.status}>
                тренировка отклонена
                <Tooltip
                    placement='topRight'
                    title='повторный запрос будет доступнен через 2 недели'
                    color='var(--neutral-gray-13)'
                    overlayClassName={styles.tooltip}
                    defaultOpen={true}
                >
                    <ExclamationCircleOutlined
                        style={{
                            color: 'var(--light-secondary-45)',
                            fontSize: 'var(--font-size-base)',
                        }}
                    />
                </Tooltip>
            </Paragraph>
        );
    }

    return undefined;
};
