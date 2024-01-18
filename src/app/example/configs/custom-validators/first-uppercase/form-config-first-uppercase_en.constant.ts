import { FormControlConfig } from 'ng-dynamic-json-form';

export const FORM_CONFIG_FIRST_UPPERCASE_EN: FormControlConfig[] = [
  {
    label: 'Capital letters',
    description: 'Custom validator to check whether first letter is uppercase.',
    formControlName: 'capitalLetters',
    type: 'text',
    validators: [
      {
        name: 'firstUppercase',
      },
    ],
  },
];
