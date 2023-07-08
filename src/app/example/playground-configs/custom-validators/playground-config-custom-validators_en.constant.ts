import { FormControlConfig } from 'ng-dynamic-json-form';

export const PLAYGROUND_CONFIG_CUSTOM_VALIDATORS_EN: FormControlConfig[] = [
  {
    label: 'Name',
    description: 'Custom validator to check whether first letter is uppercase.',
    formControlName: 'name',
    value: 'Andrew',
    type: 'text',
    validators: [
      {
        name: 'required',
        message: 'Please type your name',
      },
      {
        name: 'custom',
        value: 'firstUppercase',
      },
    ],
  },
];
