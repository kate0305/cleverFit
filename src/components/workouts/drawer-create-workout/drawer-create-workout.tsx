import { Dispatch, useEffect, useState } from 'react';
import { Checkbox, Form, Select } from 'antd';
import { FormProviderProps } from 'antd/lib/form/context';
import dayjs, { Dayjs } from 'dayjs';
import { resetEditTrainingData, selectTrainingData } from '@redux/redusers/trainings-slice';

import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { useCreateTrainingMutation, useEditTrainingMutation } from '@services/training-service';
import { AlertMessage } from '@type/alert-message';
import { DateFormats } from '@type/dates';
import { DrawerTitleKeys } from '@type/drawer';
import { ModalErrTypes } from '@type/modal-types';
import { checkIsPastDate } from '@utils/check-is-past-date';
import { getFormattedDate } from '@utils/get-formatted-date';

import { PrimaryBtn } from '@components/buttons/primary-button';
import { DrawerComponent } from '@components/drawer';
import { AddTrainingForm } from '@components/form/add-training-form';
import { ExersiceFormValues } from '@components/form/add-training-form/add-training-form';
import { DatePickerInput } from '@components/inputs/datepicker-input';
import { DatePickerInputProps } from '@components/inputs/datepicker-input/date-picker-input';
import { getModalErr } from '@components/modal-window/modal-err/modal-err';
import { SelectTraining } from '@components/select/select-training';

import { periodOptions } from './data';

import styles from './drawer-create-workout.module.scss';

type FormData = {
    date: string;
    training: string;
    isPeriodically: boolean;
    periodically: number;
};

type DrawerCreateWorkoutProps = {
    isOpenDrawer: boolean;
    setCloseDrawer: Dispatch<React.SetStateAction<boolean>>;
    setAlertMessage: Dispatch<React.SetStateAction<string>>;
};

