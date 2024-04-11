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
                <CheckCircleFilled style={{ color: '#52c41a', fontSize: '14px' }} />
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
                    color='#000'
                    overlayClassName={styles.tooltip}
                    defaultOpen={true}
                >
                    <ExclamationCircleOutlined style={{ color: '#8c8c8c', fontSize: '14px' }} />
                </Tooltip>
            </Paragraph>
        );
    }

    return undefined;
};
