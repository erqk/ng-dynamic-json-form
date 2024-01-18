import { FormControlConfig } from 'ng-dynamic-json-form';

export const FORM_CONFIG_DYNAMIC_PRODUCTS_ZHTW: FormControlConfig[] = [
  {
    label: '商品',
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
    label: '同一品牌之商品',
    description: '由已選擇的商品品牌來過濾資料',
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
