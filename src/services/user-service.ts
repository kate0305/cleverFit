import { setTariffList, setUserData } from '@redux/redusers/user-data-slice';

import { PAY_NEW_TARIFF, TARIFF_LIST, USER, USER_ME } from '@constants/index';
import { PayNewTariffResp, Tags, TariffResp, UserDataReq, UserDataResp } from '@type/service';
import { commonOnQueryStarted } from '@utils/api-query-started';

import { cleverFitApi } from './base-query';

export const userApi = cleverFitApi.enhanceEndpoints({ addTagTypes: [Tags.USER] }).injectEndpoints({
    endpoints: (builder) => ({
        getUserData: builder.query<UserDataResp, void>({
            query: () => USER_ME,
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await commonOnQueryStarted({ dispatch, queryFulfilled }, true);
                    const { data: userData } = await queryFulfilled;

                    dispatch(setUserData(userData));
                } catch (e) {
                    dispatch(setUserData(null));
                }
            },
            providesTags: [Tags.USER],
        }),

        updateUserData: builder.mutation<UserDataResp, UserDataReq>({
            query: (data) => ({
                url: USER,
                method: 'PUT',
                body: data,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await commonOnQueryStarted({ dispatch, queryFulfilled }, true);
                    const { data: userData } = await queryFulfilled;

                    dispatch(setUserData(userData));
                } catch {
                    dispatch(setUserData(null));
                }
            },
            invalidatesTags: (_, err) => (err ? [] : [Tags.USER]),
        }),

        getTariffList: builder.query<TariffResp[], void>({
            query: () => TARIFF_LIST,
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await commonOnQueryStarted({ dispatch, queryFulfilled }, true);
                    const { data: tariffList } = await queryFulfilled;

                    dispatch(setTariffList(tariffList));
                } catch (e) {
                    dispatch(setTariffList([]));
                }
            },
        }),

        payNewTariff: builder.mutation<void, PayNewTariffResp>({
            query: (data) => ({
                url: PAY_NEW_TARIFF,
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                await commonOnQueryStarted({ dispatch, queryFulfilled }, true);
            },
            invalidatesTags: (_, err) => (err ? [] : [Tags.USER]),
        }),
    }),
});

export const {
    useLazyGetUserDataQuery,
    useGetUserDataQuery,
    useUpdateUserDataMutation,
    useLazyGetTariffListQuery,
    usePayNewTariffMutation,
} = userApi;
