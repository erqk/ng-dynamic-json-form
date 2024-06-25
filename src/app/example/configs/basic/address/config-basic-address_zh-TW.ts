import { FormControlConfig, FormLayout } from 'ng-dynamic-json-form';

const childLayout: FormLayout = {
  hostClass: '!flex flex-col',
  contentClass: 'mt-auto',
};

export const CONFIG_BASIC_ADDRESS_ZHTW: FormControlConfig = {
  label: '地址',
  formControlName: 'address',
  layout: {
    formGroupClass: 'grid grid-cols-3 md:grid-cols-1',
    contentCollapsible: 'collapse',
  },
  children: [
    {
      label: '國家',
      formControlName: 'country',
      type: 'text',
      props: {
        placeholder: '國家',
      },
      layout: childLayout,
    },
    {
      label: '州/省/縣市',
      formControlName: 'state',
      type: 'text',
      props: {
        placeholder: '州/省/縣市',
      },
      layout: childLayout,
    },
    {
      label: '郵遞區號',
      formControlName: 'postcode',
      type: 'text',
      props: {
        placeholder: '00000',
      },
      layout: childLayout,
    },
    {
      label: '詳細地址',
      formControlName: 'address',
      type: 'text',
      layout: {
        hostStyles: 'grid-column: -1/1;',
      },
      props: {
        placeholder: '詳細地址',
      },
    },
  ],
};
