import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_CONDITIONS_VISIBILITY_ZHTW: FormControlConfig[] = [
  {
    formControlName: 'checkbox',
    type: 'checkbox',
    value: true,
    options: {
      data: [{ label: '取消勾選，隱藏以下輸入欄位' }],
    },
  },
  {
    formControlName: 'text',
    conditions: {
      'control.hidden': {
        '&&': [['checkbox', '===', false]],
      },
    },
  },
];
