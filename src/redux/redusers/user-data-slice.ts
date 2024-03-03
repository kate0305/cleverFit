import { RootState } from '@redux/configure-store';

import { getLocalStorageValue } from '@utils/use-local-storage';

import { ChangePasswordReq, UserReq } from '@type/service';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserDataReducerState = {
    userData: UserReq | null;
    changePasswordData: ChangePasswordReq | null;
    email: string | null;
    token: string | null;
};

const initialState: UserDataReducerState = {
    userData: null,
    changePasswordData: null,
    email: null,
    token: getLocalStorageValue('token', null),
};

export const userDataSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setSignUpData(state, action: PayloadAction<UserReq>) {
            state.userData = action.payload;
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
        reset: () => {
            return initialState;
        },
    },
});

export const { setSignUpData, setToken, setEmail, setChangePasswordData, reset } =
    userDataSlice.actions;
export const userDataReduser = userDataSlice.reducer;

export const selectUserData = (state: RootState) => state.userDataReduser.userData;
export const selectUserEmail = (state: RootState) => state.userDataReduser.email;
export const selectToken = (state: RootState) => state.userDataReduser.token;
export const selectChangePasswordData = (state: RootState) =>
    state.userDataReduser.changePasswordData;
