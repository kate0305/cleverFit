import {
    CHANGE_PASSWORD_URL,
    CHECK_EMAIL,
    CONFIRM_EMAIL_URL,
    SIGN_IN,
    SIGN_UP,
} from '@constants/index';
import type {
    ChangePasswordReq,
    ConfirmEmailReq,
    EmailResp,
    LoginResp,
    UserReq,
} from '@type/service';
import { commonOnQueryStarted } from '@utils/api-query-started';

import { cleverFitApi } from './base-query';

export const authApi = cleverFitApi.injectEndpoints({
    endpoints: (builder) => ({
        signUpUser: builder.mutation<void, UserReq>({
            query: (data) => ({
                url: SIGN_UP,
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                await commonOnQueryStarted({ dispatch, queryFulfilled }, true);
            },
        }),

        signInUser: builder.mutation<LoginResp, UserReq>({
            query: (data) => ({
                url: SIGN_IN,
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                await commonOnQueryStarted({ dispatch, queryFulfilled }, true);
            },
        }),

        checkEmail: builder.mutation<EmailResp, { email: string }>({
            query: (data) => ({
                url: CHECK_EMAIL,
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                await commonOnQueryStarted({ dispatch, queryFulfilled }, true);
            },
        }),

        confirmEmail: builder.mutation<EmailResp, ConfirmEmailReq>({
            query: (data) => ({
                url: CONFIRM_EMAIL_URL,
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                await commonOnQueryStarted({ dispatch, queryFulfilled }, true);
            },
        }),

        changePassword: builder.mutation<void, ChangePasswordReq>({
            query: (data) => ({
                url: CHANGE_PASSWORD_URL,
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                await commonOnQueryStarted({ dispatch, queryFulfilled }, true);
            },
        }),
    }),
});

export const {
    useSignUpUserMutation,
    useSignInUserMutation,
    useCheckEmailMutation,
    useConfirmEmailMutation,
    useChangePasswordMutation,
} = authApi;
