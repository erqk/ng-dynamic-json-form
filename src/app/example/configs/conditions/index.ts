import { CONFIG_CONDITIONS_MULTIPLE_EN } from './complex/config-conditions-complex_en.constant';
import { CONFIG_CONDITIONS_MULTIPLE_ZHTW } from './complex/config-conditions-complex_zh-TW.constant';
import { CONFIG_CONDITIONS_VALIDATOR_EN } from './validator/config-conditions-validator_en.constant';
import { CONFIG_CONDITIONS_VALIDATOR_ZHTW } from './validator/config-conditions-validator_zh-TW.constant';
import { CONFIG_CONDITIONS_VISIBILITY_EN } from './visibility/config-conditions-visibility_en.constant';
import { CONFIG_CONDITIONS_VISIBILITY_ZHTW } from './visibility/config-conditions-visibility_zh-TW.constant';

export const CONFIG_CONDITIONS = {
  CONDITIONS_VISIBILITY: {
    EN: CONFIG_CONDITIONS_VISIBILITY_EN,
    'ZH-TW': CONFIG_CONDITIONS_VISIBILITY_ZHTW,
  },
  CONDITIONS_VALIDATOR: {
    EN: CONFIG_CONDITIONS_VALIDATOR_EN,
    'ZH-TW': CONFIG_CONDITIONS_VALIDATOR_ZHTW,
  },
  CONDITIONS_MULTIPLE: {
    EN: CONFIG_CONDITIONS_MULTIPLE_EN,
    'ZH-TW': CONFIG_CONDITIONS_MULTIPLE_ZHTW,
  },
};
