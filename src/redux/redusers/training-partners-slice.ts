import { RootState } from '@redux/configure-store';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InviteResp } from '@type/service';
import { JointTrainingDrawerData, TrainingPartner, UserStatus } from '@type/training';

type TrainingPartnersReducerState = {
    partnersList: TrainingPartner[];
    usersForJointTrainings: TrainingPartner[];
    jointTrainingDrawerData: JointTrainingDrawerData;
    userInvites: InviteResp[];
};

const initialState: TrainingPartnersReducerState = {
    partnersList: [],
    usersForJointTrainings: [],
    jointTrainingDrawerData: {
        isJointWorkout: false,
        trainingName: '',
        userId: '',
        userName: '',
        imageSrc: '',
    },
    userInvites: [],
};

export const trainingPartnersSlice = createSlice({
    name: 'training-partners',
    initialState,
    reducers: {
        setPartnersList(state, action: PayloadAction<TrainingPartner[]>) {
            state.partnersList = action.payload;
        },
        deletePartnerFromList(state, action: PayloadAction<string>) {
            state.partnersList = state.partnersList.filter((p) => p.inviteId !== action.payload);
        },
        setUsersForJointTrainings(state, action: PayloadAction<TrainingPartner[]>) {
            state.usersForJointTrainings = action.payload;
        },
        updateStatusInUsersForJointTrainings(
            state,
            action: PayloadAction<{ id: string; status: UserStatus.PENDING }>,
        ) {
            state.usersForJointTrainings = state.usersForJointTrainings.map((user) =>
                user.id === action.payload.id ? { ...user, status: action.payload.status } : user,
            );
        },
        setJointTrainingDarwerData(state, action: PayloadAction<JointTrainingDrawerData>) {
            state.jointTrainingDrawerData = action.payload;
        },
        resetJointTrainingDarwerData(state) {
            state.jointTrainingDrawerData = initialState.jointTrainingDrawerData;
        },
        setInvites(state, action: PayloadAction<InviteResp[]>) {
            state.userInvites = action.payload;
        },
    },
});

export const {
    setPartnersList,
    setUsersForJointTrainings,
    updateStatusInUsersForJointTrainings,
    deletePartnerFromList,
    setJointTrainingDarwerData,
    resetJointTrainingDarwerData,
    setInvites,
} = trainingPartnersSlice.actions;

export const trainingPartnersReduser = trainingPartnersSlice.reducer;

export const selectPartnersList = (state: RootState) => state.trainingPartnersReduser.partnersList;
export const selectJointTrainingData = (state: RootState) =>
    state.trainingPartnersReduser.jointTrainingDrawerData;
export const selectUsersForJointTrainings = (state: RootState) =>
    state.trainingPartnersReduser.usersForJointTrainings;
export const selectUserInvites = (state: RootState) => state.trainingPartnersReduser.userInvites;
export const selectTrainingPartners = (state: RootState) => state.trainingPartnersReduser;
