import { Form } from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import { PickerProps } from 'antd/lib/date-picker/generatePicker';
import dayjs from 'dayjs';

import { CalendarTwoTone } from '@ant-design/icons';
import { DateFormats } from '@type/dates';

import { DatePicker } from '@components/date-picker';

import styles from './date-picker-input.module.scss';

export type DatePickerInputProps = PickerProps<dayjs.Dayjs> & {
    inputName: string;
    showToday?: boolean;
    placeholder?: string;
    dataTestId?: string;
    className?: string;
};

export const DatePickerInput = ({
    inputName,
    placeholder,
    dataTestId,
    className,
    disabledDate,
    dateRender,
    showToday,
}: DatePickerInputProps) => (
    <Form.Item name={inputName}>
        <DatePicker
            format={DateFormats.LOCAL}
            locale={locale}
            showToday={showToday || false}
            disabledDate={disabledDate}
            dateRender={dateRender}
            placeholder={placeholder || 'Дата рождения'}
            suffixIcon={<CalendarTwoTone twoToneColor={['#bfbfbf', '#bfbfbf']} />}
            className={className || styles.datepicker}
            data-test-id={dataTestId}
        />
    </Form.Item>
);
