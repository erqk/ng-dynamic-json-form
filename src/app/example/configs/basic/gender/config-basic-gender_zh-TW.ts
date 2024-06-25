import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_BASIC_GENDER_ZHTW: FormControlConfig = {
  label: '性別',
  formControlName: 'gender',
  value: '0',
  type: 'radio',
  options: {
    data: [
      {
        label: '男生',
        value: '0',
      },
      {
        label: '女生',
        value: '1',
      },
      {
        label: '我不想說',
        value: '2',
      },
    ],
  },
};