export const DrawerCreateWorkout = ({
    isOpenDrawer,
    setCloseDrawer,
    setAlertMessage,
}: DrawerCreateWorkoutProps) => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm<Record<string, ExersiceFormValues[]>>();
    const [traningForm] = Form.useForm<FormData>();

    const { userTrainingsList, editTrainingData } = useAppSelector(selectTrainingData);

    const { isEditMode, editTrainingId } = editTrainingData;

    const editWorkout = Object.values(userTrainingsList)
        .flatMap((workouts) => workouts)
        .find(({ _id }) => _id === editTrainingId);

    const [selectedTraining, setSelectedTraining] = useState('');
    const [selectedDate, setselectedDate] = useState<Dayjs>();
    const [isPeriodically, setPeriodically] = useState(false);
    const [isHasExercise, setHasExercise] = useState('');

    const [createTraining, { isError: createTrainingErr, isSuccess: createTrainingSucc }] =
        useCreateTrainingMutation();

    const [editTraining, { isError: editTrainingErr, isSuccess: editTrainingSucc }] =
        useEditTrainingMutation();

    const isSaveBtnDisabled = !(selectedTraining && selectedDate && isHasExercise);

    const handleChangeSelect = (trainingName: string) => {
        setSelectedTraining(trainingName);
        traningForm.setFieldsValue({ training: trainingName });
    };

    const pastDate = checkIsPastDate(dayjs(editWorkout?.date));

    const closeDrawer = () => {
        if (isEditMode) {
            dispatch(resetEditTrainingData());
        }
        setCloseDrawer(false);
    };

    const initialValues = editWorkout
        ? {
              date: dayjs(editWorkout?.date),
              training: editWorkout?.name,
              isPeriodically: editWorkout?.parameters?.repeat,
              periodically: editWorkout?.parameters?.period || periodOptions[0],
              fields: editWorkout.exercises,
          }
        : { periodically: periodOptions[0] };

    const onFinish = async ({ training, date, isPeriodically, periodically }: FormData) => {
        const exercises = form.getFieldsValue();
        const exercisesData = [...exercises.fields].filter((value) => value.name);

        const reqData = {
            name: training,
            date: dayjs(date).toISOString(),
            parameters: {
                repeat: isPeriodically,
                period: isPeriodically ? periodically : 0,
            },
            exercises: exercisesData,
            isImplementation: checkIsPastDate(dayjs(date)),
        };

        if (isEditMode) {
            await editTraining({ id: editTrainingId, ...reqData });
        } else {
            await createTraining(reqData);
        }

        closeDrawer();
    };

    const onFormValuesChange = (changedValues: FormData) => {
        const formFieldName = Object.keys(changedValues)[0];

        if (formFieldName === 'isPeriodically') {
            setPeriodically(changedValues.isPeriodically);
        }
        if (formFieldName === 'date') {
            setselectedDate(changedValues.date ? dayjs(changedValues.date) : undefined);
        }
    };

    const onFormProviderChange: FormProviderProps['onFormChange'] = (name, info) => {
        if (name === 'exercises') {
            const formValues: Record<string, ExersiceFormValues[]> =
                info.forms.exercises.getFieldsValue();
            const isHasExerciseName = formValues.fields.map((value) => value?.name);

            setHasExercise(isHasExerciseName[0]);
        }
    };

    const handleSaveBtnClick = () => traningForm.submit();

    const disabledDate: DatePickerInputProps['disabledDate'] = (current) =>
        current && current < dayjs().endOf('day');

    const dateCellRender: DatePickerInputProps['dateRender'] = (current) => {
        const style: React.CSSProperties = {};
        const date = getFormattedDate(current, DateFormats.EN);

        if (!!date === Object.prototype.hasOwnProperty.call(userTrainingsList, date)) {
            style.backgroundColor = '#f0f5ff';
        }

        return (
            <div className='ant-picker-cell-inner' style={style}>
                {current.date()}
            </div>
        );
    };

    useEffect(() => {
        if (createTrainingErr || editTrainingErr) getModalErr(ModalErrTypes.SAVE_TRAINING);
        if (createTrainingSucc) setAlertMessage(AlertMessage.ADD_NEW_WORKOUT);
        if (editTrainingSucc) setAlertMessage(AlertMessage.EDIT_WORKOUT);
    }, [createTrainingErr, createTrainingSucc, editTrainingErr, editTrainingSucc, setAlertMessage]);

    return (
        <DrawerComponent
                isOpenDrawer={isOpenDrawer}
                setCloseDrawer={closeDrawer}
                titleChildren={
                    isEditMode
                        ? {
                              type: DrawerTitleKeys.EDIT,
                              text: 'Редактирование',
                              icon: <EditOutlined style={{ fontSize: '14px' }} />,
                          }
                        : {
                              type: DrawerTitleKeys.NEW_EXERCISE,
                              text: 'Добавление упражнений',
                              icon: <PlusOutlined style={{ fontSize: '14px' }} />,
                          }
                }
                footer={
                    <PrimaryBtn
                        type='primary'
                        btnText='Сохранить'
                        htmlType='submit'
                        className={styles.btn_save}
                        disabled={isSaveBtnDisabled && !isEditMode}
                        onClick={handleSaveBtnClick}
                        dataTestId='tariff-submit'
                    />
                }
            >
                <Form.Provider onFormChange={onFormProviderChange}>
                    <Form
                        className={styles.body}
                        form={traningForm}
                        initialValues={initialValues}
                        size='small'
                        onValuesChange={onFormValuesChange}
                        onFinish={onFinish}
                        preserve={false}
                        id='workout'
                        name='workout'
                    >
                        <Form.Item name='training' className={styles.select}>
                            <SelectTraining
                                handleChangeSelect={handleChangeSelect}
                                trainingsListForSelectedDay={[]}
                                className={styles.select}
                                size='small'
                                fromDrawer={false}
                                defaultValue={editWorkout?.name}
                            />
                        </Form.Item>

                        <div className={styles.inputs_group}>
                            <Form.Item name='date'>
                                <DatePickerInput
                                    inputName='date'
                                    placeholder='Select date'
                                    showToday={true}
                                    disabledDate={disabledDate}
                                    className={styles.datepicker}
                                    dateRender={dateCellRender}
                                    dataTestId='modal-drawer-right-date-picker'
                                />
                            </Form.Item>

                            <Form.Item name='isPeriodically' valuePropName='checked'>
                                <Checkbox data-test-id='modal-drawer-right-checkbox-period'>
                                    С периодичностью
                                </Checkbox>
                            </Form.Item>
                        </div>

                        {(isPeriodically || editWorkout?.parameters?.repeat) && (
                            <Form.Item name='periodically' className={styles.select_petiod}>
                                <Select
                                    options={periodOptions}
                                    size='small'
                                    data-test-id='modal-drawer-right-select-period'
                                />
                            </Form.Item>
                        )}
                    </Form>
                    <AddTrainingForm
                        form={form}
                        date={selectedDate}
                        trainingName={selectedTraining}
                        trainingsListForSelectedDay={[]}
                        btnText='Добавить ещё упражнение'
                        fromWorkoutsPage={true}
                        exercisesList={editWorkout?.exercises}
                    />

                    {isEditMode && pastDate && (
                        <p className={styles.watning}>
                            После сохранения внесенных изменений отредактировать проведенную
                            тренировку будет невозможно
                        </p>
                    )}
                </Form.Provider>
            </DrawerComponent>
    );
};
