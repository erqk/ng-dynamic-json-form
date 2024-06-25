import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_DYNAMIC_MULTI_SOURCE_EN: FormControlConfig[] = [
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
      src: {
        url: 'https://dummyjson.com/products',
        method: 'GET',
        mapData: {
          contentPath: 'products',
          labelKey: 'title',
        },
      },
      containerStyles:
        'display:grid;grid-template-columns:repeat(auto-fill,150px);',
    },
  },
];
