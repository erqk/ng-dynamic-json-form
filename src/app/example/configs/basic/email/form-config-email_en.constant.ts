import { FormControlConfig } from "projects/ng-dynamic-json-form/src/public-api";

export const FORM_CONFIG_EMAIL_EN: FormControlConfig = {
  label: 'Email',
  formControlName: 'email',
  value: 'emailaddress@example.com',
  type: 'email',
  validators: [
    {
      name: 'required',
    },
    {
      name: 'email',
    },
  ],
};
