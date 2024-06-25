import { FormControlConfig, FormLayout } from 'ng-dynamic-json-form';
import { CONFIG_BASIC_ADDRESS_EN } from '../basic/address/config-basic-address_en';
import { CONFIG_BASIC_AGE_EN } from '../basic/age/config-basic-age_en';
import { CONFIG_BASIC_NAME_EN } from '../basic/name/config-basic-name_en';
import { CONFIG_CONDITIONS_VISIBILITY_EN } from '../conditions/visibility/config-conditions-visibility_en.constant';

// https://neumorphism.io/#ffffff

export const CONFIG_HOME_DEMO_COMMON_LAYOUT: FormLayout = {
  hostClass: 'p-6 m-3 rounded-xl border-gray-500/30',
  hostStyles: `
    background: linear-gradient(145deg, var(--primary-100), var(--body-bg-color));
    box-shadow: 1rem 1rem 1.75rem rgba(0,0,0,0.15), -1rem -1rem 1.75rem var(--body-bg-color);`.replace(
    /\s{2,}/g,
    ''
  ),
};

export const CONFIG_HOME_DEMO_EN: FormControlConfig = {
  label: 'Level 1',
  formControlName: 'level1',
  layout: CONFIG_HOME_DEMO_COMMON_LAYOUT,
  children: [
    CONFIG_BASIC_NAME_EN,
    ...CONFIG_CONDITIONS_VISIBILITY_EN('level1'),
    {
      label: 'Level 2',
      formControlName: 'level2',
      layout: CONFIG_HOME_DEMO_COMMON_LAYOUT,
      children: [
        CONFIG_BASIC_AGE_EN,
        {
          label: 'Level 3',
          formControlName: 'level3',
          layout: CONFIG_HOME_DEMO_COMMON_LAYOUT,
          children: [CONFIG_BASIC_ADDRESS_EN],
        },
      ],
    },
  ],
};
