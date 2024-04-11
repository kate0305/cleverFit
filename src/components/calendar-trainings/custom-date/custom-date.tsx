import dayjs, { Dayjs } from 'dayjs';
import * as today from 'dayjs/plugin/isToday';

import { DateFormats } from '@type/dates';
import { UserTraining } from '@type/training';
import { getFormattedDate } from '@utils/get-formatted-date';

import { TrainingList } from '../training-list';

dayjs.extend(today);

type DrawerAddExerciseProps = {
    date: Dayjs;
    isLaptop: boolean;
    trainingList: UserTraining[];
    onClick: (
        e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>,
        day: Dayjs,
    ) => void;
};

export const CustomDate = ({ date, isLaptop, trainingList, onClick }: DrawerAddExerciseProps) => {
    const isToday = dayjs(date).isToday();
    const className = 'ant-picker-cell-inner ant-picker-calendar-date';

    return (
        <div
            className={isToday ? `${className} ant-picker-calendar-date-today` : className}
            onClick={(e) => {
                onClick(e, date);
            }}
            role='button'
            tabIndex={0}
            onKeyDown={(e) => {
                onClick(e, date);
            }}
        >
            <div className='ant-picker-calendar-date-value'>
                {getFormattedDate(date, DateFormats.DD)}
            </div>
            <div className='ant-picker-calendar-date-content'>
                <TrainingList
                    isInCalendar={true}
                    trainingsListForSelectedDay={trainingList}
                    isLaptop={isLaptop}
                />
            </div>
        </div>
    );
};
