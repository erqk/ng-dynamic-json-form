import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_BASIC_TOGGLES_EN: FormControlConfig = {
  formControlName: 'toggles',
  layout: {
    formGroupStyles: 'display: flex; gap: 2.5rem;',
  },
  children: [
    {
      formControlName: 'checkbox',
      value: false,
      type: 'checkbox',
      description: 'A binary checkbox',
      layout: {
        descriptionPosition: 'after',
      },
      options: {
        data: [
          {
            label: 'Confirm?',
          },
        ],
      },
    },
    {
      formControlName: 'switch',
      value: false,
      type: 'switch',
      options: {
        labelPosition: 'before',
        data: [
          {
            label: 'Open?',
          },
        ],
      },
    },
  ],
};
