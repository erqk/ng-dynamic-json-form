import { FormControlConfig } from 'ng-dynamic-json-form';
import { CONFIG_DYNAMIC_PRODUCTS_EN } from './config-dynamic-products_en.constant';

export const CONFIG_DYNAMIC_PRODUCTS_ZHTW: FormControlConfig[] = [
  {
    label: '商品',
    formControlName: 'products',
    type: 'select',
    options: CONFIG_DYNAMIC_PRODUCTS_EN.find(
      (x) => x.formControlName === 'products'
    )?.options,
  },
  {
    label: '同一品牌之商品',
    description: '由已選擇的商品品牌來過濾資料',
    formControlName: 'subProducts',
    type: 'select',
    options: CONFIG_DYNAMIC_PRODUCTS_EN.find(
      (x) => x.formControlName === 'subProducts'
    )?.options,
  },
];
