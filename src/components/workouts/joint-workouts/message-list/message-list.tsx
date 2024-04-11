import { useState } from 'react';
import { List, Typography } from 'antd';
import classnames from 'classnames/bind';
import { selectUserInvites } from '@redux/redusers/training-partners-slice';

import { DownOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/index';

import { PrimaryBtn } from '@components/buttons/primary-button';
import { ContentCard } from '@components/content-card';

import { Message } from './message';

import styles from './message-list.module.scss';

const cx = classnames.bind(styles);
const { Paragraph } = Typography;

export const MessageList = () => {
    const invites = useAppSelector(selectUserInvites);

    const [isAllMessages, toogleAllMessages] = useState(false);
    const toogleAmountMessages = () => toogleAllMessages(!isAllMessages);

    const dropdown = cx({
        icon: true,
        icon_rotate: isAllMessages,
    });

    return (
        <ContentCard className={styles.wrapper} bordered={true}>
            <Paragraph>
                Новое сообщение <span>({invites.length})</span>
                <List
                    itemLayout='horizontal'
                    dataSource={isAllMessages ? invites : [invites[0]]}
                    renderItem={(invite) => (
                        <List.Item className={styles.list_item}>
                            <Message inviteData={invite} />
                        </List.Item>
                    )}
                    className={styles.list}
                />
            </Paragraph>
            {invites.length > 1 && (
                <PrimaryBtn
                    type='link'
                    icon={<DownOutlined className={dropdown} />}
                    btnText={isAllMessages ? 'Скрыть все сообщения' : 'Показать все сообщения'}
                    onClick={toogleAmountMessages}
                    className={styles.btn_show_message}
                />
            )}
        </ContentCard>
    );
};
