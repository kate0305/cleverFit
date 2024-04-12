import { useEffect, useState } from 'react';
import { Form } from 'antd';
import { FormProviderProps } from 'antd/lib/form/context';
import dayjs, { Dayjs } from 'dayjs';
import { setAlert, toggleDrawer } from '@redux/redusers/app-slice';
import {
    resetJointTrainingDarwerData,
    selectJointTrainingData,
} from '@redux/redusers/training-partners-slice';
import { resetEditTrainingData, selectTrainingData } from '@redux/redusers/trainings-slice';

import { useAppDispatch, useAppSelector } from '@hooks/index';
import { useSendInviteMutation } from '@services/invite-service';
import { useCreateTrainingMutation, useEditTrainingMutation } from '@services/training-service';
import { AlertMessage } from '@type/alert-message';
import { ModalErrTypes } from '@type/modal-types';
import { checkIsPastDate } from '@utils/check-is-past-date';

import { ExersiceFormValues } from '@components/form/add-training-form/add-training-form';
import { getModalErr } from '@components/modal-window/modal-err/modal-err';

import { periodOptions, WorkoutFormData } from './data';

export const useCreateWorkout = () => {
    const dispatch = useAppDispatch();
    const { userTrainingsList, editTrainingData } = useAppSelector(selectTrainingData);
    const { isJointWorkout, trainingName, userId } = useAppSelector(selectJointTrainingData);

    const [form] = Form.useForm<Record<string, ExersiceFormValues[]>>();
    const [traningForm] = Form.useForm<WorkoutFormData>();

    const [selectedTraining, setSelectedTraining] = useState(trainingName || '');
    const [selectedDate, setselectedDate] = useState<Dayjs>();
    const [isPeriodical, setIsPeriodicaly] = useState(false);
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

    const closeDrawer = () => {
        if (isEditMode) {
            dispatch(resetEditTrainingData());
        }
        if (isJointWorkout) {
            dispatch(resetJointTrainingDarwerData());
        }
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

    const onFinish = async ({ training, date, isPeriodically, periodically }: WorkoutFormData) => {
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

    const onFormValuesChange = (changedValues: WorkoutFormData) => {
        const formFieldName = Object.keys(changedValues)[0];

        if (formFieldName === 'isPeriodically') {
            setIsPeriodicaly(changedValues.isPeriodically);
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

    useEffect(() => {
        if (isJointWorkout) setSelectedTraining(trainingName);
    }, [isJointWorkout, trainingName]);

    useEffect(() => {
        if (createTrainingErr || editTrainingErr || sendInviteErr) {
            getModalErr(ModalErrTypes.SAVE_TRAINING);
        }
        if (createTrainingSucc) {
            dispatch(setAlert({ isShowAlert: true, message: AlertMessage.ADD_NEW_WORKOUT }));
        }
        if (editTrainingSucc) {
            dispatch(setAlert({ isShowAlert: true, message: AlertMessage.EDIT_WORKOUT }));
        }
    }, [
        createTrainingErr,
        createTrainingSucc,
        dispatch,
        editTrainingErr,
        editTrainingSucc,
        sendInviteErr,
    ]);

    return {
        form,
        traningForm,
        selectedTraining,
        selectedDate,
        editWorkout,
        isPeriodical,
        isSaveBtnDisabled,
        initialValues,
        closeDrawer,
        handleChangeSelect,
        onFinish,
        onFormValuesChange,
        onFormProviderChange,
        handleSaveBtnClick,
    };
};
