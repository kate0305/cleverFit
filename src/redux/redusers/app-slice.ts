import { RootState } from '@redux/configure-store';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppReducerState = {
    isLoading: boolean;
};

const initialState: AppReducerState = {
    isLoading: false,
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
    },
});

export const { addLoader, removeLoader } = appSlice.actions;
export const appReduser = appSlice.reducer;

export const selectIsLoading = (state: RootState) => state.appReduser.isLoading;
