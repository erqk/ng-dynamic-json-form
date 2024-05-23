import { CONFIG_PASSWORD_EN } from './config-password_en';
import { CONFIG_PASSWORD_ZHTW } from './config-password_zh-TW';

export const CONFIG_PASSWORD = {
  PASSWORD: {
    EN: CONFIG_PASSWORD_EN,
    'ZH-TW': CONFIG_PASSWORD_ZHTW,
  },
} as const;
