import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_BASIC_CARDS_ZHTW: FormControlConfig = {
  label: '信用卡',
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
          message: '請至少選擇一個',
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
            label: '其他',
            value: 3,
          },
        ],
      },
    },
    {
      formControlName: 'cardOther',
      props: {
        placeholder: '其他卡片類型',
      },
      conditions: {
        "control.hidden": {
          '&&': [['cards.cardTypes', 'notIncludes', 3]],
        },
      },
    },
  ],
};
