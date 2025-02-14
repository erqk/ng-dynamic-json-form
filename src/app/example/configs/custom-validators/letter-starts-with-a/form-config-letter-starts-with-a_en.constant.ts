import { FormControlConfig } from 'ng-dynamic-json-form';

export const FORM_CONFIG_LETTER_STARTS_WITH_A_EN: FormControlConfig[] = [
  {
    label: 'Must starts with letter A',
    formControlName: 'letterStartsWithA',
    type: 'textarea',
    props: {
      autoResize: true,
    },
    asyncValidators: [
      {
        name: 'letterStartsWithA',
      },
    ],
  },
];
