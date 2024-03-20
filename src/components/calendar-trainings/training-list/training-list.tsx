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
}: TrainingListProps) => (
    <>
        {trainingsListForSelectedDay && (

            <ul className={isInCalendar ? styles.wrapper : styles.wrap_modal}>
                {trainingsListForSelectedDay.map(({ name, isImplementation }, index) =>
                    !isLaptop && isInCalendar ? (
                        <div className={styles.mobile_day} key={name} />
                    ) : (
                        <li
                            key={name}
                            className={
                                isImplementation
                                    ? styles.training_disabled
                                    : isInCalendar
                                    ? styles.training
                                    : styles.training_modal
                            }
                        >
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
        )}
    </>
);
