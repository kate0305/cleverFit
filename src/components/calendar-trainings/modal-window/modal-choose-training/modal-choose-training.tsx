import { Fragment, useMemo, useState } from 'react';
import { Dayjs } from 'dayjs';
import {
    resetTraining,
    selectTrainingData,
    setEditTrainingData,
    setEditTrainingId,
} from '@redux/redusers/trainings-slice';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { BadgeColors, ExerciseData, UserTraining } from '@type/training';
import { checkIsPastDate } from '@utils/check-is-past-date';

import { EditBtn } from '@components/buttons/edit-button';
import { PrimaryBtn } from '@components/buttons/primary-button';
import { DrawerAddExercise } from '@components/calendar-trainings/drawer-add-exercise';
import { ContentCard } from '@components/content-card';
import { EmptyBlock } from '@components/empty-block';
import { SelectTraining } from '@components/select/select-training';

import styles from './modal-choose-training.module.scss';

type ModalChooseTrainingProps = {
    date: Dayjs;
    saveTraining?: () => Promise<void>;
    setCloseModal: () => void;
    trainingsListForSelectedDay: UserTraining[];
    isRightModalPosition?: boolean;
    fromTrainingPage?: boolean;
    workoutName?: string;
    exercisesList?: ExerciseData[];
    className?: string;
    addExercise?: () => void;
};

export const ModalChooseTraining = ({
    date,
    saveTraining,
    setCloseModal,
    trainingsListForSelectedDay,
    isRightModalPosition,
    fromTrainingPage,
    workoutName,
    exercisesList,
    className,
    addExercise,
}: ModalChooseTrainingProps) => {
    const dispatch = useAppDispatch();
    const { updateTrainingLoading, training, editTrainingData } =
        useAppSelector(selectTrainingData);

    const { exercises } = training;
    const { isEditMode, editTrainingIndex } = editTrainingData;

    const [isOpenAddExercise, setOpenAddExercise] = useState(false);
    const [selectedTraining, setSelectedTraining] = useState<string | null>(null);

    const pastDate = checkIsPastDate(date);
    const isHaveDayExercise = useMemo(() => exercises?.find(({ name }) => name), [exercises]);

    const { _id: editTrainingId, exercises: editTrainingExercise } =
        trainingsListForSelectedDay[editTrainingIndex] ?? [];

    const dayTrainingList = useMemo(
        () => trainingsListForSelectedDay?.map(({ name }) => name),
        [trainingsListForSelectedDay],
    );

    const getExerciseForRender = () => {
        if (isEditMode && editTrainingExercise && !isHaveDayExercise) {
            return editTrainingExercise;
        }
        if (isEditMode && editTrainingExercise && isHaveDayExercise) {
            return exercises;
        }
        if (selectedTraining && isHaveDayExercise) {
            return exercises;
        }
        if (fromTrainingPage) {
            return exercisesList;
        }

        return null;
    };

    const exerciseForRender = getExerciseForRender();

    const handleChangeSelect = (trainingName: string) => {
        setSelectedTraining(trainingName);
        if (isEditMode) {
            dispatch(setEditTrainingData({ isEditMode: false, editTrainingIndex: 0 }));
        }
    };

    const closeModal = () => {
        dispatch(resetTraining());
        setCloseModal();
    };

    const openAddExercise = () => {
        if (isEditMode) {
            dispatch(setEditTrainingId({ editTrainingId }));
        }
        setOpenAddExercise(true);
    };

    const handleSaveBtn = async () => {
        if (saveTraining) {
            await saveTraining();
        }
        closeModal();
    };

    return (
        <Fragment>
            <ContentCard
                className={
                    className || (isRightModalPosition ? styles.wrapper_last_day : styles.wrapper)
                }
                title={
                    <div className={styles.title}>
                        <PrimaryBtn
                            type='text'
                            icon={<ArrowLeftOutlined />}
                            onClick={closeModal}
                            dataTestId='modal-exercise-training-button-close'
                            className={styles.btn_close}
                        />
                        {fromTrainingPage ? (
                            <p className={styles.workout_name}>{workoutName}</p>
                        ) : (
                            <SelectTraining
                                trainingsListForSelectedDay={trainingsListForSelectedDay}
                                handleChangeSelect={handleChangeSelect}
                                className={styles.select}
                            />
                        )}
                    </div>
                }
                actions={[
                    <PrimaryBtn
                        btnText='Добавить упражнения'
                        htmlType='button'
                        className={styles.btn_add}
                        disabled={!fromTrainingPage && !selectedTraining && !editTrainingExercise}
                        onClick={addExercise || openAddExercise}
                    />,
                    !fromTrainingPage && (
                        <PrimaryBtn
                            type='link'
                            btnText={pastDate ? 'Сохранить изменения' : 'Сохранить'}
                            htmlType='button'
                            loading={updateTrainingLoading}
                            onClick={handleSaveBtn}
                            className={styles.btn_save}
                            disabled={!isHaveDayExercise}
                        />
                    ),
                ]}
                headStyle={
                    fromTrainingPage
                        ? {
                              borderBottom: `2px solid ${
                                  BadgeColors[workoutName as keyof typeof BadgeColors]
                              }`,
                          }
                        : {}
                }
                dataTestId='modal-create-exercise'
            >
                {exerciseForRender ? (
                    <ul className={styles.content}>
                        {exerciseForRender.map(({ name }, index) => (
                            <li className={styles.exircise} key={name}>
                                <p className={styles.name} key={name}>
                                    {name}
                                </p>
                                {!fromTrainingPage && (
                                    <EditBtn index={index} onClick={openAddExercise} />
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <EmptyBlock />
                )}
            </ContentCard>
            <DrawerAddExercise
                date={date}
                isOpenDrawer={isOpenAddExercise}
                trainingName={selectedTraining ?? dayTrainingList[editTrainingIndex]}
                trainingsListForSelectedDay={trainingsListForSelectedDay}
                setCloseDrawer={setOpenAddExercise}
            />
        </Fragment>
    );
};
