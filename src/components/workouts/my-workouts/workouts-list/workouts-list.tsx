import { Fragment, useState } from 'react';
import { Badge, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import dayjs from 'dayjs';
import {
    selectTrainingData,
    setEditTrainingData,
    setEditTrainingId,
} from '@redux/redusers/trainings-slice';

import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { BadgeColors, UserTraining } from '@type/training';
import { getElement } from '@utils/get-target-element';
import { getWorkoutPeriodName } from '@utils/get-workout-period-name';

import { EditBtn } from '@components/buttons/edit-button';
import { PrimaryBtn } from '@components/buttons/primary-button';
import { ModalChooseTraining } from '@components/calendar-trainings/modal-window/modal-choose-training';
import { Portal } from '@components/portal';

import styles from './workouts-list.module.scss';

type WorkoutsListProps = {
    handleClick: () => void;
};

export const WorkoutsList = ({ handleClick }: WorkoutsListProps) => {
    const dispatch = useAppDispatch();
    const { userTrainingsList } = useAppSelector(selectTrainingData);

    const [isShowPortal, setShowPortal] = useState('');

    const workoutList = Object.values(userTrainingsList)
        .flat()
        // eslint-disable-next-line no-underscore-dangle
        .map((workout) => ({ ...workout, key: workout._id }));

    const closeModal = () => setShowPortal('');

    const handleModalBtnClick = (index: number, editTrainingId: string) => {
        dispatch(setEditTrainingData({ isEditMode: true, editTrainingIndex: index }));
        dispatch(setEditTrainingId({ editTrainingId: editTrainingId || '' }));
        handleClick();
    };

    const columns: ColumnsType<Partial<UserTraining>> = [
        {
            title: 'Тип тренировки',
            dataIndex: 'type',
            key: 'type',
            render: (_, { _id, name, date, exercises }, index) => (
                <div id={_id} className={styles.training_type}>
                    <Badge color={BadgeColors[name as keyof typeof BadgeColors]} text={name} />
                    <PrimaryBtn
                        type='link'
                        icon={<DownOutlined style={{ fontSize: '10px' }} />}
                        className={styles.btn_down}
                        onClick={() => setShowPortal(_id || '')}
                    />
                    {isShowPortal === _id && (
                        <Portal
                            element={
                                <ModalChooseTraining
                                    date={dayjs(date)}
                                    trainingsListForSelectedDay={[]}
                                    workoutName={name}
                                    exercisesList={exercises}
                                    setCloseModal={closeModal}
                                    fromTrainingPage={true}
                                    className={styles.portal}
                                    addExercise={() => handleModalBtnClick(index, _id)}
                                />
                            }
                            container={getElement(`[id='${_id}']`) || document.body}
                        />
                    )}
                </div>
            ),
        },
        {
            title: 'Периодичность',
            dataIndex: 'periodicity',
            key: 'periodicity',
            render: (_, { parameters }) => <div>{getWorkoutPeriodName(parameters?.period)}</div>,
            sorter: (a, b) => (a.parameters?.period ?? 0) - (b.parameters?.period ?? 0),
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: '',
            dataIndex: 'edit',
            key: 'edit',
            width: 32,
            render: (_, { _id, isImplementation }, index) => (
                <EditBtn
                    index={index}
                    fromWorkoutsPage={true}
                    editTrainingId={_id}
                    disabled={isImplementation}
                    size='28'
                    onClick={handleClick}
                />
            ),
        },
    ];

    return (
        <Fragment>
            <Table
                columns={columns}
                dataSource={workoutList}
                pagination={{
                    position: ['bottomLeft'],
                    hideOnSinglePage: true,
                }}
                tableLayout='fixed'
                size='small'
                rowClassName={styles.row}
                className={styles.wrapper}
                data-test-id='my-trainings-table'
            />
            <PrimaryBtn
                type='primary'
                icon={<PlusOutlined style={{ fontSize: '14px' }} />}
                onClick={handleClick}
                btnText='Новая тренировка'
                className={styles.btn_add}
                dataTestId='create-new-training-button'
            />
        </Fragment>
    );
};
