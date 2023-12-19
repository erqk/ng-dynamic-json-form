import { FormControlConfig } from 'projects/ng-dynamic-json-form/src/public-api';

export const FORM_CONFIG_TEXT_NAME_ZHTW: FormControlConfig = {
  label: '名字',
  formControlName: 'name',
  value: '王小明',
  type: 'text',
  validators: [
    {
      name: 'required',
      message: '請輸入名字',
    },
    {
      name: 'minLength',
      value: 2,
    },
    {
      name: 'pattern',
      value: '\\D+',
    },
  ],
  conditions: {
    required: {
      '||': [
        ['basicInfo.showEmail', '===', true],
        ['basicInfo.age', '>', 20],
      ],
    },
  },
};
