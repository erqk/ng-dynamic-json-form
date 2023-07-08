import { FormControlConfig } from 'projects/ng-dynamic-json-form/src/public-api';

export const FORM_CONFIG_SELECT_CAR_BRAND_EN: FormControlConfig = {
  label: 'Car brand',
  formControlName: 'carBrand',
  type: 'dropdown',
  value: '0',
  options: [
    {
      label: 'Tesla',
      value: '0',
    },
    {
      label: 'BMW',
      value: '1',
    },
    {
      label: 'Mercedes',
      value: '2',
    },
  ],
};
