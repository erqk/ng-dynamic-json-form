import { FormControlConfig } from 'ng-dynamic-json-form';

export const FORM_CONFIG_FIRST_UPPERCASE_ZHTW: FormControlConfig[] = [
  {
    label: '首字母大寫',
    description: '使用自訂驗證器檢查首字母是否為大寫',
    formControlName: 'capitalLetters',
    type: 'text',
    validators: [
      {
        name: 'firstUppercase',
      },
    ],
  },
];
