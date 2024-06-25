import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_NUMBER_MASK_ZHTW: FormControlConfig = {
  label: '數字 (使用遮罩)',
  formControlName: 'number',
  type: 'text',
  inputMask: {
    mask: 'Number',
  },
} as const;
