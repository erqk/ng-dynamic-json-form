import { FormControlConfig } from 'ng-dynamic-json-form';
import { CONFIG_OPTIONS_EN } from '../share/config-options_en';

export const CONFIG_CHECKBOX_MULTI_EN: FormControlConfig = {
  label: 'Checkbox',
  formControlName: 'checkbox',
  type: 'checkbox',
  options: {
    data: CONFIG_OPTIONS_EN,
  },
};
