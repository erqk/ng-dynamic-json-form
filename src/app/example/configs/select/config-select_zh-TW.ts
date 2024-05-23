import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_SELECT_ZHTW: FormControlConfig = {
  label: '下拉選單',
  formControlName: 'select',
  type: 'select',
  options: {
    data: [
      { label: '選項 1', value: 0 },
      { label: '選項 2', value: 1 },
      { label: '選項 3', value: 2 },
    ],
  },
};
