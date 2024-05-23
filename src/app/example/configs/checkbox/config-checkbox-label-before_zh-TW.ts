import { FormControlConfig } from 'ng-dynamic-json-form';
import { CONFIG_OPTIONS_ZHTW } from '../share/config-options_zh-TW';

export const CONFIG_CHECKBOX_LABEL_BEFORE_ZHTW: FormControlConfig = {
  label: '複選框',
  formControlName: 'checkbox',
  type: 'checkbox',
  options: {
    labelPosition: 'before',
    layout: 'column',
    data: CONFIG_OPTIONS_ZHTW,
  },
};
