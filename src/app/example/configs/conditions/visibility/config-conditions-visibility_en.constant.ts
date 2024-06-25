import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_CONDITIONS_VISIBILITY_EN = (
  parentControlPath: string
): FormControlConfig[] => [
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
      'control.hidden': {
        '&&': [
          [
            !parentControlPath ? 'checkbox' : `${parentControlPath}.checkbox`,
            '===',
            false,
          ],
        ],
      },
    },
  },
];
