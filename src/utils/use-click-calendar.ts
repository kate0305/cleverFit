import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLazyGetUserTrainingsQuery } from '@services/training-service';

export const useCalendarClick = () => {
    const navigate = useNavigate();
    const [isErr, setErr] = useState(false);

    const [getUserTrainingList] = useLazyGetUserTrainingsQuery();

    const closeErrModal = () => {
        setErr(false);
    };

    const handleClick = async (path: string) => {
        try {
            await getUserTrainingList().unwrap();
            navigate(path);
        } catch (e) {
            setErr(true);
        }
    };

    return {
        isErr,
        handleClick,
        closeErrModal,
    };
};
