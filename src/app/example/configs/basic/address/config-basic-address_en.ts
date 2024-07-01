import { FormControlConfig, FormLayout } from 'ng-dynamic-json-form';

const childLayout: FormLayout = {
  hostClass: '!flex flex-col',
  contentClass: 'mt-auto',
};

export const CONFIG_BASIC_ADDRESS_EN = (translation?: {
  addressLabel: string;
  countryLabel: string;
  countryPlaceholder: string;
  stateLabel: string;
  statePlaceholder: string;
  postcodeLabel: string;
  detailLabel: string;
  detailPlaceholder: string;
}): FormControlConfig => ({
  label: translation?.addressLabel ?? 'Address',
  formControlName: 'address',
  layout: {
    formGroupClass: 'grid grid-cols-1 md:grid-cols-3',
    contentCollapsible: 'expand',
  },
  children: [
    {
      label: translation?.countryLabel ?? 'Country',
      formControlName: 'country',
      type: 'text',
      props: {
        placeholder: translation?.countryPlaceholder ?? 'Country',
      },
      layout: childLayout,
    },
    {
      label: translation?.stateLabel ?? 'State/Province',
      formControlName: 'state',
      type: 'text',
      props: {
        placeholder: translation?.statePlaceholder ?? 'State/Province',
      },
      layout: childLayout,
    },
    {
      label: translation?.postcodeLabel ?? 'Zip/Postal code',
      formControlName: 'postcode',
      type: 'text',
      props: {
        placeholder: '00000',
      },
      layout: childLayout,
    },
    {
      label: translation?.detailLabel ?? 'Address',
      formControlName: 'detail',
      type: 'text',
      layout: {
        hostStyles: 'grid-column: -1/1;',
      },
      props: {
        placeholder: translation?.detailPlaceholder ?? 'Detail',
      },
    },
  ],
});
