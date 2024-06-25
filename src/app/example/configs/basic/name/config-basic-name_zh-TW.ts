import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_BASIC_NAME_ZHTW: FormControlConfig = {
  label: '姓名',
  formControlName: 'name',
  type: 'text',
  validators: [
    {
      name: 'required',
      message: '請輸入名字',
    },
    {
      name: 'minLength',
      value: 2,
      message: '請輸入至少 2 個字',
    },
    {
      name: 'pattern',
      value: '^\\D+$',
      message: '不可輸入數字',
    },
  ],
};
