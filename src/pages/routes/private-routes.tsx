import { useLayoutEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { selectToken, setToken } from '@redux/redusers/user-data-slice';

import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Paths } from '@type/paths';
import { useLocalStorage } from '@utils/use-local-storage';

export const PrivateRoute = (prop: { children: JSX.Element }) => {
    const dispatch = useAppDispatch();

    const [searchParams] = useSearchParams();
    const tokenFromQueryParams = searchParams.get('accessToken');

    const [localStorageValue, setLocalStorageItem] = useLocalStorage('token', '');

    const token = tokenFromQueryParams || localStorageValue;

    const tokenFromStore = useAppSelector(selectToken);

    const isHaveToken = tokenFromQueryParams || localStorageValue || tokenFromStore;

    useLayoutEffect(() => {
        if (token) {
            dispatch(setToken(token));
            setLocalStorageItem(token);
        }
    }, [dispatch, localStorageValue, setLocalStorageItem, token, tokenFromQueryParams]);

    return isHaveToken ? prop.children : <Navigate to={Paths.AUTH} replace={true} />;
};
