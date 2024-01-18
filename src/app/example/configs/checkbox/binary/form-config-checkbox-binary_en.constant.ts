import { FormControlConfig } from 'ng-dynamic-json-form';

export const FORM_CONFIG_CHECKBOX_BINARY_EN: FormControlConfig[] = [
  {
    formControlName: 'binaryCheckbox',
    value: false,
    type: 'checkbox',
    options: {
      data: [
        {
          label: "I'm a binary checkbox",
        },
      ],
    },
  },
];
