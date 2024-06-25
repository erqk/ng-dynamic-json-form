import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_BASIC_RELATIONSHIP_ZHTW: FormControlConfig = {
  label: '關係',
  formControlName: 'relationship',
  value: '',
  type: 'select',
  options: {
    data: [
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
      {
        label: '配偶',
        value: 3,
      },
    ],
  },
};
