import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_PASSWORD_EN: FormControlConfig = {
  label: 'Password',
  formControlName: 'password',
  type: 'password',
} as const;
