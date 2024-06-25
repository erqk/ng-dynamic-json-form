import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_BASIC_TEMPERATURE_EN: FormControlConfig = {
  label: 'Temperature',
  formControlName: 'temperature',
  type: 'range',
  value: 27,
  props: {
    min: -20,
    max: 80,
    step: 1,
    showCurrentValue: true,
    showTickMarks: true,
    discrete: true,
  },
};
