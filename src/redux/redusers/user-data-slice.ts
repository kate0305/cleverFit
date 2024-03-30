import { RootState } from '@redux/configure-store';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChangePasswordReq, FeedbackReq, TariffResp, UserDataResp, UserReq } from '@type/service';
import { getLocalStorageValue } from '@utils/use-local-storage';

type UserDataReducerState = {
    userData: UserDataResp | null;
    userAuthData: UserReq | null;
    changePasswordData: ChangePasswordReq | null;
    email: string | null;
    token: string | null;
    reviewData: FeedbackReq | null;
    tariffList: TariffResp[];
};

const initialState: UserDataReducerState = {
    userData: null,
    userAuthData: null,
    changePasswordData: null,
    email: null,
    token: getLocalStorageValue('token', null),
    reviewData: null,
    tariffList: [],
};

export const userDataSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<UserDataResp | null>) {
            state.userData = action.payload;
        },
        setSignUpData(state, action: PayloadAction<UserReq>) {
            state.userAuthData = action.payload;
        },
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
        },
        setEmail(state, action: PayloadAction<string>) {
            state.email = action.payload;
        },
        setChangePasswordData(state, action: PayloadAction<ChangePasswordReq>) {
            state.changePasswordData = action.payload;
        },
        setReviewData(state, action: PayloadAction<FeedbackReq>) {
            state.reviewData = action.payload;
        },
        setTariffList(state, action: PayloadAction<TariffResp[]>) {
            state.tariffList = action.payload;
        },
        reset: () => initialState,
    },
});

export const {
    setUserData,
    setSignUpData,
    setToken,
    setEmail,
    setChangePasswordData,
    setReviewData,
    setTariffList,
    reset,
} = userDataSlice.actions;
export const userDataReduser = userDataSlice.reducer;

export const selectUserData = (state: RootState) => state.userDataReduser.userData;
export const selectUserAuthData = (state: RootState) => state.userDataReduser.userAuthData;
export const selectUserEmail = (state: RootState) => state.userDataReduser.email;
export const selectToken = (state: RootState) => state.userDataReduser.token;
export const selectChangePasswordData = (state: RootState) =>
    state.userDataReduser.changePasswordData;
export const selectReviewData = (state: RootState) => state.userDataReduser.reviewData;
export const selectTafiffs = (state: RootState) => state.userDataReduser.tariffList;
export const selectUser = (state: RootState) => state.userDataReduser;
