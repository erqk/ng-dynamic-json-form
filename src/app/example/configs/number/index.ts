import { CONFIG_NUMBER_MASK_EN } from './config-number-mask_en';
import { CONFIG_NUMBER_MASK_ZHTW } from './config-number-mask_zh-TW';
import { CONFIG_NUMBER_EN } from './config-number_en';
import { CONFIG_NUMBER_ZHTW } from './config-number_zh-TW';

export const CONFIG_NUMBER = {
  NUMBER: {
    EN: CONFIG_NUMBER_EN,
    'ZH-TW': CONFIG_NUMBER_ZHTW,
  },
  NUMBER_MASK: {
    EN: CONFIG_NUMBER_MASK_EN,
    'ZH-TW': CONFIG_NUMBER_MASK_ZHTW,
  },
};
