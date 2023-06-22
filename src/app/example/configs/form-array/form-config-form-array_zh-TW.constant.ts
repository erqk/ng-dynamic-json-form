import { FormControlConfig } from 'ng-dynamic-json-form';

export const FORM_CONFIG_FORM_ARRAY_ZHTW: FormControlConfig[] = [
  {
    label: '家庭成員資料',
    formControlName: 'familyMemberInfo',
    value: [],
    formArray: {
      length: 1,
      editable: true,
      templateLabel: '成員',
      template: [
        {
          label: '名字',
          formControlName: 'name',
          value: '某某某',
          type: 'text',
        },
        {
          label: 'Email',
          formControlName: 'email',
          value: '',
          validators: [
            {
              name: 'email',
            },
          ],
          type: 'text',
        },
        {
          label: '地址',
          formControlName: 'address',
          value: {},
          children: [
            {
              label: '國家',
              formControlName: 'country',
              value: '國家名',
              type: 'text',
              cssGrid: {
                gridColumn: '1',
              },
            },
            {
              label: '州屬',
              formControlName: 'state',
              value: '州屬名',
              type: 'text',
              cssGrid: {
                gridColumn: '2',
              },
            },
            {
              label: '郵編',
              formControlName: 'postcode',
              value: '00000',
              type: 'text',
            },
          ],
        },
        {
          label: '關係',
          formControlName: 'relationship',
          value: '',
          type: 'dropdown',
          options: [
            {
              label: '父親',
              value: 0,
            },
            {
              label: '母親',
              value: 1,
            },
            {
              label: '兄弟姐妹',
              value: 2,
            },
          ],
        },
      ],
    },
  },
];
