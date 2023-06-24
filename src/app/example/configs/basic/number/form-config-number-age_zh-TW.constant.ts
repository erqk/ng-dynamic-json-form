import { FormControlConfig } from 'projects/ng-dynamic-json-form/src/public-api';

export const FORM_CONFIG_NUMBER_AGE_ZHTW: FormControlConfig = {
  label: '年齡',
  formControlName: 'age',
  value: '18',
  type: 'number',
  ngxMaskConfig: {
    mask: '00',
  },
  validators: [
    {
      name: 'required',
    },
    {
      name: 'min',
      value: 18,
    },
    {
      name: 'max',
      value: 50,
    },
  ],
};
