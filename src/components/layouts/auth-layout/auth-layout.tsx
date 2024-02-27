import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { selectIsLoading } from '@redux/redusers/app-slice';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Loader } from '@components/loader';
import classnames from 'classnames/bind';
import styles from './auth-layout.module.scss';

const cx = classnames.bind(styles);

export const AuthLayout: React.FC = () => {
    const isLoading = useAppSelector(selectIsLoading);

    const className = cx({
        wrapper: true,
        filter: !isLoading,
    });

    return (
        <div className={className}>
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
        </div>
    );
};
