import { FormControlConfig } from 'ng-dynamic-json-form';
import { FORM_CONFIG_DYNAMIC_MULTI_SOURCE_EN } from './form-config-dynamic-multi-source_en.constant';

export const FORM_CONFIG_DYNAMIC_MULTI_SOURCE_ZHTW: FormControlConfig[] = [
  {
    label: '選項 (多來源)',
    formControlName: 'options',
    type: 'checkbox',
    options: FORM_CONFIG_DYNAMIC_MULTI_SOURCE_EN.find(
      (x) => x.formControlName === 'options'
    )?.options,
  },
];
