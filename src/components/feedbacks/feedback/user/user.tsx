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
    image: string;
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
        avatar: !type || type === UserCardTypes.MESSAGE,
        avatar_card: type === UserCardTypes.CARD,
    });

    const text = cx({
        name: !type || type === UserCardTypes.MESSAGE,
        name_card: type === UserCardTypes.CARD,
    });

    return (
        <div className={wrapper}>
            <Avatar
                size={42}
                src={image || <UserOutlined style={{ color: 'var(--light-title-85)' }} />}
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
                        <span key={`${Math.random}`}>
                            {searchValue ? getHighlightedText(partOfName, searchValue) : partOfName}{' '}
                        </span>
                    ))
                )}
            </Paragraph>
        </div>
    );
};
