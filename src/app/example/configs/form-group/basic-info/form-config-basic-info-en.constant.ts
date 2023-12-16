import { FormControlConfig } from 'projects/ng-dynamic-json-form/src/public-api';
import { FORM_CONFIG_EMAIL_EN } from '../../basic/email/form-config-email_en.constant';
import { FORM_CONFIG_NUMBER_AGE_EN } from '../../basic/number/form-config-number-age_en.constant';
import { FORM_CONFIG_RADIO_GENDER_EN } from '../../basic/radio/form-config-radio-gender_en.constant';
import { FORM_CONFIG_SWITCH_SHOW_EMAIL_EN } from '../../basic/switch/form-config-switch_en.constant';
import { FORM_CONFIG_TEXT_NAME_EN } from '../../basic/text/form-config-text-name_en.constant';

export const FORM_CONFIG_BASIC_INFO_EN: FormControlConfig = {
  label: 'Basic Info',
  formControlName: 'basicInfo',
  children: [
    FORM_CONFIG_TEXT_NAME_EN,
    FORM_CONFIG_NUMBER_AGE_EN,
    FORM_CONFIG_RADIO_GENDER_EN,
    FORM_CONFIG_SWITCH_SHOW_EMAIL_EN,
    {
      ...FORM_CONFIG_EMAIL_EN,
      conditions: [
        {
          name: 'hidden',
          operation: ['basicInfo.showEmail', '===', false],
        },
      ],
    },
  ],
};
