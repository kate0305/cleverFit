import { FEEDBACK } from '@constants/index';
import { Review } from '@type/feedbacks';
import { FeedbackReq, Tags } from '@type/service';
import { commonOnQueryStarted } from '@utils/api-query-started';

import { cleverFitApi } from './base-query';

export const feedbacksApi = cleverFitApi
    .enhanceEndpoints({ addTagTypes: [Tags.FEEDBACKS] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getFeedback: builder.query<Review[], void>({
                query: () => FEEDBACK,
                async onQueryStarted(_, { dispatch, queryFulfilled }) {
                    await commonOnQueryStarted({ dispatch, queryFulfilled }, true);
                },
                providesTags: [Tags.FEEDBACKS],
            }),

            createFeedback: builder.mutation<void, FeedbackReq>({
                query: (data) => ({
                    url: FEEDBACK,
                    method: 'POST',
                    body: data,
                }),
                async onQueryStarted(_, { dispatch, queryFulfilled }) {
                    await commonOnQueryStarted({ dispatch, queryFulfilled }, true);
                },
                invalidatesTags: (_, err) => (err ? [] : [Tags.FEEDBACKS]),
            }),
        }),
    });

export const { useGetFeedbackQuery, useCreateFeedbackMutation } = feedbacksApi;
