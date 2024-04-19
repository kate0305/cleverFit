import { Dispatch, Fragment, useState } from 'react';
import { Dayjs } from 'dayjs';
import { selectTrainingData } from '@redux/redusers/trainings-slice';

import { FRIDAY_NUMBER_FOR_LOCAL, LG_WIDTH, SATURDAY_NUMBER_FOR_LOCAL, SUNDAY_NUMBER_FOR_LOCAL } from '@constants/index';
import { useAppSelector } from '@hooks/index';
import { DateFormats } from '@type/dates';
import { getFormattedDate } from '@utils/get-date';
import { useMediaQuery } from '@utils/use-media-query';

import { ModalChooseTraining } from '../modal-choose-training';
import { ModalDay } from '../modal-day';

type ModalContainerProps = {
    date: Dayjs;
    setClosePortal: Dispatch<React.SetStateAction<Element | null>>;
    saveTraining: () => Promise<void>;
};

export const ModalContainer = ({ date, setClosePortal, saveTraining }: ModalContainerProps) => {
    const isMiddleScreen = useMediaQuery('(max-width: 1200px)');
    const isTablet = useMediaQuery(`(max-width: ${LG_WIDTH})`);

    const getDayOfWeek = date.weekday();

    const isRightModalPosition =
        getDayOfWeek === SUNDAY_NUMBER_FOR_LOCAL ||
        (getDayOfWeek === SATURDAY_NUMBER_FOR_LOCAL && isMiddleScreen) ||
        (getDayOfWeek === FRIDAY_NUMBER_FOR_LOCAL && isTablet);

    const { appTrainingList, userTrainingsList } = useAppSelector(selectTrainingData);

    const trainingsListForSelectedDay =
        userTrainingsList[getFormattedDate(date, DateFormats.EN)] ?? [];

    const [isOpenCreateTraining, setOpenCreateTraining] = useState(true);
    const [isOpenChooseTraining, setOpenChooseTraining] = useState(false);

    const openChooseTraining = () => {
        setOpenCreateTraining(false);
        setOpenChooseTraining(true);
    };

    const openCreateTraining = () => {
        setOpenChooseTraining(false);
        setOpenCreateTraining(true);
    };

    return (
        <Fragment>
            {isOpenCreateTraining && (
                <ModalDay
                    date={date}
                    setCloseModal={setClosePortal}
                    openChooseTraining={openChooseTraining}
                    trainingsListForSelectedDay={trainingsListForSelectedDay}
                    appTrainingList={appTrainingList}
                    isRightModalPosition={isRightModalPosition}
                />
            )}
            {isOpenChooseTraining && (
                <ModalChooseTraining
                    setCloseModal={openCreateTraining}
                    date={date}
                    saveTraining={saveTraining}
                    trainingsListForSelectedDay={trainingsListForSelectedDay}
                    isRightModalPosition={isRightModalPosition}
                />
            )}
        </Fragment>
    );
};
