import { FormControlConfig } from 'projects/ng-dynamic-json-form/src/public-api';

export const FORM_CONFIG_CHECKBOX_BINARY_EN: FormControlConfig = {
  formControlName: 'binaryCheckbox',
  value: false,
  type: 'checkbox',
  options: [
    {
      label: "I'm a binary checkbox",
    },
  ],
};
