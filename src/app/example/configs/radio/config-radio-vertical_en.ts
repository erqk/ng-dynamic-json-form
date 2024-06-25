import { FormControlConfig } from 'ng-dynamic-json-form';
import { CONFIG_OPTIONS_EN } from '../share/config-options_en';

export const CONFIG_RADIO_VERTICAL_EN: FormControlConfig = {
  label: 'Radio',
  formControlName: 'radioVertical',
  type: 'radio',
  options: {
    layout: 'column',
    data: CONFIG_OPTIONS_EN,
  },
};
