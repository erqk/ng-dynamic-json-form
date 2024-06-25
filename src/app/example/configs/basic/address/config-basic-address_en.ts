import { FormControlConfig, FormLayout } from 'ng-dynamic-json-form';

const childLayout: FormLayout = {
  hostClass: '!flex flex-col',
  contentClass: 'mt-auto'
};

export const CONFIG_BASIC_ADDRESS_EN: FormControlConfig = {
  label: 'Address',
  formControlName: 'address',
  layout: {
    formGroupClass: 'grid grid-cols-1 md:grid-cols-3',
    contentCollapsible: 'collapse',
  },
  children: [
    {
      label: 'Country',
      formControlName: 'country',
      type: 'text',
      props: {
        placeholder: 'Country',
      },
      layout: childLayout,
    },
    {
      label: 'State/Province',
      formControlName: 'state',
      type: 'text',
      props: {
        placeholder: 'State/Province',
      },
      layout: childLayout,
    },
    {
      label: 'Zip/Postal code',
      formControlName: 'postcode',
      type: 'text',
      props: {
        placeholder: '00000',
      },
      layout: childLayout,
    },
    {
      label: 'Address',
      formControlName: 'address',
      type: 'text',
      layout: {
        hostStyles: 'grid-column: -1/1;',
      },
      props: {
        placeholder: 'Address',
      },
    },
  ],
};
