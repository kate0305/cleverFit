import dayjs, { Dayjs } from 'dayjs';

export const getFormattedDate = (date: string | number | Dayjs, format: string) =>
    dayjs(date).format(format);
