import { Dayjs } from 'dayjs';

export const getTargetElement = (date: Dayjs, format: string) => {
    const parentElem = document.querySelector(`[title*='${date.format(format)}']`);

    return parentElem;
};
