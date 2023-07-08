import { FormControlConfig } from 'projects/ng-dynamic-json-form/src/public-api';

export const FORM_CONFIG_SELECT_RELATIONSHIP_EN: FormControlConfig = {
  label: 'Relationship',
  formControlName: 'relationship',
  value: '',
  type: 'dropdown',
  options: [
    {
      label: 'Father',
      value: 0,
    },
    {
      label: 'Mother',
      value: 1,
    },
    {
      label: 'Siblings',
      value: 2,
    },
  ],
};
