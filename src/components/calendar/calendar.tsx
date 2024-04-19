import generateCalendar from 'antd/es/calendar/generateCalendar';
import generatePicker from 'antd/es/date-picker/generatePicker';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import today from 'dayjs/plugin/isToday';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';
import weekday from 'dayjs/plugin/weekday';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';

import { LOCALE_OPTIONS } from '@constants/index';

import 'dayjs/locale/ru';

dayjs.extend(relativeTime);
dayjs.extend(today);
dayjs.extend(utc);
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(weekday);
dayjs.locale('ru');
dayjs.extend(updateLocale);
dayjs.updateLocale('ru', LOCALE_OPTIONS);

export const Calendar = generateCalendar<Dayjs>(dayjsGenerateConfig);
export const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);
