import { FormControlConfig } from 'ng-dynamic-json-form';
import { CONFIG_DYNAMIC_MULTI_SOURCE_EN } from './config-dynamic-multi-source_en.constant';

export const CONFIG_DYNAMIC_MULTI_SOURCE_ZHTW: FormControlConfig[] = [
  {
    label: '選項 (多來源)',
    formControlName: 'options',
    type: 'checkbox',
    options: CONFIG_DYNAMIC_MULTI_SOURCE_EN.find(
      (x) => x.formControlName === 'options'
    )?.options,
  },
];
