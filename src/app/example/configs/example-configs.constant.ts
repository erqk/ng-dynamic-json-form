import { FORM_CONFIG_ALL_EN } from './all/form-config-all_en.constant';
import { FORM_CONFIG_ALL_ZHTW } from './all/form-config-all_zh-TW.constant';
import { FORM_CONFIG_BASIC_EN } from './basic/form-config-basic_en.constant';
import { FORM_CONFIG_BASIC_ZHTW } from './basic/form-config-basic_zh-TW.constant';
import { FORM_CONFIG_MULTI_CONDITION_EN } from './conditions/form-config-conditions_en.constant';
import { FORM_CONFIG_MULTI_CONDITION_ZHTW } from './conditions/form-config-conditions_zh-TW.constant';
import { FORM_CONFIG_CUSTOM_COMPONENTS_EN } from './custom-components/form-config-custom-components_en.constant';
import { FORM_CONFIG_CUSTOM_COMPONENTS_ZHTW } from './custom-components/form-config-custom-components_zh-TW.constant';
import { FORM_CONFIG_CUSTOM_VALIDATORS_EN } from './custom-validators/form-config-custom-validators_en.constant';
import { FORM_CONFIG_CUSTOM_VALIDATORS_ZHTW } from './custom-validators/form-config-custom-validators_zh-TW.constant';
import { FORM_CONFIG_FORM_ARRAY_EN } from './form-array/form-config-form-array_en.constant';
import { FORM_CONFIG_FORM_ARRAY_ZHTW } from './form-array/form-config-form-array_zh-TW.constant';

interface ConfigItem {
  label: string;
  config: any;
}

export const EXAMPLE_CONFIGS: {
  [key: string]: {
    en: ConfigItem;
    'zh-TW'?: ConfigItem;
  };
} = {
  all: {
    en: {
      label: 'All',
      config: FORM_CONFIG_ALL_EN,
    },
    'zh-TW': {
      label: '全部範例',
      config: FORM_CONFIG_ALL_ZHTW,
    },
  },
  'custom-components': {
    en: {
      label: 'Custom components',
      config: FORM_CONFIG_CUSTOM_COMPONENTS_EN,
    },
    'zh-TW': {
      label: '自訂元件',
      config: FORM_CONFIG_CUSTOM_COMPONENTS_ZHTW,
    },
  },
  'custom-validators': {
    en: {
      label: 'Custom validators',
      config: FORM_CONFIG_CUSTOM_VALIDATORS_EN,
    },
    'zh-TW': {
      label: '自訂驗證器',
      config: FORM_CONFIG_CUSTOM_VALIDATORS_ZHTW,
    },
  },
  'form-array': {
    en: {
      label: 'Form array',
      config: FORM_CONFIG_FORM_ARRAY_EN,
    },
    'zh-TW': {
      label: 'Form 陣列',
      config: FORM_CONFIG_FORM_ARRAY_ZHTW,
    },
  },
  'multi-condition': {
    en: {
      label: 'Multi condition',
      config: FORM_CONFIG_MULTI_CONDITION_EN,
    },
    'zh-TW': {
      label: '多重條件判斷',
      config: FORM_CONFIG_MULTI_CONDITION_ZHTW,
    },
  },
};
