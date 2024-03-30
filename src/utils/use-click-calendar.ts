import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLazyGetUserTrainingsQuery } from '@services/training-service';
import { Paths } from '@type/paths';

export const useCalendarClick = () => {
    const navigate = useNavigate();
    const [isErr, setErr] = useState(false);

    const [getUserTrainingList, { isError, isSuccess }] = useLazyGetUserTrainingsQuery();

    const handleClick = async () => {
        await getUserTrainingList();
    };

    const closeErrModal = () => {
        setErr(false);
    };

    useLayoutEffect(() => {
        if (isError) {
            setErr(true);
        }
        if (isSuccess) {
            navigate(Paths.CALENDAR);
        }
    }, [isError, isSuccess, navigate]);

    return {
        isErr,
        handleClick,
        closeErrModal,
    };
};
