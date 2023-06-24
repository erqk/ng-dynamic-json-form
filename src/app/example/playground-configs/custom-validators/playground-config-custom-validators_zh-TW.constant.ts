import { FormControlConfig } from 'ng-dynamic-json-form';

export const PLAYGROUND_CONFIG_CUSTOM_VALIDATORS_ZHTW: FormControlConfig[] = [
  {
    label: '名字',
    description: '使用自訂驗證器來檢查第一個字母是否為大寫',
    formControlName: 'name',
    value: 'Andrew',
    type: 'text',
    validators: [
      {
        name: 'required',
        message: '請輸入名字',
      },
      {
        name: 'custom',
        value: 'firstUppercase',
      },
    ],
  },
];
