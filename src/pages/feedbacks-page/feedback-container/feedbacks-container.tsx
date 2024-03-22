import { Fragment, useMemo, useState } from 'react';

import { Review } from '@type/feedbacks';

import { PrimaryBtn } from '@components/buttons/primary-button';
import { Feedback, NoFeedback } from '@components/feedbacks';

import styles from './feedbacks-container.module.scss';

type FeedbacksContainerProps = {
    isHaveFeedbacks: boolean;
    openReviewModal: () => void;
    feedbacks?: Review[];
};

export const FeedbacksContainer = ({ feedbacks, isHaveFeedbacks, openReviewModal }: FeedbacksContainerProps) => {

    const [isAllFeedbacks, toogleAllFeedbacks] = useState(false);
    const toogleAmountFeedbacks = () => toogleAllFeedbacks(!isAllFeedbacks);

    const sortedFeedbacks = useMemo(
        () => feedbacks && [...feedbacks].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
        [feedbacks],
    );
    const partOfFeedbacks = sortedFeedbacks?.slice(0, 4);
    const feedbacksForRender = isAllFeedbacks ? sortedFeedbacks : partOfFeedbacks;

    return (
        <Fragment>
            {!isHaveFeedbacks && <NoFeedback />}
            {isHaveFeedbacks && (
                <div className={styles.feedbacks}>
                    {feedbacksForRender?.map(
                        ({ id, fullName, imageSrc, message, rating, createdAt }) => (
                            <Feedback
                                key={id}
                                fullName={fullName}
                                image={imageSrc}
                                message={message}
                                rating={rating}
                                date={createdAt}
                            />
                        ),
                    )}
                </div>
            )}
            <div className={isHaveFeedbacks ? styles.btn_group_has_feedback : styles.btn_group}>
                <PrimaryBtn
                    type='primary'
                    btnText='Написать отзыв'
                    className={styles.feedback_btn}
                    dataTestId='write-review'
                    onClick={openReviewModal}
                />
                {isHaveFeedbacks && (
                    <PrimaryBtn
                        type='text'
                        btnText={isAllFeedbacks ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}
                        className={styles.all_feedbacks_btn}
                        onClick={toogleAmountFeedbacks}
                        dataTestId='all-reviews-button'
                    />
                )}
            </div>
        </Fragment>
    );
};
