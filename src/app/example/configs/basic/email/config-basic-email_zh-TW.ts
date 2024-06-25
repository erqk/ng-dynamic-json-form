import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_BASIC_EMAIL_ZHTW: FormControlConfig = {
  label: '電子郵件',
  formControlName: 'email',
  value: 'emailaddress@example.com',
  type: 'email',
  validators: [
    {
      name: 'required',
      message: '請輸入電子郵件',
    },
    {
      name: 'email',
      message: '輸入的電子郵件格式不正確',
    },
  ],
};
