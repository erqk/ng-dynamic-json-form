import { FormControlConfig } from 'ng-dynamic-json-form';
import { CONFIG_OPTIONS_ZHTW } from '../share/config-options_zh-TW';

export const CONFIG_CHECKBOX_MULTI_VERTICAL_ZHTW: FormControlConfig = {
  label: '複選框',
  formControlName: 'checkbox',
  type: 'checkbox',
  options: {
    layout: 'column',
    data: CONFIG_OPTIONS_ZHTW,
  },
};
