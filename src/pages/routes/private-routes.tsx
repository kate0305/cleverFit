import { Navigate } from 'react-router-dom';
import { selectToken } from '@redux/redusers/user-data-slice';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useLocalStorage } from '@utils/use-local-storage';
import { Paths } from '@type/paths';

export const PrivateRoute = (prop: { children: JSX.Element }) => {
    const [localStorageValue] = useLocalStorage('token', null);
    const token = useAppSelector(selectToken);
    return localStorageValue || token ? prop.children : <Navigate to={Paths.AUTH} replace />;
};
