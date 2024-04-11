import { Fragment } from 'react';
import { Avatar, Typography } from 'antd';
import classnames from 'classnames/bind';

import { UserOutlined } from '@ant-design/icons';
import { UserCardTypes } from '@type/card';
import { getHighlightedText } from '@utils/get-highlighted-text';

import styles from './user.module.scss';

const cx = classnames.bind(styles);

const { Paragraph } = Typography;

type UserProps = {
    image: string | null;
    firstName?: string | null;
    surname?: string | null;
    fullName?: string | null;
    type?: string;
    searchValue?: string;
};

export const User = ({ image, fullName, firstName, surname, type, searchValue }: UserProps) => {
    const name = fullName ?? 'Пользователь';

    const arrOfName = name?.split(' ', 2);

    const wrapper = cx({
        wrapper: !type,
        wrapper_card: type === UserCardTypes.CARD,
        wrapper_message: type === UserCardTypes.MESSAGE,
    });

    const avatar = cx({
        avatar: !type,
        avatar_card: type === UserCardTypes.CARD,
    });

    const text = cx({
        name: !type,
        name_card: type === UserCardTypes.CARD,
    });

    return (
        <div className={wrapper}>
            <Avatar
                size={42}
                src={image ?? <UserOutlined />}
                style={{ color: '#262626', backgroundColor: '#f5f5f5' }}
                className={avatar}
            />
            <Paragraph className={text}>
                {type === UserCardTypes.MESSAGE ? (
                    <Fragment>
                        <span>{firstName}</span>
                        <span>{surname}</span>
                    </Fragment>
                ) : (
                    arrOfName.map((partOfName) => (
                        <Paragraph key={new Date().toDateString()}>
                            {searchValue ? getHighlightedText(partOfName, searchValue) : partOfName}{' '}
                        </Paragraph>
                    ))
                )}
            </Paragraph>
        </div>
    );
};
