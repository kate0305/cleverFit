import { useEffect } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import { selectToken, setToken } from '@redux/redusers/user-data-slice';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';

import { useLocalStorage } from '@utils/use-local-storage';

import { Paths } from '@type/paths';

export const PrivateRoute = (prop: { children: JSX.Element }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const tokenFromQueryParams = searchParams.get('accessToken');
    const [localStorageValue, setLocalStorageItem] = useLocalStorage('token', '');

    const token = useAppSelector(selectToken);
    const isHaveToken = tokenFromQueryParams || localStorageValue || token;

    useEffect(() => {
        if (tokenFromQueryParams) {
            dispatch(setToken(tokenFromQueryParams));
            setLocalStorageItem(tokenFromQueryParams);
            navigate(Paths.MAIN);
        }
    }, [dispatch, navigate, setLocalStorageItem, tokenFromQueryParams]);

    return isHaveToken ? prop.children : <Navigate to={Paths.AUTH} replace />;
};
