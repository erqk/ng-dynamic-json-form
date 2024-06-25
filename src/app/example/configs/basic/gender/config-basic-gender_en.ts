import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_BASIC_GENDER_EN: FormControlConfig = {
  label: 'Gender',
  formControlName: 'gender',
  value: '0',
  type: 'radio',
  options: {
    data: [
      {
        label: 'Male',
        value: '0',
      },
      {
        label: 'Female',
        value: '1',
      },
      {
        label: 'Prefer not to state',
        value: '2',
      },
    ],
  },
};
