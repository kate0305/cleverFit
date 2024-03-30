import generatePicker from 'antd/es/date-picker/generatePicker';
import dayjs, { Dayjs } from 'dayjs';
import * as updateLocale from 'dayjs/plugin/updateLocale';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';

import { LOCALE_OPTIONS } from '@constants/index';

import 'dayjs/locale/ru';

dayjs.locale('ru');
dayjs.extend(updateLocale);
dayjs.updateLocale('ru', LOCALE_OPTIONS);

export const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);
