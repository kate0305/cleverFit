import { ContentCard } from '@components/content-card';

import { Review } from './review';
import { User } from './user';

import styles from './feedback.module.scss';

type UserProps = {
    fullName: string | null;
    image: string | null;
    message: string | null;
    rating: number;
    date: string;
};

export const Feedback = ({ fullName, image, message, rating, date }: UserProps) => (
    <ContentCard
        bordered={false}
        className={styles.feedback}
        content={
            <>
                <User fullName={fullName} image={image} />
                <Review rating={rating} date={date} message={message} />
            </>
        }
    />
);
