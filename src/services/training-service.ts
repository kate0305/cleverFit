import {
    setPartnersList,
    setUsersForJointTrainings,
} from '@redux/redusers/training-partners-slice';
import {
    setAppTrainingsList,
    setIsTrainingListErr,
    setTrainingLoading,
    setUserTrainingsList,
} from '@redux/redusers/trainings-slice';

import { PARTNERS_LIST, TRAINING, TRAINING_LIST, USERS_FOR_JOINT_WORKOUTS } from '@constants/index';
import { DateFormats } from '@type/dates';
import {
    Tags,
    TrainingResp,
    UpdateTrainingReq,
    UserTrainingReq,
    UserTrainingResp,
} from '@type/service';
import { TrainingPartner, UserTraining } from '@type/training';
import { commonOnQueryStarted } from '@utils/api-query-started';
import { getFormattedDate } from '@utils/get-date';

import { cleverFitApi } from './base-query';

export const trainingApi = cleverFitApi
    .enhanceEndpoints({ addTagTypes: [Tags.TRAINING, Tags.RARTNERS, Tags.USERS_FOR_JOINT_WORKOUT] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getUserTrainings: builder.query<UserTrainingResp, void>({
                query: () => TRAINING,
                async onQueryStarted(_, { dispatch, queryFulfilled }) {
                    try {
                        await commonOnQueryStarted({ dispatch, queryFulfilled }, true);
                        const { data: userTrainings } = await queryFulfilled;

                        dispatch(setUserTrainingsList(userTrainings));
                    } catch (e) {
                        console.log(e);
                    }
                },
                transformResponse: (response: UserTraining[]): UserTrainingResp => {
                    const dateArr = response.map((training) =>
                        getFormattedDate(training.date, DateFormats.EN),
                    );
                    const userTraining: UserTrainingResp = {};

                    dateArr.forEach((date) => {
                        userTraining[date] = response.filter(
                            (training) => getFormattedDate(training.date, DateFormats.EN) === date,
                        );

                        return userTraining[date];
                    });

                    return userTraining;
                },
                providesTags: [Tags.TRAINING],
            }),

            getTrainingList: builder.query<TrainingResp[], void>({
                query: () => TRAINING_LIST,
                async onQueryStarted(_, { dispatch, queryFulfilled }) {
                    try {
                        await commonOnQueryStarted({ dispatch, queryFulfilled }, true);
                        const { data: appTrainingList } = await queryFulfilled;

                        dispatch(setIsTrainingListErr(false));
                        dispatch(setAppTrainingsList(appTrainingList));
                    } catch (e) {
                        dispatch(setIsTrainingListErr(true));
                    }
                },
            }),

            createTraining: builder.mutation<UserTraining, UserTrainingReq>({
                query: (data) => ({
                    url: TRAINING,
                    method: 'POST',
                    body: data,
                }),
                async onQueryStarted(_, { dispatch, queryFulfilled }) {
                    try {
                        dispatch(setTrainingLoading(true));
                        await queryFulfilled;
                        dispatch(setTrainingLoading(false));
                    } catch {
                        dispatch(setTrainingLoading(false));
                    }
                },
                invalidatesTags: (_, err) => (err ? [] : [Tags.TRAINING]),
            }),

            editTraining: builder.mutation<void, UpdateTrainingReq>({
                query: (data) => ({
                    url: `${TRAINING}/${data.id}`,
                    method: 'PUT',
                    body: data,
                }),
                async onQueryStarted(_, { dispatch, queryFulfilled }) {
                    try {
                        dispatch(setTrainingLoading(true));
                        await queryFulfilled;
                        dispatch(setTrainingLoading(false));
                    } catch {
                        dispatch(setTrainingLoading(false));
                    }
                },
                invalidatesTags: (_, err) => (err ? [] : [Tags.TRAINING]),
            }),

            getPartnersList: builder.query<TrainingPartner[], void>({
                query: () => PARTNERS_LIST,
                async onQueryStarted(_, { dispatch, queryFulfilled }) {
                    try {
                        await commonOnQueryStarted({ dispatch, queryFulfilled }, true);
                        const { data: partnersList } = await queryFulfilled;

                        dispatch(setPartnersList(partnersList));
                    } catch (e) {
                        console.log(e);
                    }
                },
                providesTags: [Tags.RARTNERS],
            }),

            getUsersForJointTrainings: builder.query<
                TrainingPartner[],
                { trainingType?: string; status?: string | null }
            >({
                query: (params) => ({
                    url: USERS_FOR_JOINT_WORKOUTS,
                    method: 'GET',
                    params,
                }),
                async onQueryStarted(_, { dispatch, queryFulfilled }) {
                    try {
                        await commonOnQueryStarted({ dispatch, queryFulfilled }, true);
                        const { data: usersList } = await queryFulfilled;

                        dispatch(setUsersForJointTrainings(usersList));
                    } catch (e) {
                        console.log(e);
                    }
                },
                providesTags: [Tags.USERS_FOR_JOINT_WORKOUT],
            }),
        }),
    });

export const {
    useGetUserTrainingsQuery,
    useLazyGetUserTrainingsQuery,
    useGetTrainingListQuery,
    useLazyGetTrainingListQuery,
    useCreateTrainingMutation,
    useEditTrainingMutation,
    useGetPartnersListQuery,
    useLazyGetPartnersListQuery,
    useGetUsersForJointTrainingsQuery,
    useLazyGetUsersForJointTrainingsQuery,
} = trainingApi;
