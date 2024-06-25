import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_BASIC_EMAIL_EN: FormControlConfig = {
  label: 'Email',
  formControlName: 'email',
  value: 'emailaddress@example.com',
  type: 'email',
  validators: [
    {
      name: 'required',
      message: 'Please enter your email',
    },
    {
      name: 'email',
      message: 'Invalid email format',
    },
  ],
};
