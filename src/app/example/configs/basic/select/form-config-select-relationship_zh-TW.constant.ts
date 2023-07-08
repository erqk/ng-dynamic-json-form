import { FormControlConfig } from 'projects/ng-dynamic-json-form/src/public-api';

export const FORM_CONFIG_SELECT_RELATIONSHIP_ZHTW: FormControlConfig = {
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
};
