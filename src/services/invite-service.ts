import { addLoader } from '@redux/redusers/app-slice';
import {
    deletePartnerFromList,
    setInvites,
    updateStatusInUsersForJointTrainings,
} from '@redux/redusers/training-partners-slice';

import { INVITE, TRAINING } from '@constants/index';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { InviteAnswerReq, InviteReq, InviteResp, Tags, UserTrainingReq } from '@type/service';
import { UserStatus, UserTraining } from '@type/training';
import { commonOnQueryStarted } from '@utils/api-query-started';

import { cleverFitApi } from './base-query';

export const inviteApi = cleverFitApi
    .enhanceEndpoints({
        addTagTypes: [Tags.TRAINING, Tags.RARTNERS, Tags.USERS_FOR_JOINT_WORKOUT, Tags.INVITE],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            sendInvite: builder.mutation<
                InviteResp,
                { trainingData: UserTrainingReq; inviteData: Partial<InviteReq> }
            >({
                queryFn: async (arg, api, _, fetchWithBQ) => {
                    const { trainingData, inviteData } = arg;

                    const createTraining = await fetchWithBQ({
                        url: TRAINING,
                        method: 'POST',
                        body: trainingData,
                    });

                    api.dispatch(addLoader(true));

                    if (createTraining.error) {
                        return { error: createTraining.error as FetchBaseQueryError };
                    }

                    const training = createTraining.data as UserTraining;

                    const sendInvite = await fetchWithBQ({
                        url: INVITE,
                        method: 'POST',
                        body: {
                            to: inviteData.to,
                            // eslint-disable-next-line no-underscore-dangle
                            trainingId: training._id,
                        },
                    });

                    return sendInvite.data
                        ? { data: sendInvite.data as InviteResp }
                        : { error: sendInvite.error as FetchBaseQueryError };
                },

                async onQueryStarted({ inviteData }, { dispatch, queryFulfilled }) {
                    try {
                        await commonOnQueryStarted({ dispatch, queryFulfilled }, true);

                        dispatch(
                            updateStatusInUsersForJointTrainings({
                                id: inviteData.to || '',
                                status: UserStatus.PENDING,
                            }),
                        );
                    } catch (e) {
                        console.log(e);
                    }
                },

                invalidatesTags: (_, err) => (err ? [] : [Tags.TRAINING]),
            }),

            getInvites: builder.query<InviteResp[], void>({
                query: () => INVITE,
                async onQueryStarted(_, { dispatch, queryFulfilled }) {
                    try {
                        await commonOnQueryStarted({ dispatch, queryFulfilled }, true);
                        const { data: invites } = await queryFulfilled;

                        dispatch(setInvites(invites));
                    } catch (e) {
                        console.log(e);
                    }
                },
                providesTags: [Tags.INVITE],
            }),

            replyToInvite: builder.mutation<void, InviteAnswerReq>({
                query: (data) => ({
                    url: INVITE,
                    method: 'PUT',
                    body: data,
                }),
                async onQueryStarted(_, { dispatch, queryFulfilled }) {
                    await commonOnQueryStarted({ dispatch, queryFulfilled }, true);
                },

                invalidatesTags: (_, err) =>
                    err ? [] : [Tags.USERS_FOR_JOINT_WORKOUT, Tags.RARTNERS, Tags.INVITE],
            }),

            rejectInvite: builder.mutation<void, string>({
                query: (id) => ({
                    url: `${INVITE}/${id}`,
                    method: 'DELETE',
                }),
                async onQueryStarted(id, { dispatch, queryFulfilled }) {
                    try {
                        await commonOnQueryStarted({ dispatch, queryFulfilled }, true);
                        dispatch(deletePartnerFromList(id));
                    } catch (e) {
                        console.log(e);
                    }
                },
                invalidatesTags: (_, err) => (err ? [] : [Tags.USERS_FOR_JOINT_WORKOUT]),
            }),
        }),
    });

export const {
    useSendInviteMutation,
    useGetInvitesQuery,
    useReplyToInviteMutation,
    useRejectInviteMutation,
} = inviteApi;
