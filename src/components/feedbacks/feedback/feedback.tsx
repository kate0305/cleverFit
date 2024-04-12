import { Fragment } from 'react';

import { ContentCard } from '@components/content-card';

import { Review } from './review';
import { User } from './user';

import styles from './feedback.module.scss';

type FeedbackProps = {
    fullName: string | null;
    image: string | null;
    message: string | null;
    rating: number;
    date: string;
};

export const Feedback = ({ fullName, image, message, rating, date }: FeedbackProps) => (
    <ContentCard bordered={false} className={styles.feedback}>
        <Fragment>
            <User fullName={fullName} image={image} />
            <Review rating={rating} date={date} message={message} />
        </Fragment>
    </ContentCard>
);
