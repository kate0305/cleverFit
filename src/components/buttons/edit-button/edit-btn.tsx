import { Button } from 'antd';
import { setEditTrainingData } from '@redux/redusers/trainings-slice';

import { EditOutlined, EditTwoTone } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';

import styles from './edit-btn.module.scss';

type EditBtnProps = {
    index: number;
    onClick?: () => void;
    disabled?: boolean;
    fromModalDay?: boolean;
    size?: string;
};

export const EditBtn = ({ index, onClick, size, disabled, fromModalDay }: EditBtnProps) => {
    const dispatch = useAppDispatch();

    const handleCLick = () => {
        if (fromModalDay) {
            dispatch(setEditTrainingData({ isEditMode: true, editTrainingIndex: index }));
        }
        if (onClick) onClick();
    };

    return (
        <Button
            block={true}
            icon={
                disabled ? (
                    <EditTwoTone
                        twoToneColor={['#bfbfbf', '#bfbfbf']}
                        style={{ fontSize: `${size || 18}px` }}
                    />
                ) : (
                    <EditOutlined style={{ color: '#2f54eb', fontSize: `${size || 18}px` }} />
                )
            }
            onClick={handleCLick}
            disabled={disabled}
            className={styles.button}
            data-test-id={`modal-update-training-edit-button${index}`}
        />
    );
};
