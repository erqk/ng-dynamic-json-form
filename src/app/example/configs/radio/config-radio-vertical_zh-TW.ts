import { FormControlConfig } from 'ng-dynamic-json-form';
import { CONFIG_OPTIONS_ZHTW } from '../share/config-options_zh-TW';

export const CONFIG_RADIO_VERTICAL_ZHTW: FormControlConfig = {
  label: '單選選項',
  formControlName: 'radioVertical',
  type: 'radio',
  options: {
    layout: 'column',
    data: CONFIG_OPTIONS_ZHTW,
  },
};
