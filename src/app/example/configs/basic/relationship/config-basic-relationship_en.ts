import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_BASIC_RELATIONSHIP_EN: FormControlConfig = {
  label: 'Relationship',
  formControlName: 'relationship',
  value: '',
  type: 'select',
  options: {
    data: [
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
      {
        label: 'Spouse',
        value: 3,
      },
    ],
  },
  props: {
    styleClass: 'w-full',
  },
};
