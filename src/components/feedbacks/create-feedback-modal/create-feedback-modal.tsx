import { Dispatch, useState } from 'react';
import { Form, Input } from 'antd';
import { selectReviewData, setReviewData } from '@redux/redusers/user-data-slice';

import { useAppDispatch, useAppSelector } from '@hooks/index';
import { useCreateFeedbackMutation } from '@services/feedbacks-service';
import { FeedbackReq } from '@type/service';

import { PrimaryBtn } from '@components/buttons/primary-button';
import { ModalWindow } from '@components/modal-window';
import { Rating } from '@components/rating';

import styles from './create-feedback-modal.module.scss';

type ReviewProps = {
    isOpen: boolean;
    setOpenModal: Dispatch<React.SetStateAction<boolean>>;
    setOpenSuccessPostModal: Dispatch<React.SetStateAction<boolean>>;
    setOpenErrPostModal: Dispatch<React.SetStateAction<boolean>>;
};

export const CreateReviewModal = ({
    isOpen,
    setOpenModal,
    setOpenSuccessPostModal,
    setOpenErrPostModal,
}: ReviewProps) => {
    const dispatch = useAppDispatch();
    const savedReviewData = useAppSelector(selectReviewData);
    const [postFeedback] = useCreateFeedbackMutation();

    const [form] = Form.useForm<FeedbackReq>();
    const [rating, setRating] = useState(savedReviewData?.rating);

    const closeModal = () => setOpenModal(false);

    const onSubmit = async (values: FeedbackReq) => {
        dispatch(setReviewData(values));
        await postFeedback(values);
        try {
            await postFeedback(values).unwrap();
            setOpenSuccessPostModal(true);
        } catch {
            setOpenErrPostModal(true);
        } finally {
            closeModal();
        }
    };

    return (
        <ModalWindow
            isOpen={isOpen}
            closable={true}
            title='Ваш отзыв'
            okText='Опубликовать'
            className={styles.wrapper}
            onOk={form.submit}
            onCancel={closeModal}
            maskStyle={{ background: 'rgba(121, 156, 212, 0.10)', backdropFilter: 'blur(6px)' }}
            footer={
                <PrimaryBtn
                    type='primary'
                    htmlType='submit'
                    btnText='Опубликовать'
                    disabled={!rating}
                    onClick={form.submit}
                    className={styles.btn}
                    dataTestId='new-review-submit-button'
                />
            }
        >
            <Form
                form={form}
                name='create-feedback'
                initialValues={{
                    ...savedReviewData,
                }}
                onFinish={onSubmit}
            >
                <Form.Item name='rating' rules={[{ required: true, message: '' }]}>
                    <Rating size='24' onChange={setRating} value={rating} />
                </Form.Item>
                <Form.Item name='message'>
                    <Input.TextArea
                        placeholder='Расскажите, почему Вам понравилось наше приложение'
                        className={styles.textarea}
                    />
                </Form.Item>
            </Form>
        </ModalWindow>
    );
};
