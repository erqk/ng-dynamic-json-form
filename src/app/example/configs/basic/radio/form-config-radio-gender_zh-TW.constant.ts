import { FormControlConfig } from 'projects/ng-dynamic-json-form/src/public-api';

export const FORM_CONFIG_RADIO_GENDER_ZHTW: FormControlConfig = {
  label: '性別',
  formControlName: 'gender',
  value: '0',
  type: 'radio',
  validators: [
    {
      name: 'required',
    },
  ],
  options: [
    {
      label: '男',
      value: '0',
    },
    {
      label: '女',
      value: '1',
    },
  ],
};
