import { FormControlConfig } from 'projects/ng-dynamic-json-form/src/public-api';

export const FORM_CONFIG_ADDRESS_ZHTW: FormControlConfig = {
  label: '地址',
  formControlName: 'address',
  value: {},
  children: [
    {
      label: '國家',
      formControlName: 'country',
      value: '國家名稱',
      type: 'text',
      cssGrid: {
        gridColumn: '1',
      },
    },
    {
      label: '州/省/縣市',
      formControlName: 'state',
      value: '州/省/縣市',
      type: 'text',
      cssGrid: {
        gridColumn: '2',
      },
    },
    {
      label: '郵政編碼',
      formControlName: 'postcode',
      value: '00000',
      type: 'text',
    },
  ],
};
