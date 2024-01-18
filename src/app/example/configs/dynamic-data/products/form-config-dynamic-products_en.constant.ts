import { FormControlConfig } from 'ng-dynamic-json-form';

export const FORM_CONFIG_DYNAMIC_PRODUCTS_EN: FormControlConfig[] = [
  {
    label: 'Products',
    formControlName: 'products',
    type: 'select',
    options: {
      sourceList: [
        {
          src: 'https://dummyjson.com/products',
          method: 'GET',
          data: {
            path: 'products',
            labelKey: 'title',
            valueKeys: ['id', 'title', 'brand'],
          },
        },
      ],
    },
  },
  {
    label: 'Products of same brand',
    description: 'Data filtered by the brand of selected product',
    formControlName: 'subProducts',
    type: 'select',
    options: {
      trigger: {
        action: 'FILTER',
        src: 'https://dummyjson.com/products',
        method: 'GET',
        data: {
          path: 'products',
          labelKey: 'title',
        },
        triggerValuePath: 'products,brand',
        filterMatchPath: 'brand',
      },
    },
  },
];
