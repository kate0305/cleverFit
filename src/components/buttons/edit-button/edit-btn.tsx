import { Button, ButtonProps } from 'antd';
import { setEditTrainingData, setEditTrainingId } from '@redux/redusers/trainings-slice';

import { EditOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';

import styles from './edit-btn.module.scss';

type EditBtnProps = ButtonProps & {
    index: number;
    onClick?: () => void;
    fromModalDay?: boolean;
    fromWorkoutsPage?: boolean;
    editTrainingId?: string;
    size?: string;
};

export const EditBtn = ({
    index,
    onClick,
    size,
    disabled,
    fromModalDay,
    fromWorkoutsPage,
    editTrainingId,
}: EditBtnProps) => {
    const dispatch = useAppDispatch();

    const handleCLick = () => {
        if (fromModalDay) {
            dispatch(setEditTrainingData({ isEditMode: true, editTrainingIndex: index }));
        }
        if (fromWorkoutsPage) {
            dispatch(setEditTrainingData({ isEditMode: true, editTrainingIndex: index }));
            dispatch(setEditTrainingId({ editTrainingId: editTrainingId || '' }));
        }
        if (onClick) onClick();
    };

    return (
        <Button
            block={true}
            icon={
                disabled ? (
                    <EditOutlined
                        style={{ color: 'var(--light-disable-25)', fontSize: `${size || 18}px` }}
                    />
                ) : (
                    <EditOutlined
                        style={{ color: 'var(--primary-light-6)', fontSize: `${size || 18}px` }}
                    />
                )
            }
            onClick={handleCLick}
            disabled={disabled}
            className={styles.button}
            data-test-id={
                fromWorkoutsPage
                    ? `update-my-training-table-icon${index}`
                    : `modal-update-training-edit-button${index}`
            }
        />
    );
};
