import { commonOnQueryStarted } from '@utils/api-query-started';

import { Review } from '@type/feedbacks';
import { FeedbackReq, Tags } from '@type/service';
import { FEEDBACK } from '@constants/index';

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
                invalidatesTags: [Tags.FEEDBACKS],
            }),
        }),
    });

export const { useGetFeedbackQuery, useCreateFeedbackMutation } = feedbacksApi;
