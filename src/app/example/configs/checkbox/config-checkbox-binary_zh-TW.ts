import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_CHECKBOX_BINARY_ZHTW: FormControlConfig = {
  label: '二元複選框',
  formControlName: 'checkbox',
  type: 'checkbox',
  options: {
    data: [{ label: '此二元複選框的文字' }],
  },
};
