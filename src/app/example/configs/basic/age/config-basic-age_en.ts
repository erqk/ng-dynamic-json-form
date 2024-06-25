import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_BASIC_AGE_EN: FormControlConfig = {
  label: 'Age',
  description: 'Input mask (number)',
  formControlName: 'age',
  type: 'number',
  inputMask: {
    mask: 'Number',
  },
  validators: [
    {
      name: 'required',
      message: 'Please enter your age',
    },
    {
      name: 'min',
      value: 18,
      message: 'Must above 18 years old',
    },
    {
      name: 'max',
      value: 65,
      message: 'Must not greater than 65 years old',
    },
  ],
};
