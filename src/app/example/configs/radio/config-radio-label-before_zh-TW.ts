import { FormControlConfig } from 'ng-dynamic-json-form';
import { CONFIG_OPTIONS_ZHTW } from '../share/config-options_zh-TW';

export const CONFIG_RADIO_LABEL_BEFORE_ZHTW: FormControlConfig = {
  label: '單選選項 (文字在前)',
  formControlName: 'radioLabelBefore',
  type: 'radio',
  options: {
    labelPosition: 'before',
    layout: 'column',
    data: CONFIG_OPTIONS_ZHTW,
  },
};
