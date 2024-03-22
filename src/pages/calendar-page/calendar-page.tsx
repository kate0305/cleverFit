import { useEffect, useLayoutEffect, useState } from 'react';
import { CalendarProps } from 'antd';
import ru from 'antd/es/calendar/locale/ru_RU';
import dayjs, { Dayjs } from 'dayjs';
import { selectTrainingData } from '@redux/redusers/trainings-slice';

import { MD_WIDTH } from '@constants/index';
import { useAppSelector } from '@hooks/index';
import {
    useCreateTrainingMutation,
    useEditTrainingMutation,
    useLazyGetTrainingListQuery,
    useLazyGetUserTrainingsQuery,
} from '@services/training-service';
import { DateFormats } from '@type/dates';
import { ModalErrTypes } from '@type/modal-types';
import { getFormattedDate } from '@utils/get-formatted-date';
import { getTargetElement } from '@utils/get-target-element';
import { useMediaQuery } from '@utils/use-media-query';

import { SettingsBtn } from '@components/buttons/settings-button';
import { Calendar } from '@components/calendar-trainings/calendar';
import { ModalContainer } from '@components/calendar-trainings/modal-window/modal-container';
import { getModalErr } from '@components/calendar-trainings/modal-window/modal-err/modal-err';
import { TrainingList } from '@components/calendar-trainings/training-list';
import { Portal } from '@components/portal';

import styles from './calendar-page.module.scss';

const locale: typeof ru = {
    ...ru,
    lang: {
        ...ru.lang,
        dateFormat: DateFormats.LOCAL,
    },
};

export const CalendarPage = () => {
    const { userTrainingsList, editTrainingData, training } = useAppSelector(selectTrainingData);

    const isLaptop = useMediaQuery(`(min-width: ${MD_WIDTH})`);

    const [isShowPortal, setShowPortal] = useState<Element | null>(null);
    const [selectedDay, setSelectedDay] = useState(dayjs());
    const [selectedMonth, setSelectedMonth] = useState(dayjs().month());

    const onPanelChange = (date: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
        if (mode === 'month') {
            setSelectedMonth(date.month());
        }
    };

    const selectDate = (date: Dayjs) => {
        if (date.month() === selectedMonth) {
            setSelectedDay(date);
            const parentElem = getTargetElement(date, DateFormats.EN);

            setShowPortal(parentElem);
        }
        if (isLaptop && date.month() !== selectedMonth) {
            setShowPortal(null);
        }
    };

    const dateCellRender = (date: Dayjs) => {
        const trainingsListForSelectedDay =
            userTrainingsList[getFormattedDate(date, DateFormats.EN)] ?? [];

        return (
            <TrainingList
                isInCalendar={true}
                trainingsListForSelectedDay={trainingsListForSelectedDay}
                isLaptop={isLaptop}
            />
        );
    };

    const [getUserTraining] = useLazyGetUserTrainingsQuery();

    const [getTrainingList, { isError }] = useLazyGetTrainingListQuery();

    const [createTraining, { isError: createTrainingErr, isSuccess: createTrainingSucc }] =
        useCreateTrainingMutation();

    const [editTraining, { isError: updateTrainingErr, isSuccess: updateTrainingSucc }] =
        useEditTrainingMutation();

    const saveTraining = async () => {
        setShowPortal(null);
        if (editTrainingData.isEditMode) {
            const trainingData = {
                id: editTrainingData.editTrainingId,
                ...training,
            };

            await editTraining(trainingData);
        } else {
            await createTraining(training);
        }
    };

    useLayoutEffect(() => {
        getTrainingList();
    }, [getTrainingList]);

    useEffect(() => {
        if (isError) {
            getModalErr(ModalErrTypes.GET_TRAININHG_LIST, getTrainingList);
        }
    }, [getTrainingList, isError]);

    useEffect(() => {
        if (createTrainingErr || updateTrainingErr) {
            getModalErr(ModalErrTypes.SAVE_TRAINING);
        }
    }, [createTrainingErr, updateTrainingErr]);

    useEffect(() => {
        if (createTrainingSucc || updateTrainingSucc) {
            getUserTraining();
            const parentElem = getTargetElement(selectedDay, DateFormats.EN);

            setShowPortal(parentElem);
        }
    }, [createTrainingSucc, getUserTraining, selectedDay, updateTrainingSucc]);

    return (
        <main className={styles.wrapper}>
            <SettingsBtn className={styles.button} />
            <Calendar
                fullscreen={isLaptop}
                className={styles.calendar}
                onSelect={selectDate}
                onPanelChange={onPanelChange}
                dateCellRender={dateCellRender}
                locale={locale}
            />
            {isShowPortal && (
                <Portal
                    element={
                        <ModalContainer
                            date={selectedDay}
                            setClosePortal={setShowPortal}
                            saveTraining={saveTraining}
                        />
                    }
                    container={isShowPortal}
                />
            )}
        </main>
    );
};
