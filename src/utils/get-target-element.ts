import { Dayjs } from 'dayjs';

export const getElement = (selector: string) => {
    const parentElem = document.querySelector(selector);

    return parentElem;
};

export const getTargetElement = (date: Dayjs, format: string) => {
    const selector = `[title*='${date.format(format)}']`;
    const parentElem = getElement(selector);

    return parentElem;
};
