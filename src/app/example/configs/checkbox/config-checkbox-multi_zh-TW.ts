import { FormControlConfig } from 'ng-dynamic-json-form';
import { CONFIG_OPTIONS_ZHTW } from '../share/config-options_zh-TW';

export const CONFIG_CHECKBOX_MULTI_ZHTW: FormControlConfig = {
  label: '複選框',
  formControlName: 'checkbox',
  type: 'checkbox',
  options: {
    data: CONFIG_OPTIONS_ZHTW,
  },
};
