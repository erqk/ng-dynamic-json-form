import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONDITIONS_DISABLED_EN: FormControlConfig[] = [
  {
    formControlName: 'checkbox',
    type: 'checkbox',
    value: true,
    options: {
      data: [{ label: 'Uncheck to disable the following input' }],
    },
  },
  {
    formControlName: 'text',
    conditions: {
      disabled: {
        '&&': [['checkbox', '===', false]],
      },
    },
  },
];
