import generateCalendar from 'antd/es/calendar/generateCalendar';
import dayjs, { Dayjs } from 'dayjs';
import * as updateLocale from 'dayjs/plugin/updateLocale';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';

import 'dayjs/locale/ru';

dayjs.locale('ru');
dayjs.extend(updateLocale);
dayjs.updateLocale('ru', {
    monthsShort: [
        'Янв',
        'Фев',
        'Мар',
        'Апр',
        'Май',
        'Июн',
        'Июл',
        'Авг',
        'Сен',
        'Окт',
        'Ноя',
        'Дек',
    ],
    weekdaysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    formats: { L: 'DD-MM-YYYY', l: 'DD-MM-YYYY' },
});

export const Calendar = generateCalendar<Dayjs>(dayjsGenerateConfig);
