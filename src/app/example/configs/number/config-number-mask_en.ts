import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_NUMBER_MASK_EN: FormControlConfig = {
  label: 'Number (using mask)',
  formControlName: 'number',
  type: 'text',
  inputMask: {
    mask: 'Number',
  },
} as const;
