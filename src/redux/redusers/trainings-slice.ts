import { RootState } from '@redux/configure-store';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrainingResp, UserTrainingReq, UserTrainingResp } from '@type/service';

type EditTraining = {
    isEditMode: boolean;
    editTrainingIndex: number;
    editTrainingId: string;
};

type TrainingReducerState = {
    appTrainingList: TrainingResp[];
    userTrainingsList: UserTrainingResp;
    training: UserTrainingReq;
    editTrainingData: EditTraining;
    updateTrainingLoading: boolean;
};

const initialState: TrainingReducerState = {
    appTrainingList: [],
    userTrainingsList: {},
    training: { name: '', date: '', isImplementation: false, exercises: [] },
    editTrainingData: { isEditMode: false, editTrainingIndex: 0, editTrainingId: '' },
    updateTrainingLoading: false,
};

export const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        setAppTrainingsList(state, action: PayloadAction<TrainingResp[]>) {
            state.appTrainingList = action.payload;
        },
        setUserTrainingsList(state, action: PayloadAction<UserTrainingResp>) {
            state.userTrainingsList = action.payload;
        },
        createTraining(state, action: PayloadAction<UserTrainingReq>) {
            state.training = action.payload;
        },
        setEditTrainingData(state, action: PayloadAction<Omit<EditTraining, 'editTrainingId'>>) {
            state.editTrainingData.isEditMode = action.payload.isEditMode;
            state.editTrainingData.editTrainingIndex = action.payload.editTrainingIndex;
        },
        setEditTrainingId(state, action: PayloadAction<Pick<EditTraining, 'editTrainingId'>>) {
            state.editTrainingData.editTrainingId = action.payload.editTrainingId;
        },
        resetEditTrainingData(state) {
            state.editTrainingData = initialState.editTrainingData;
        },
        resetTraining(state) {
            state.training = initialState.training;
        },
        setTrainingLoading(state, action: PayloadAction<boolean>) {
            state.updateTrainingLoading = action.payload;
        },
    },
});

export const {
    setUserTrainingsList,
    setAppTrainingsList,
    createTraining,
    setEditTrainingData,
    setEditTrainingId,
    resetEditTrainingData,
    resetTraining,
    setTrainingLoading,
} = trainingSlice.actions;
export const trainingReduser = trainingSlice.reducer;

export const selectTraining = (state: RootState) => state.trainingReduser.training;
export const selectEditTrainingData = (state: RootState) => state.trainingReduser.editTrainingData;
export const selectUpdateTrainingLoading = (state: RootState) =>
    state.trainingReduser.updateTrainingLoading;
export const selectTrainingData = (state: RootState) => state.trainingReduser;
export const selectUserTrainingList = (state: RootState) => state.trainingReduser.userTrainingsList;
