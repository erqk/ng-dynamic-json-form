import { FormControlConfig } from 'projects/ng-dynamic-json-form/src/public-api';

export const FORM_CONFIG_SELECT_CAR_BRAND_ZHTW: FormControlConfig = {
  label: '車輛品牌',
  formControlName: 'carBrand',
  type: 'dropdown',
  value: '0',
  options: [
    {
      label: '特斯拉',
      value: '0',
    },
    {
      label: 'BMW',
      value: '1',
    },
    {
      label: '賓士',
      value: '2',
    },
  ],
};
