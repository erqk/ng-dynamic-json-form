import { FormControlConfig } from 'projects/ng-dynamic-json-form/src/public-api';
import { FORM_CONFIG_EMAIL_ZHTW } from '../../basic/email/form-config-email_zh-TW.constant';
import { FORM_CONFIG_NUMBER_AGE_ZHTW } from '../../basic/number/form-config-number-age_zh-TW.constant';
import { FORM_CONFIG_RADIO_GENDER_ZHTW } from '../../basic/radio/form-config-radio-gender_zh-TW.constant';
import { FORM_CONFIG_SWITCH_SHOW_EMAIL_ZHTW } from '../../basic/switch/form-config-switch_zh-TW.constant';
import { FORM_CONFIG_TEXT_NAME_ZHTW } from '../../basic/text/form-config-text-name_zh-TW.constant';

export const FORM_CONFIG_BASIC_INFO_ZHTW: FormControlConfig = {
  label: '基本資料',
  formControlName: 'basicInfo',
  children: [
    FORM_CONFIG_TEXT_NAME_ZHTW,
    FORM_CONFIG_NUMBER_AGE_ZHTW,
    FORM_CONFIG_RADIO_GENDER_ZHTW,
    FORM_CONFIG_SWITCH_SHOW_EMAIL_ZHTW,
    {
      ...FORM_CONFIG_EMAIL_ZHTW,
      conditions: [
        {
          name: 'hidden',
          operation: ['basicInfo.showEmail', '===', false],
        },
      ],
    },
  ],
};
