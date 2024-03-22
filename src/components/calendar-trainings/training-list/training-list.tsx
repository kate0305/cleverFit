import { Badge } from 'antd';

import { BadgeColors, UserTraining } from '@type/training';

import { EditBtn } from '@components/buttons/edit-button';

import styles from './training-list.module.scss';

type TrainingListProps = {
    trainingsListForSelectedDay: UserTraining[];
    fromModalDay?: boolean;
    onClick?: () => void;
    isInCalendar?: boolean;
    isLaptop?: boolean;
};

export const TrainingList = ({
    onClick,
    trainingsListForSelectedDay,
    fromModalDay,
    isInCalendar,
    isLaptop,
}: TrainingListProps) => {
    const getClassName = (isImplementation: boolean) => {
        if (isImplementation) return styles.training_disabled;
        if (isInCalendar) return styles.training;

        return styles.training_modal;
    };

    return (
        !!trainingsListForSelectedDay.length && (
            <ul className={isInCalendar ? styles.wrapper : styles.wrap_modal}>
                {trainingsListForSelectedDay.map(({ name, isImplementation }, index) =>
                    !isLaptop && isInCalendar ? (
                        <div className={styles.mobile_day} key={name} />
                    ) : (
                        <li key={name} className={getClassName(isImplementation)}>
                            <Badge
                                color={BadgeColors[name as keyof typeof BadgeColors]}
                                text={name}
                            />
                            {!isInCalendar && (
                                <EditBtn
                                    index={index}
                                    onClick={onClick}
                                    disabled={isImplementation}
                                    fromModalDay={fromModalDay}
                                />
                            )}
                        </li>
                    ),
                )}
            </ul>
        )
    );
};
