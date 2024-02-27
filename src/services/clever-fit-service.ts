import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@redux/configure-store';
import type {
    ChangePasswordReq,
    ConfirmEmailReq,
    EmailResp,
    LoginResp,
    UserReq,
} from '@type/service';
import { BASE_URL } from '@constants/index';
import { commonOnQueryStarted } from '@utils/api-query-started';

export const cleverFitApi = createApi({
    reducerPath: 'cleverFitApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).userDataReduser.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),

    endpoints: (builder) => ({
        signUpUser: builder.mutation<void, UserReq>({
            query: (data) => ({
                url: '/auth/registration',
                method: 'POST',
                body: data,
                credentials: 'include',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                await commonOnQueryStarted({ dispatch, queryFulfilled }, true);
            },
        }),

        signInUser: builder.mutation<LoginResp, UserReq>({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
                credentials: 'include',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                await commonOnQueryStarted({ dispatch, queryFulfilled }, true);
            },
        }),

        checkEmail: builder.mutation<EmailResp, { email: string }>({
            query: (data) => ({
                url: '/auth/check-email',
                method: 'POST',
                body: data,
                credentials: 'include',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                await commonOnQueryStarted({ dispatch, queryFulfilled }, true);
            },
        }),

        confirmEmail: builder.mutation<EmailResp, ConfirmEmailReq>({
            query: (data) => ({
                url: '/auth/confirm-email',
                method: 'POST',
                body: data,
                credentials: 'include',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                await commonOnQueryStarted({ dispatch, queryFulfilled }, true);
            },
        }),

        changePassword: builder.mutation<void, ChangePasswordReq>({
            query: (data) => ({
                url: '/auth/change-password',
                method: 'POST',
                body: data,
                credentials: 'include',
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
} = cleverFitApi;
