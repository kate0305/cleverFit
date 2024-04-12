import generateCalendar from 'antd/es/calendar/generateCalendar';
import dayjs, { Dayjs } from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';

import { LOCALE_OPTIONS } from '@constants/index';

import 'dayjs/locale/ru';

dayjs.locale('ru');
dayjs.extend(updateLocale);
dayjs.updateLocale('ru', LOCALE_OPTIONS);

export const Calendar = generateCalendar<Dayjs>(dayjsGenerateConfig);
