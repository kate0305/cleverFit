import { Badge, Typography } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { CloseOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { DateFormats } from '@type/dates';
import { BadgeColors, Exercise } from '@type/training';
import { getFormattedDate } from '@utils/get-formatted-date';

import { PrimaryBtn } from '@components/buttons/primary-button';
import { ContentCard } from '@components/content-card';

import styles from './workout-details-card.module.scss';

dayjs.extend(relativeTime);

const { Paragraph } = Typography;

type ModalDayProps = {
    date: string;
    workoutName: string;
    exercise: Array<Partial<Exercise>>;
    closeModal: () => void;
};

export const WorkoutDetailsCard = ({ date, workoutName, exercise, closeModal }: ModalDayProps) => {
    const formattedDate = getFormattedDate(date, DateFormats.LOCAL);

    const numberDaysLater = dayjs(date).fromNow(true);

    return (
        <ContentCard
            className={styles.wrapper}
            title={
                <Badge
                    color={BadgeColors[workoutName as keyof typeof BadgeColors]}
                    text={workoutName}
                    className={styles.badge}
                />
            }
            extra={
                <PrimaryBtn
                    type='text'
                    icon={<CloseOutlined />}
                    onClick={closeModal}
                    className={styles.btn_close}
                />
            }
            dataTestId={DATA_TEST_ID.jointTrainingReviewCard}
        >
            <div className={styles.content}>
                <Paragraph className={styles.title}>
                    <span>Через {numberDaysLater}</span>
                    <span>{formattedDate}</span>
                </Paragraph>
                {exercise?.map(({ _id, name, replays, weight, approaches }) => (
                    <Paragraph key={_id} className={styles.exercise}>
                        <span>{name}</span>
                        <span className={styles.exercise_data}>
                            {replays ?? 1} x ({weight ? `${weight} кг` : approaches})
                        </span>
                    </Paragraph>
                ))}
            </div>
        </ContentCard>
    );
};
