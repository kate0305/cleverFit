import dayjs, { Dayjs } from 'dayjs';

export const getFormattedDate = (date: string | number | Dayjs, format: string) =>
    dayjs(date).format(format);

export const getFirstDayOfPeriod = (
    periodDuration: number,
    unit: dayjs.ManipulateType,
    currentDay: Dayjs,
) => currentDay.subtract(periodDuration, unit);
