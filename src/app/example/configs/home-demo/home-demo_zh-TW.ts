import { FormControlConfig } from 'ng-dynamic-json-form';
import { CONFIG_BASIC_ADDRESS_ZHTW } from '../basic/address/config-basic-address_zh-TW';
import { CONFIG_BASIC_AGE_ZHTW } from '../basic/age/config-basic-age_zh-TW';
import { CONFIG_BASIC_NAME_ZHTW } from '../basic/name/config-basic-name_zh-TW';
import { CONFIG_CONDITIONS_VISIBILITY_ZHTW } from '../conditions/visibility/config-conditions-visibility_zh-TW.constant';
import { CONFIG_HOME_DEMO_COMMON_LAYOUT } from './home-demo_en';

export const CONFIG_HOME_DEMO_ZHTW: FormControlConfig = {
  label: '第 1 層',
  formControlName: 'level1',
  layout: CONFIG_HOME_DEMO_COMMON_LAYOUT,
  children: [
    CONFIG_BASIC_NAME_ZHTW,
    ...CONFIG_CONDITIONS_VISIBILITY_ZHTW('level1'),
    {
      label: '第 2 層',
      formControlName: 'level2',
      layout: CONFIG_HOME_DEMO_COMMON_LAYOUT,
      children: [
        CONFIG_BASIC_AGE_ZHTW,
        {
          label: '第 3 層',
          formControlName: 'level3',
          layout: CONFIG_HOME_DEMO_COMMON_LAYOUT,
          children: [CONFIG_BASIC_ADDRESS_ZHTW],
        },
      ],
    },
  ],
};
