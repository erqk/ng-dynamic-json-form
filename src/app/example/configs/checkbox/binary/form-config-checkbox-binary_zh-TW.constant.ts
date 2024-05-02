import { FormControlConfig } from 'ng-dynamic-json-form';

export const FORM_CONFIG_CHECKBOX_BINARY_ZHTW: FormControlConfig[] = [
  {
    formControlName: 'binaryCheckbox',
    value: false,
    type: 'checkbox',
    options: {
      data: [
        {
          label: '我是二元複選框',
        },
      ],
    },
  },
];
