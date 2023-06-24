import { FormControlConfig } from 'projects/ng-dynamic-json-form/src/public-api';

export const FORM_CONFIG_SWITCH_SHOW_EMAIL_EN: FormControlConfig = {
  label: 'Show email',
  formControlName: 'showEmail',
  value: false,
  type: 'switch',
  extra: {
    switch: {
      label: 'Show email input field',
      labelPosition: 'before',
    },
  },
  validators: [
    {
      name: 'required',
    },
  ],
};
