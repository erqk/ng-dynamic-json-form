import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_DYNAMIC_PRODUCTS_EN: FormControlConfig[] = [
  {
    label: 'Products',
    formControlName: 'products',
    type: 'select',
    options: {
      src: {
        url: 'https://dummyjson.com/products',
        method: 'GET',
        mapData: {
          contentPath: 'products',
          labelKey: 'title',
          valueKeys: ['id', 'title', 'brand'],
        },
      },
    },
  },
  {
    label: 'Products of same brand',
    description: 'Data filtered by the brand of selected product',
    formControlName: 'subProducts',
    type: 'select',
    props: {
      autoDisplayFirst: false,
    },
    options: {
      src: {
        url: 'https://dummyjson.com/products',
        method: 'GET',
        mapData: {
          contentPath: 'products',
          labelKey: 'title',
        },
        filter: {
          by: 'products',
          conditions: {
            '&&': [['brand', '===', 'brand']],
          },
        },
      },
    },
  },
];
