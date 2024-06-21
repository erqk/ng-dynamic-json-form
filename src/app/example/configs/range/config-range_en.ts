import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_RANGE_EN: FormControlConfig = {
  formControlName: 'range',
  label: 'Range',
  type: 'range',
  value: 20,
  props: {
    min: 0,
    max: 100,
    step: 10,
  },
};
