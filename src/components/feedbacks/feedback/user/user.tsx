import { Avatar, Typography } from 'antd';

import { UserOutlined } from '@ant-design/icons';

import styles from './user.module.scss';

const { Paragraph } = Typography;

type UserProps = {
    fullName: string | null;
    image: string | null;
};

export const User = ({ fullName, image }: UserProps) => {
    const name = fullName ?? 'Пользователь';
    const arrOfName = name.split(' ');

    return (
        <div className={styles.wrapper}>
            <Avatar
                size={42}
                src={image ?? <UserOutlined />}
                style={{ color: '#262626', backgroundColor: '#f5f5f5' }}
                className={styles.avatar}
            />
            <Paragraph className={styles.name}>
                {arrOfName.map((partOfName) => (
                    <span key={partOfName}>{partOfName}</span>
                ))}
            </Paragraph>
        </div>
    );
};
