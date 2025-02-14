import { FormControlConfig } from 'ng-dynamic-json-form';

export const FORM_CONFIG_LETTER_STARTS_WITH_A_ZHTW: FormControlConfig[] = [
  {
    label: '必須以 A 字母開頭',
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
