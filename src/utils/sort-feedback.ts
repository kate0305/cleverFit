import { Review } from '@type/feedbacks';

export const sortFeedbacks = (feedbacks: Review[]) =>
    [...feedbacks].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
