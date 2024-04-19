import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';

import { configureStore } from '@reduxjs/toolkit';
import { cleverFitApi } from '@services/base-query';

import { achievementsReduser } from './redusers/achievements-slice';
import { appReduser } from './redusers/app-slice';
import { trainingPartnersReduser } from './redusers/training-partners-slice';
import { trainingReduser } from './redusers/trainings-slice';
import { userDataReduser } from './redusers/user-data-slice';
import { listenerMiddleware } from './listener-middleware';


const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

export const store = configureStore({
    reducer: {
        userDataReduser,
        appReduser,
        trainingReduser,
        trainingPartnersReduser,
        achievementsReduser,
        router: routerReducer,
        [cleverFitApi.reducerPath]: cleverFitApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            listenerMiddleware.middleware,
            routerMiddleware,
            cleverFitApi.middleware,
        ),
});

export const history = createReduxHistory(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
