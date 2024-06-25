import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_BASIC_NAME_EN: FormControlConfig = {
  label: 'Name',
  formControlName: 'name',
  type: 'text',
  validators: [
    {
      name: 'required',
      message: 'Please type your name',
    },
    {
      name: 'minLength',
      value: 4,
      message: 'Please enter at lease 4 characters',
    },
    {
      name: 'pattern',
      value: '^\\D+$',
      message: 'Numbers are not allowed',
    },
  ],
};
