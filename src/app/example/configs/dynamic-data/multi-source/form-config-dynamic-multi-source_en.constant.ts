import { FormControlConfig } from 'ng-dynamic-json-form';

export const FORM_CONFIG_DYNAMIC_MULTI_SOURCE_EN: FormControlConfig[] = [
  {
    label: 'Options (multi-source)',
    formControlName: 'options',
    type: 'checkbox',
    options: {
      labelPosition: 'after',
      data: [
        {
          label: 'LABEL_A',
          value: '000',
        },
      ],
      sourceList: [
        {
          src: 'https://dummyjson.com/products',
          method: 'GET',
          data: {
            path: 'products',
            labelKey: 'title',
          },
        },
        {
          src: 'https://dummyjson.com/carts',
          method: 'GET',
          data: {
            path: 'carts.0.products',
            labelKey: 'title',
          },
        },
        {
          src: 'https://dummyjson.com/users',
          method: 'GET',
          data: {
            path: 'users',
            labelKey: 'maidenName',
            valueKeys: ['id', 'firstName', 'lastName', 'maidenName'],
          },
        },
      ],
      containerStyles:
        'display:grid;grid-template-columns:repeat(auto-fill,150px);',
    },
  },
];
