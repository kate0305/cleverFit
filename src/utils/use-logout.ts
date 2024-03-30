import { useNavigate } from 'react-router-dom';
import { reset } from '@redux/redusers/user-data-slice';

import { useAppDispatch } from '@hooks/index';
import { Paths } from '@type/paths';

import { useLocalStorage } from './use-local-storage';

export const useLogOut = () => {
    const dispatch = useAppDispatch();
    const [, , removeLocalStorageItem] = useLocalStorage('token', null);
    const navigate = useNavigate();

    const logout = () => {
        dispatch(reset());
        removeLocalStorageItem();
        navigate(Paths.AUTH, { replace: true });
    }

    return logout;
};
