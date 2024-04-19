import { RootState } from '@redux/configure-store';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppReducerState = {
    isLoading: boolean;
    isOpenSideBar: boolean;
    isOpenDrawer: boolean;
    alert: { isShowAlert: boolean; message: string };
};

const initialState: AppReducerState = {
    isLoading: false,
    isOpenSideBar: true,
    isOpenDrawer: false,
    alert: { isShowAlert: false, message: '' },
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        addLoader(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        removeLoader(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        toggleSidebar(state) {
            state.isOpenSideBar = !state.isOpenSideBar;
        },
        toggleDrawer(state) {
            state.isOpenDrawer = !state.isOpenDrawer;
        },
        setAlert(state, action: PayloadAction<{ isShowAlert: boolean; message: string }>) {
            state.alert = action.payload;
        },
    },
});

export const { addLoader, removeLoader, toggleSidebar, toggleDrawer, setAlert } = appSlice.actions;
export const appReduser = appSlice.reducer;

export const selectIsLoading = (state: RootState) => state.appReduser.isLoading;
export const selectIsOpenSideBar = (state: RootState) => state.appReduser.isOpenSideBar;
export const selectIsOpenDrawer = (state: RootState) => state.appReduser.isOpenDrawer;
export const selectAppData = (state: RootState) => state.appReduser;
