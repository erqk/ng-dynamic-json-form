import { FormControlConfig } from "projects/ng-dynamic-json-form/src/public-api";

export const FORM_CONFIG_NUMBER_AGE_EN: FormControlConfig = {
  label: 'Age',
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
