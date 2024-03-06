import { Typography } from 'antd';

import { DATE_OPTIONS } from '@constants/index';

import { Rating } from '@components/rating';

import styles from './review.module.scss';

const { Paragraph } = Typography;

type ReviewProps = {
    rating: number;
    date: string;
    message: string | null;
};

export const Review = ({ rating, date, message }: ReviewProps) => {
    const formattedDate = new Date(date).toLocaleDateString('ru-RU', DATE_OPTIONS);

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Rating disabled defaultValue={rating} size='16' />
                <Paragraph className={styles.data}>{formattedDate}</Paragraph>
            </div>
            <div className={styles.review}>{message}</div>
        </div>
    );
};
