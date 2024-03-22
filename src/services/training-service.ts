import {
    setAppTrainingsList,
    setTrainingLoading,
    setUserTrainingsList,
} from '@redux/redusers/trainings-slice';

import { TRAINING, TRAINING_LIST } from '@constants/index';
import { DateFormats } from '@type/dates';
import {
    Tags,
    TrainingResp,
    UpdateTrainingReq,
    UserTrainingReq,
    UserTrainingResp,
} from '@type/service';
import { UserTraining } from '@type/training';
import { commonOnQueryStarted } from '@utils/api-query-started';
import { getFormattedDate } from '@utils/get-formatted-date';

import { cleverFitApi } from './base-query';

export const trainingApi = cleverFitApi
    .enhanceEndpoints({ addTagTypes: [Tags.TRAINING] })
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
                            (training) => getFormattedDate(training.date, DateFormats.EN) === date
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

                        dispatch(setAppTrainingsList(appTrainingList));
                    } catch (e) {
                        console.log(e);
                    }
                },
            }),

            createTraining: builder.mutation<void, UserTrainingReq>({
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
                invalidatesTags: [Tags.TRAINING],
            }),
            editTraining: builder.mutation<void, UpdateTrainingReq>({
                query: (data) => ({
                    url: `${TRAINING}/${data.id}`,
                    method: 'PUT',
                    body: {
                        name: data.name,
                        date: data.date,
                        exercises: data.exercises,
                        isImplementation: data.isImplementation,
                    },
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
                invalidatesTags: [Tags.TRAINING],
            }),
        }),
    });

export const {
    useLazyGetUserTrainingsQuery,
    useLazyGetTrainingListQuery,
    useCreateTrainingMutation,
    useEditTrainingMutation,
} = trainingApi;
