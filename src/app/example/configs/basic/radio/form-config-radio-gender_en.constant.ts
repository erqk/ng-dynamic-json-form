import { FormControlConfig } from 'projects/ng-dynamic-json-form/src/public-api';

export const FORM_CONFIG_RADIO_GENDER_EN: FormControlConfig = {
  label: 'Gender',
  formControlName: 'gender',
  value: '0',
  type: 'radio',
  validators: [
    {
      name: 'required',
    },
  ],
  options: [
    {
      label: 'Male',
      value: '0',
    },
    {
      label: 'Female',
      value: '1',
    },
  ],
};
