import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONDITIONS_VISIBILITY_EN: FormControlConfig[] = [
  {
    formControlName: 'checkbox',
    type: 'checkbox',
    value: true,
    options: {
      data: [{ label: 'Uncheck to hide the following input' }],
    },
  },
  {
    formControlName: 'text',
    conditions: {
      hidden: {
        '&&': [['checkbox', '===', false]],
      },
    },
  },
];
