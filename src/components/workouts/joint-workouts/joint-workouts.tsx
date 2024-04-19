import { Fragment, useCallback, useEffect, useState } from 'react';
import { selectPartnersList, selectUserInvites } from '@redux/redusers/training-partners-slice';
import { selectTrainingData } from '@redux/redusers/trainings-slice';

import { MAX_NUMBER_WORKOUT_PARTNERS } from '@constants/index';
import { useAppSelector } from '@hooks/index';
import {
    useGetPartnersListQuery,
    useLazyGetUsersForJointTrainingsQuery,
} from '@services/training-service';
import { ModalErrTypes } from '@type/modal-types';
import { getMostPopularWorkoutType } from '@utils/get-most-popular-workout-type';

import { getModalErr } from '@components/modal-window/modal-err/modal-err';

import { Info } from './info';
import { JointTrainingList } from './joint-training-list';
import { MessageList } from './message-list';
import { PartnersList } from './partners-list';

export const JointWorkouts = () => {
    useGetPartnersListQuery();

    const [isClickMyChoiceBtn, setClickMyChoiceBtn] = useState(false);

    const [getUsersForJointWorkouts, { isSuccess, isError, isFetching }] =
        useLazyGetUsersForJointTrainingsQuery();
    const partnersList = useAppSelector(selectPartnersList);

    const { userTrainingsList } = useAppSelector(selectTrainingData);
    const invites = useAppSelector(selectUserInvites);

    const [isShowRandomUsersList, setShowRandomUsersList] = useState(false);

    const isShowBlock = partnersList.length < MAX_NUMBER_WORKOUT_PARTNERS;

    const handleClickRandomBtn = useCallback(
        async () => getUsersForJointWorkouts({}),
        [getUsersForJointWorkouts],
    );

    const handleClickMyPopularType = useCallback(() => {
        const trainingType = getMostPopularWorkoutType(userTrainingsList);

        setClickMyChoiceBtn(true);
        getUsersForJointWorkouts({ trainingType });
    }, [getUsersForJointWorkouts, userTrainingsList]);

    const goBack = () => setShowRandomUsersList(false);

    useEffect(() => {
        if (isError) {
            getModalErr(
                ModalErrTypes.GET_TRAININHG_LIST,
                isClickMyChoiceBtn ? handleClickMyPopularType : handleClickRandomBtn,
            );
        }
        if (isSuccess) {
            setShowRandomUsersList(true);
        }
    }, [
        handleClickMyPopularType,
        handleClickRandomBtn,
        isClickMyChoiceBtn,
        isError,
        isFetching,
        isSuccess,
    ]);

    if (isShowRandomUsersList) {
        return <JointTrainingList handleGoBackClick={goBack} />;
    }

    return (
        <Fragment>
            {!!invites.length && isShowBlock && <MessageList />}
            {isShowBlock && (
                <Info
                    handleRandomChoise={handleClickRandomBtn}
                    handleMyTypeChoise={handleClickMyPopularType}
                />
            )}
            <PartnersList />
        </Fragment>
    );
};
