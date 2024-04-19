import { Badge, Typography } from 'antd';

import { UserCardTypes } from '@type/card';
import { BadgeColors } from '@type/training';

import { User } from '@components/feedbacks/feedback/user';

import styles from './drawer-info.module.scss';

const { Paragraph } = Typography;

type DrawerInfoProps = {
    trainingName: string;
    date?: string;
    userName?: string;
    imageSrc?: string;
    isJointDrawer?: boolean;
};

export const DrawerInfo = ({
    trainingName,
    date,
    userName,
    imageSrc,
    isJointDrawer,
}: DrawerInfoProps) => (
    <div className={styles.data}>
        {isJointDrawer && (
            <User
                fullName={userName}
                image={imageSrc || ''}
                type={UserCardTypes.CARD}
            />
        )}
        <Badge
            color={BadgeColors[trainingName as keyof typeof BadgeColors]}
            text={trainingName}
            className={styles.badge}
        />
        {!isJointDrawer && <Paragraph>{date}</Paragraph>}
    </div>
);
