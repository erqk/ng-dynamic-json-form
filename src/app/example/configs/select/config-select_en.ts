import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_SELECT_EN: FormControlConfig = {
  label: 'Select',
  formControlName: 'select',
  type: 'select',
  options: {
    data: [
      { label: 'Option 1', value: 0 },
      { label: 'Option 2', value: 1 },
      { label: 'Option 3', value: 2 },
    ],
  },
};
