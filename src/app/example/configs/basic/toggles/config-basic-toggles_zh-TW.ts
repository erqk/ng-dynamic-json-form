import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_BASIC_TOGGLES_ZHTW: FormControlConfig = {
  formControlName: 'toggles',
  layout: {
    formGroupStyles: 'display: flex; gap: 2.5rem;',
  },
  children: [
    {
      formControlName: 'checkbox',
      value: false,
      type: 'checkbox',
      description: '二元勾選框',
      layout: {
        descriptionPosition: 'after',
      },
      options: {
        data: [
          {
            label: '確定?',
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
            label: '開啟?',
          },
        ],
      },
    },
  ],
};
