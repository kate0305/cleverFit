import { RootState } from '@redux/configure-store';

import { BASE_URL } from '@constants/index';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cleverFitApi = createApi({
    reducerPath: 'cleverFitApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const {token} = (getState() as RootState).userDataReduser;

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: () => ({}),
});
