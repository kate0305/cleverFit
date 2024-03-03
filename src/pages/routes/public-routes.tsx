import { Navigate } from 'react-router-dom';

import { selectToken } from '@redux/redusers/user-data-slice';
import { useAppSelector } from '@hooks/index';

import { useLocalStorage } from '@utils/use-local-storage';

import { Paths } from '@type/paths';

export const PublicRoute = (prop: { children: JSX.Element }) => {
    const [localStorageValue] = useLocalStorage('token', null);
    const token = useAppSelector(selectToken);
    return localStorageValue || token ? <Navigate to={Paths.MAIN} replace /> : prop.children;
};
