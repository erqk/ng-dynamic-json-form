import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_SWITCH_EN: FormControlConfig = {
  label: 'Switch',
  formControlName: 'switch',
  type: 'switch',
  options: {
    data: [
      {
        label: 'Label of this switch',
      },
    ],
  },
};
