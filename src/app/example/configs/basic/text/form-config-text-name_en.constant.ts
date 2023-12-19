import { FormControlConfig } from 'projects/ng-dynamic-json-form/src/public-api';

export const FORM_CONFIG_TEXT_NAME_EN: FormControlConfig = {
  label: 'Name',
  formControlName: 'name',
  value: 'Andrew',
  type: 'text',
  validators: [
    {
      name: 'required',
      message: 'Please type your name',
    },
    {
      name: 'minLength',
      value: 4,
    },
    {
      name: 'pattern',
      value: '\\D+',
    },
    {
      name: 'custom',
      value: 'firstUppercase',
    },
  ],
  conditions: {
    required: {
      '||': [
        ['basicInfo.showEmail', '===', true],
        ['basicInfo.age', '>', 20],
      ],
    },
  },
};
