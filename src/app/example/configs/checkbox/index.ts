import { CONFIG_CHECKBOX_BINARY_EN } from './config-checkbox-binary_en';
import { CONFIG_CHECKBOX_BINARY_ZHTW } from './config-checkbox-binary_zh-TW';
import { CONFIG_CHECKBOX_LABEL_BEFORE_EN } from './config-checkbox-label-before_en';
import { CONFIG_CHECKBOX_LABEL_BEFORE_ZHTW } from './config-checkbox-label-before_zh-TW';
import { CONFIG_CHECKBOX_MULTI_VERTICAL_EN } from './config-checkbox-multi-vertical_en';
import { CONFIG_CHECKBOX_MULTI_VERTICAL_ZHTW } from './config-checkbox-multi-vertical_zh-TW';
import { CONFIG_CHECKBOX_MULTI_EN } from './config-checkbox-multi_en';
import { CONFIG_CHECKBOX_MULTI_ZHTW } from './config-checkbox-multi_zh-TW';

export const CONFIG_CHECKBOX = {
  CHECKBOX_BINARY: {
    EN: CONFIG_CHECKBOX_BINARY_EN,
    'ZH-TW': CONFIG_CHECKBOX_BINARY_ZHTW,
  },
  CHECKBOX_MULTI: {
    EN: CONFIG_CHECKBOX_MULTI_EN,
    'ZH-TW': CONFIG_CHECKBOX_MULTI_ZHTW,
  },
  CHECKBOX_MULTI_VERTICAL: {
    EN: CONFIG_CHECKBOX_MULTI_VERTICAL_EN,
    'ZH-TW': CONFIG_CHECKBOX_MULTI_VERTICAL_ZHTW,
  },
  CHECKBOX_LABEL_BEFORE: {
    EN: CONFIG_CHECKBOX_LABEL_BEFORE_EN,
    'ZH-TW': CONFIG_CHECKBOX_LABEL_BEFORE_ZHTW,
  },
} as const;
