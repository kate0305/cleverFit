import { Dispatch, useEffect, useState } from 'react';
import { Checkbox, Form, Select } from 'antd';
import { FormProviderProps } from 'antd/lib/form/context';
import dayjs, { Dayjs } from 'dayjs';
import { selectIsOpenDrawer, toggleDrawer } from '@redux/redusers/app-slice';
import {
    resetJointTrainingDarwerData,
    selectJointTrainingData,
} from '@redux/redusers/training-partners-slice';
import { resetEditTrainingData, selectTrainingData } from '@redux/redusers/trainings-slice';

import { useAppDispatch, useAppSelector } from '@hooks/index';
import { useSendInviteMutation } from '@services/invite-service';
import { useCreateTrainingMutation, useEditTrainingMutation } from '@services/training-service';
import { AlertMessage } from '@type/alert-message';
import { DateFormats } from '@type/dates';
import { ModalErrTypes } from '@type/modal-types';
import { checkIsPastDate } from '@utils/check-is-past-date';
import { getFormattedDate } from '@utils/get-formatted-date';

import { PrimaryBtn } from '@components/buttons/primary-button';
import { DrawerComponent } from '@components/drawer';
import { DrawerInfo } from '@components/drawer/drawer-info';
import { AddTrainingForm } from '@components/form/add-training-form';
import { ExersiceFormValues } from '@components/form/add-training-form/add-training-form';
import { DatePickerInput } from '@components/inputs/datepicker-input';
import { DatePickerInputProps } from '@components/inputs/datepicker-input/date-picker-input';
import { getModalErr } from '@components/modal-window/modal-err/modal-err';
import { SelectTraining } from '@components/select/select-training';

import { getDrawerTitle, periodOptions } from './data';

import styles from './drawer-create-workout.module.scss';

type FormData = {
    date: string;
    training: string;
    isPeriodically: boolean;
    periodically: number;
};

type DrawerCreateWorkoutProps = {
    setAlertMessage: Dispatch<React.SetStateAction<string>>;
};

export const DrawerCreateWorkout = ({ setAlertMessage }: DrawerCreateWorkoutProps) => {
    const dispatch = useAppDispatch();
    const isOpenCreateWorkout = useAppSelector(selectIsOpenDrawer);
    const { userTrainingsList, editTrainingData } = useAppSelector(selectTrainingData);
    const { isJointWorkout, trainingName, userId, userName, imageSrc } =
        useAppSelector(selectJointTrainingData);

    const [form] = Form.useForm<Record<string, ExersiceFormValues[]>>();
    const [traningForm] = Form.useForm<FormData>();

    const [selectedTraining, setSelectedTraining] = useState(trainingName || '');
    const [selectedDate, setselectedDate] = useState<Dayjs>();
    const [isPeriodically, setPeriodically] = useState(false);
    const [isHasExercise, setHasExercise] = useState('');

    const { isEditMode, editTrainingId } = editTrainingData;

    const editWorkout = Object.values(userTrainingsList)
        .flat()
        .find(({ _id }) => _id === editTrainingId);

    const [createTraining, { isError: createTrainingErr, isSuccess: createTrainingSucc }] =
        useCreateTrainingMutation();

    const [editTraining, { isError: editTrainingErr, isSuccess: editTrainingSucc }] =
        useEditTrainingMutation();

    const [sendInvite, { isError: sendInviteErr }] = useSendInviteMutation();

    const isSaveBtnDisabled = !(selectedTraining && selectedDate && isHasExercise);

    const handleChangeSelect = (training: string) => {
        setSelectedTraining(training);
        traningForm.setFieldsValue({ training });
    };

    const pastDate = checkIsPastDate(dayjs(editWorkout?.date));

    const closeDrawer = () => {
        if (isEditMode) dispatch(resetEditTrainingData());
        if (isJointWorkout) dispatch(resetJointTrainingDarwerData());
        dispatch(toggleDrawer());
    };

    const initialValues = editWorkout
        ? {
              date: dayjs(editWorkout?.date),
              training: editWorkout?.name,
              isPeriodically: editWorkout?.parameters?.repeat,
              periodically: editWorkout?.parameters?.period || periodOptions[0].value,
              fields: editWorkout.exercises,
          }
        : { periodically: periodOptions[0] };

    const onFinish = async ({ training, date, isPeriodically, periodically }: FormData) => {
        const exercises = form.getFieldsValue();
        const exercisesData = [...exercises.fields].filter((value) => value.name);

        const reqData = {
            name: training ?? trainingName,
            date: dayjs(date).toISOString(),
            parameters: {
                repeat: isPeriodically,
                period: isPeriodically ? periodically : undefined,
            },
            exercises: exercisesData,
            isImplementation: checkIsPastDate(dayjs(date)),
        };

        if (isEditMode) {
            await editTraining({ id: editTrainingId, ...reqData });
        } else if (isJointWorkout) {
            await sendInvite({ trainingData: reqData, inviteData: { to: userId } });
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
        if (isJointWorkout) setSelectedTraining(trainingName);
    }, [isJointWorkout, trainingName]);

    useEffect(() => {
        if (createTrainingErr || editTrainingErr || sendInviteErr) {
            getModalErr(ModalErrTypes.SAVE_TRAINING);
        }
        if (createTrainingSucc) setAlertMessage(AlertMessage.ADD_NEW_WORKOUT);
        if (editTrainingSucc) setAlertMessage(AlertMessage.EDIT_WORKOUT);
    }, [
        createTrainingErr,
        createTrainingSucc,
        editTrainingErr,
        editTrainingSucc,
        sendInviteErr,
        setAlertMessage,
    ]);

    return (
        <DrawerComponent
            isOpenDrawer={isOpenCreateWorkout}
            setCloseDrawer={closeDrawer}
            titleChildren={getDrawerTitle(isEditMode, isJointWorkout)}
            footer={
                <PrimaryBtn
                    type='primary'
                    btnText={isJointWorkout ? 'Отправить приглашение' : 'Сохранить'}
                    htmlType='submit'
                    className={styles.btn_save}
                    disabled={isSaveBtnDisabled && !isEditMode}
                    onClick={handleSaveBtnClick}
                    dataTestId='tariff-submit'
                />
            }
        >
            {isJointWorkout && (
                <DrawerInfo
                    trainingName={trainingName ?? ''}
                    userName={userName}
                    imageSrc={imageSrc}
                    isJointDrawer={isJointWorkout}
                />
            )}
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
                    {!isJointWorkout && (
                        <Form.Item name='training' className={styles.select}>
                            <SelectTraining
                                handleChangeSelect={handleChangeSelect}
                                trainingsListForSelectedDay={[]}
                                className={styles.select}
                                size='small'
                                defaultValue={editWorkout?.name}
                            />
                        </Form.Item>
                    )}

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
                    btnText={isEditMode ? 'Добавить ещё' : 'Добавить ещё упражнение'}
                    fromWorkoutsPage={true}
                    exercisesList={editWorkout?.exercises}
                />

                {isEditMode && pastDate && (
                    <p className={styles.watning}>
                        После сохранения внесенных изменений отредактировать проведенную тренировку
                        будет невозможно
                    </p>
                )}
            </Form.Provider>
        </DrawerComponent>
    );
};
