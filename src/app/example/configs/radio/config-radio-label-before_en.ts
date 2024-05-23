import { FormControlConfig } from 'ng-dynamic-json-form';
import { CONFIG_OPTIONS_EN } from '../share/config-options_en';

export const CONFIG_RADIO_LABEL_BEFORE_EN: FormControlConfig = {
  label: 'Radio',
  formControlName: 'radioLabelBefore',
  type: 'radio',
  options: {
    labelPosition: 'before',
    layout: 'column',
    data: CONFIG_OPTIONS_EN,
  },
};
