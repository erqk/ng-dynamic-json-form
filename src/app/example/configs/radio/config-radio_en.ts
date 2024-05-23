import { FormControlConfig } from 'ng-dynamic-json-form';
import { CONFIG_OPTIONS_EN } from '../share/config-options_en';

export const CONFIG_RADIO_EN: FormControlConfig = {
  label: 'Radio',
  formControlName: 'radio',
  type: 'radio',
  options: {
    data: CONFIG_OPTIONS_EN,
  },
};
