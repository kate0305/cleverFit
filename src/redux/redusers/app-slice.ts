import { RootState } from '@redux/configure-store';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppReducerState = {
    isLoading: boolean;
    isOpenSideBar: boolean;
    isOpenDrawer: boolean;
};

const initialState: AppReducerState = {
    isLoading: false,
    isOpenSideBar: true,
    isOpenDrawer: false,
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
    },
});

export const { addLoader, removeLoader, toggleSidebar, toggleDrawer } = appSlice.actions;
export const appReduser = appSlice.reducer;

export const selectIsLoading = (state: RootState) => state.appReduser.isLoading;
export const selectIsOpenSideBar = (state: RootState) => state.appReduser.isOpenSideBar;
export const selectIsOpenDrawer = (state: RootState) => state.appReduser.isOpenDrawer;
