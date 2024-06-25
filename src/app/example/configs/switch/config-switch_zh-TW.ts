import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_SWITCH_ZHTW: FormControlConfig = {
  label: '開關',
  formControlName: 'switch',
  type: 'switch',
  options: {
    data: [
      {
        label: '此開關的文字',
      },
    ],
  },
};
