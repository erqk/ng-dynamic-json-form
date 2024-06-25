import { FormControlConfig } from 'ng-dynamic-json-form';
import { CONFIG_OPTIONS_ZHTW } from '../share/config-options_zh-TW';

export const CONFIG_RADIO_ZHTW: FormControlConfig = {
  label: '單選選項',
  formControlName: 'radio',
  type: 'radio',
  options: {
    data: CONFIG_OPTIONS_ZHTW,
  },
};
