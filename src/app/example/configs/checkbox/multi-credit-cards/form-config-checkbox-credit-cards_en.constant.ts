import { FormControlConfig } from 'projects/ng-dynamic-json-form/src/public-api';

export const FORM_CONFIG_CHECKBOX_CREDIT_CARDS_EN: FormControlConfig[] = [
  {
    label: 'Credit cards type',
    formControlName: 'creditCardTypes',
    type: 'checkbox',
    value: ['master'],
    validators: [
      {
        name: 'required',
      },
    ],
    options: {
      layout: 'column',
      data: [
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
    },
  },
];
