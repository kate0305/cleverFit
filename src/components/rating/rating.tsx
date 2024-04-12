import { Rate } from 'antd';

import { StarFilled, StarOutlined } from '@ant-design/icons';

import styles from './rating.module.scss';

type RatingProps = {
    size: string;
    defaultValue?: number;
    disabled?: boolean;
    value?: number;
    onChange?: (value: number) => void;
};

export const Rating = ({ disabled, defaultValue, size, value, onChange }: RatingProps) => (
    <Rate
        value={value}
        onChange={onChange}
        disabled={disabled}
        defaultValue={defaultValue}
        style={{ fontSize: `${size}px` }}
        character={({ value, index = 0 }) =>
            value && value > index ? (
                <StarFilled style={{ color: 'var(--light-warning)' }} />
            ) : (
                <StarOutlined style={{ color: 'var(--light-warning)' }} />
            )
        }
        className={styles.rating}
    />
);
