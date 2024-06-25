import { CONFIG_DATE_MINDATE_EN } from './config-date-min-date_en';
import { CONFIG_DATE_MINDATE_ZHTW } from './config-date-min-date_zh-TW';
import { CONFIG_DATE_EN } from './config-date_en';
import { CONFIG_DATE_ZHTW } from './config-date_zh-TW';

export const CONFIG_DATE = {
  DATE: {
    EN: CONFIG_DATE_EN,
    'ZH-TW': CONFIG_DATE_ZHTW,
  },
  DATE_MIN_DATE: {
    EN: CONFIG_DATE_MINDATE_EN,
    'ZH-TW': CONFIG_DATE_MINDATE_ZHTW,
  },
} as const;
