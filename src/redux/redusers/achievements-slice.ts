import { RootState } from '@redux/configure-store';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AchievementsTabsKeys } from '@type/tabs';
import { TrainingNames } from '@type/training';

type AppReducerState = {
    selectedTrainingFilter: `${TrainingNames}`;
    activeTab: string;
};

const initialState: AppReducerState = {
    selectedTrainingFilter: TrainingNames.ALL,
    activeTab: AchievementsTabsKeys.WEEK,
};

export const achievementsSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setSelectedTrainingFilter(state, action: PayloadAction<`${TrainingNames}`>) {
            state.selectedTrainingFilter = action.payload;
        },
        setActiveTab(state, action: PayloadAction<string>) {
            state.activeTab = action.payload;
        },
    },
});

export const { setSelectedTrainingFilter, setActiveTab } = achievementsSlice.actions;
export const achievementsReduser = achievementsSlice.reducer;

export const selectSelectedTrainingFilter = (state: RootState) =>
    state.achievementsReduser.selectedTrainingFilter;
export const selectActiveTab = (state: RootState) =>
    state.achievementsReduser.activeTab;
export const selectAchievements = (state: RootState) =>
    state.achievementsReduser;
