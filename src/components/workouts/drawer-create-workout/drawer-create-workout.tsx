import { Checkbox, Form, Select } from 'antd';
import dayjs from 'dayjs';
import { selectIsOpenDrawer } from '@redux/redusers/app-slice';
import { selectJointTrainingData } from '@redux/redusers/training-partners-slice';
import { selectTrainingData } from '@redux/redusers/trainings-slice';

import { DATA_TEST_ID } from '@constants/data-test-id';
import { useAppSelector } from '@hooks/index';
import { DateFormats } from '@type/dates';
import { checkIsPastDate } from '@utils/check-is-past-date';
import { getFormattedDate } from '@utils/get-formatted-date';

import { PrimaryBtn } from '@components/buttons/primary-button';
import { DrawerComponent } from '@components/drawer';
import { DrawerInfo } from '@components/drawer/drawer-info';
import { DrawerNotification } from '@components/drawer/drawer-notification';
import { AddTrainingForm } from '@components/form/add-training-form';
import { DatePickerInput } from '@components/inputs/datepicker-input';
import { DatePickerInputProps } from '@components/inputs/datepicker-input/date-picker-input';
import { SelectTraining } from '@components/select/select-training';

import { getDrawerTitle, periodOptions } from './data';
import { useCreateWorkout } from './use-create-workout';

import styles from './drawer-create-workout.module.scss';

export const DrawerCreateWorkout = () => {
    const {
        form,
        traningForm,
        isPeriodical,
        selectedTraining,
        selectedDate,
        editWorkout,
        isSaveBtnDisabled,
        initialValues,
        closeDrawer,
        handleChangeSelect,
        onFinish,
        onFormValuesChange,
        onFormProviderChange,
        handleSaveBtnClick,
    } = useCreateWorkout();

    const isOpenCreateWorkout = useAppSelector(selectIsOpenDrawer);
    const { userTrainingsList, editTrainingData } = useAppSelector(selectTrainingData);
    const { isJointWorkout, trainingName, userName, imageSrc } =
        useAppSelector(selectJointTrainingData);

    const { isEditMode } = editTrainingData;
    const pastDate = checkIsPastDate(dayjs(editWorkout?.date));

    const disabledDate: DatePickerInputProps['disabledDate'] = (current) =>
        current && current < dayjs().endOf('day');

    const dateCellRender: DatePickerInputProps['dateRender'] = (current) => {
        const style: React.CSSProperties = {};
        const date = getFormattedDate(current, DateFormats.EN);

        if (!!date === Object.prototype.hasOwnProperty.call(userTrainingsList, date)) {
            style.backgroundColor = 'var(--primary-light-1)';
        }

        return (
            <div className='ant-picker-cell-inner' style={style}>
                {current.date()}
            </div>
        );
    };

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
                    dataTestId={DATA_TEST_ID.tariffSubmit}
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
                                dataTestId={DATA_TEST_ID.modalDrawerRightDatePicker}
                            />
                        </Form.Item>

                        <Form.Item name='isPeriodically' valuePropName='checked'>
                            <Checkbox data-test-id={DATA_TEST_ID.modalDrawerRightCheckboxPeriod}>
                                С периодичностью
                            </Checkbox>
                        </Form.Item>
                    </div>

                    {(isPeriodical || editWorkout?.parameters?.repeat) && (
                        <Form.Item name='periodically' className={styles.select_petiod}>
                            <Select
                                options={periodOptions}
                                size='small'
                                data-test-id={DATA_TEST_ID.modalDrawerRightSelectPeriod}
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

                {isEditMode && pastDate && <DrawerNotification />}
            </Form.Provider>
        </DrawerComponent>
    );
};
