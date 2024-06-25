import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_BASIC_CARDS_EN: FormControlConfig = {
  label: 'Cards',
  formControlName: 'cards',
  layout: {
    formGroupStyles: 'row-gap: 0px',
  },
  children: [
    {
      formControlName: 'cardTypes',
      type: 'checkbox',
      value: [0],
      validators: [
        {
          name: 'required',
          message: 'Please choose at least one.',
        },
      ],
      options: {
        layout: 'column',
        data: [
          {
            label: 'Visa',
            value: 0,
          },
          {
            label: 'Master',
            value: 1,
          },
          {
            label: 'JCB',
            value: 2,
          },
          {
            label: 'Other',
            value: 3,
          },
        ],
      },
    },
    {
      formControlName: 'cardOther',
      props: {
        placeholder: 'Other card type',
      },
      conditions: {
        'control.hidden': {
          '&&': [['cards.cardTypes', 'notIncludes', 3]],
        },
      },
    },
  ],
};
