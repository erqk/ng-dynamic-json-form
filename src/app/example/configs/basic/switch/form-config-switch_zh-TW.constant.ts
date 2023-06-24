import { FormControlConfig } from 'projects/ng-dynamic-json-form/src/public-api';

export const FORM_CONFIG_SWITCH_SHOW_EMAIL_ZHTW: FormControlConfig = {
  label: '顯示 email',
  formControlName: 'showEmail',
  value: false,
  type: 'switch',
  extra: {
    switch: {
      label: '顯示 Email 輸入框',
      labelPosition: 'before',
    },
  },
  validators: [
    {
      name: 'required',
    },
  ],
};
