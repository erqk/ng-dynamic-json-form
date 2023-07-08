import { FormControlConfig } from 'projects/ng-dynamic-json-form/src/public-api';

export const FORM_CONFIG_CHECKBOX_MULTIPLE_ZHTW: FormControlConfig = {
  label: '信用卡類型',
  formControlName: 'creditCardTypes',
  type: 'checkbox',
  value: ['master'],
  validators: [
    {
      name: 'required',
    },
  ],
  optionsLayout: 'column',
  options: [
    {
      label: 'Visa',
      value: 'visa',
    },
    {
      label: 'Master',
      value: 'master',
    },
    {
      label: 'JCB',
      value: 'jcb',
    },
  ],
};
