import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_CHECKBOX_BINARY_EN: FormControlConfig = {
  label: 'Binary checkbox',
  formControlName: 'checkbox',
  type: 'checkbox',
  options: {
    data: [{ label: 'Label for this binary checkbox' }],
  },
};
