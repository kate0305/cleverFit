import { configureStore } from '@reduxjs/toolkit';
import { listenerMiddleware } from './listener-middleware';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { cleverFitApi } from '@services/clever-fit-service';
import { userDataReduser } from './redusers/user-data-slice';
import { appReduser } from './redusers/app-slice';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

export const store = configureStore({
    reducer: {
        userDataReduser,
        appReduser,
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
