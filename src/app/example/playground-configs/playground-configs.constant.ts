import { PLAYGROUND_CONFIG_CUSTOM_COMPONENTS_EN } from './custom-components/playground-config-custom-components_en.constant';
import { PLAYGROUND_CONFIG_CUSTOM_COMPONENTS_ZHTW } from './custom-components/playground-config-custom-components_zh-TW.constant';
import { PLAYGROUND_CONFIG_CUSTOM_VALIDATORS_EN } from './custom-validators/playground-config-custom-validators_en.constant';
import { PLAYGROUND_CONFIG_CUSTOM_VALIDATORS_ZHTW } from './custom-validators/playground-config-custom-validators_zh-TW.constant';
import { FORM_CONFIG_FAMILY_MEMBERS_EN } from '../configs/form-array/family-members/form-config-family-members_en.constant';
import { FORM_CONFIG_FAMILY_MEMBERS_ZHTW } from '../configs/form-array/family-members/form-config-family-members_zh-TW.constant';
import { PLAYGROUND_CONFIG_MULTI_CONDITION_EN } from './multi-conditions/form-config-multi-condition_en.constant';
import { PLAYGROUND_CONFIG_MULTI_CONDITION_ZHTW } from './multi-conditions/form-config-multi-condition_zh-TW.constant';
import { PLAYGROUND_CONFIG_ALL_EN } from './all/playground-config-all_en.constant';
import { PLAYGROUND_CONFIG_ALL_ZHTW } from './all/playground-config-all_zh-TW.constant';

export interface ConfigItem {
  label: string;
  config: any;
  key?: string;
}

export const PLAYGROUND_CONFIGS: {
  [key: string]: {
    en: ConfigItem;
    'zh-TW'?: ConfigItem;
  };
} = {
  all: {
    en: {
      label: 'All',
      config: PLAYGROUND_CONFIG_ALL_EN,
    },
    'zh-TW': {
      label: '全部範例',
      config: PLAYGROUND_CONFIG_ALL_ZHTW,
    },
  },
  'custom-components': {
    en: {
      label: 'Custom components',
      config: PLAYGROUND_CONFIG_CUSTOM_COMPONENTS_EN,
    },
    'zh-TW': {
      label: '自訂元件',
      config: PLAYGROUND_CONFIG_CUSTOM_COMPONENTS_ZHTW,
    },
  },
  'custom-validators': {
    en: {
      label: 'Custom validators',
      config: PLAYGROUND_CONFIG_CUSTOM_VALIDATORS_EN,
    },
    'zh-TW': {
      label: '自訂驗證器',
      config: PLAYGROUND_CONFIG_CUSTOM_VALIDATORS_ZHTW,
    },
  },
  'form-array': {
    en: {
      label: 'Form array',
      config: [FORM_CONFIG_FAMILY_MEMBERS_EN],
    },
    'zh-TW': {
      label: 'Form 陣列',
      config: [FORM_CONFIG_FAMILY_MEMBERS_ZHTW],
    },
  },
  'multi-condition': {
    en: {
      label: 'Multi condition',
      config: PLAYGROUND_CONFIG_MULTI_CONDITION_EN,
    },
    'zh-TW': {
      label: '多重條件判斷',
      config: PLAYGROUND_CONFIG_MULTI_CONDITION_ZHTW,
    },
  },
};
