import { FormControlConfig } from 'projects/ng-dynamic-json-form/src/public-api';

export const FORM_CONFIG_ADDRESS_EN: FormControlConfig = {
  label: 'Address',
  formControlName: 'address',
  value: {},
  children: [
    {
      label: 'Country',
      formControlName: 'country',
      value: 'country name',
      type: 'text',
      cssGrid: {
        gridColumn: '1',
      },
    },
    {
      label: 'State/Province',
      formControlName: 'state',
      value: 'State name',
      type: 'text',
      cssGrid: {
        gridColumn: '2',
      },
    },
    {
      label: 'Zip/Postal code',
      formControlName: 'postcode',
      value: '00000',
      type: 'text',
    },
  ],
};
