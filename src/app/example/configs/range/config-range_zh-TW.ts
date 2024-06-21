import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_RANGE_ZHTW: FormControlConfig = {
  formControlName: 'range',
  label: '範圍',
  type: 'range',
  value: 20,
  props: {
    min: 0,
    max: 100,
    step: 10,
  },
};
