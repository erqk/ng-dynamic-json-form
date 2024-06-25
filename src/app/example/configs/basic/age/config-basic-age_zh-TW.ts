import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_BASIC_AGE_ZHTW: FormControlConfig = {
  label: '年齡',
  description: '使用數字遮罩',
  formControlName: 'age',
  type: 'number',
  inputMask: {
    mask: 'Number',
  },
  validators: [
    {
      name: 'required',
      message: '請輸入年齡',
    },
    {
      name: 'min',
      value: 18,
      message: '不可小於 18 歲',
    },
    {
      name: 'max',
      value: 65,
      message: '不可超過 65 歲',
    },
  ],
};
