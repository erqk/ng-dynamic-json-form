import { CONFIG_BASIC_EN } from 'src/app/example/configs/basic/form-config-basic_en.constant';
import { CONFIG_BASIC_ZHTW } from 'src/app/example/configs/basic/form-config-basic_zh-TW.constant';
import { CONFIGS_INDEX } from 'src/app/example/configs/configs.index';
import { FORM_CONFIG_FIRST_UPPERCASE_EN } from 'src/app/example/configs/custom-validators/first-uppercase/form-config-first-uppercase_en.constant';
import { FORM_CONFIG_FIRST_UPPERCASE_ZHTW } from 'src/app/example/configs/custom-validators/first-uppercase/form-config-first-uppercase_zh-TW.constant';
import { FORM_CONFIG_LETTER_STARTS_WITH_A_EN } from 'src/app/example/configs/custom-validators/letter-starts-with-a/form-config-letter-starts-with-a_en.constant';
import { FORM_CONFIG_LETTER_STARTS_WITH_A_ZHTW } from 'src/app/example/configs/custom-validators/letter-starts-with-a/form-config-letter-starts-with-a_zh-TW.constant';
import { FORM_CONFIG_TEXTAREA_MAX_LENGTH_EN } from 'src/app/example/configs/custom-validators/textarea-maxlength/form-config-textarea-maxlength_en.constant';
import { FORM_CONFIG_TEXTAREA_MAX_LENGTH_ZHTW } from 'src/app/example/configs/custom-validators/textarea-maxlength/form-config-textarea-maxlength_zh-TW.constant';
import { CONFIG_ADDRESS_DYNAMIC_EN } from 'src/app/example/configs/dynamic-data/address/config-dynamic-address_en.constant';
import { CONFIG_ADDRESS_DYNAMIC_ZHTW } from 'src/app/example/configs/dynamic-data/address/config-dynamic-address_zh-TW.constant';
import { CONFIG_DYNAMIC_MULTI_SOURCE_EN } from 'src/app/example/configs/dynamic-data/multi-source/config-dynamic-multi-source_en.constant';
import { CONFIG_DYNAMIC_MULTI_SOURCE_ZHTW } from 'src/app/example/configs/dynamic-data/multi-source/config-dynamic-multi-source_zh-TW.constant';
import { CONFIG_DYNAMIC_POSTS_EN } from 'src/app/example/configs/dynamic-data/posts/config-dynamic-posts_en.constant';
import { CONFIG_DYNAMIC_POSTS_ZHTW } from 'src/app/example/configs/dynamic-data/posts/config-dynamic-posts_zh-TW.constant';
import { CONFIG_DYNAMIC_PRODUCTS_EN } from 'src/app/example/configs/dynamic-data/products/config-dynamic-products_en.constant';
import { CONFIG_DYNAMIC_PRODUCTS_ZHTW } from 'src/app/example/configs/dynamic-data/products/config-dynamic-products_zh-TW.constant';
import { PlaygroundConfigItem } from '../interfaces/playground-config-item.interface';

export const PLAYGROUND_CONFIGS: {
  [key: string]: {
    en: PlaygroundConfigItem;
    'zh-TW': PlaygroundConfigItem;
  };
} = {
  basic: {
    en: {
      label: 'Basic',
      config: CONFIG_BASIC_EN,
      isExample: true,
    },
    'zh-TW': {
      label: '基本元件',
      config: CONFIG_BASIC_ZHTW,
      isExample: true,
    },
  },
  'custom-component': {
    en: {
      label: 'Custom Component',
      config: [CONFIGS_INDEX.CUSTOM_COMPONENT.EN],
      isExample: true,
    },
    'zh-TW': {
      label: '自訂元件',
      config: [CONFIGS_INDEX.CUSTOM_COMPONENT['ZH-TW']],
      isExample: true,
    },
  },
  'custom-validator-firstUppercase': {
    en: {
      label: 'Custom validator (Capital letters)',
      config: FORM_CONFIG_FIRST_UPPERCASE_EN,
      isExample: true,
    },
    'zh-TW': {
      label: '自訂驗證器 (首字母大寫)',
      config: FORM_CONFIG_FIRST_UPPERCASE_ZHTW,
      isExample: true,
    },
  },
  'custom-validator-textarea-maxLength': {
    en: {
      label: 'Custom validator (Textarea max length)',
      config: FORM_CONFIG_TEXTAREA_MAX_LENGTH_EN,
      isExample: true,
    },
    'zh-TW': {
      label: '自訂驗證器 (Textarea 最大長度)',
      config: FORM_CONFIG_TEXTAREA_MAX_LENGTH_ZHTW,
      isExample: true,
    },
  },
  'custom-validator-letter-starts-with-A': {
    en: {
      label: 'Custom async validator (Letter starts with A)',
      config: FORM_CONFIG_LETTER_STARTS_WITH_A_EN,
      isExample: true,
    },
    'zh-TW': {
      label: '自訂 async 驗證器 (A 字母開頭)',
      config: FORM_CONFIG_LETTER_STARTS_WITH_A_ZHTW,
      isExample: true,
    },
  },
  'conditions-visibility': {
    en: {
      label: 'Conditions (Visibility)',
      config: CONFIGS_INDEX.CONDITIONS_VISIBILITY.EN,
      isExample: true,
    },
    'zh-TW': {
      label: '條件 (顯示狀態)',
      config: CONFIGS_INDEX.CONDITIONS_VISIBILITY['ZH-TW'],
      isExample: true,
    },
  },
  'conditions-validator': {
    en: {
      label: 'Conditions (Validator)',
      config: CONFIGS_INDEX.CONDITIONS_VALIDATOR.EN,
      isExample: true,
    },
    'zh-TW': {
      label: '條件 (驗證器)',
      config: CONFIGS_INDEX.CONDITIONS_VALIDATOR['ZH-TW'],
      isExample: true,
    },
  },
  'conditions-complex': {
    en: {
      label: 'Conditions (Multiple)',
      config: CONFIGS_INDEX.CONDITIONS_MULTIPLE.EN,
      isExample: true,
    },
    'zh-TW': {
      label: '條件 (多重判斷)',
      config: CONFIGS_INDEX.CONDITIONS_MULTIPLE['ZH-TW'],
      isExample: true,
    },
  },
  'dynamic-multi-source': {
    en: {
      label: 'Options (Dynamic)',
      config: CONFIG_DYNAMIC_MULTI_SOURCE_EN,
      isExample: true,
    },
    'zh-TW': {
      label: '選項 (動態)',
      config: CONFIG_DYNAMIC_MULTI_SOURCE_ZHTW,
      isExample: true,
    },
  },
  'dynamic-address': {
    en: {
      label: 'Address (Using filter)',
      config: CONFIG_ADDRESS_DYNAMIC_EN(),
      isExample: true,
    },
    'zh-TW': {
      label: '地址 (使用過濾器)',
      config: CONFIG_ADDRESS_DYNAMIC_ZHTW,
      isExample: true,
    },
  },
  'dynamic-products': {
    en: {
      label: 'Products (Using filter)',
      config: CONFIG_DYNAMIC_PRODUCTS_EN,
      isExample: true,
    },
    'zh-TW': {
      label: '商品 (使用過濾器)',
      config: CONFIG_DYNAMIC_PRODUCTS_ZHTW,
      isExample: true,
    },
  },
  'dynamic-posts': {
    en: {
      label: 'Posts (Using trigger)',
      config: CONFIG_DYNAMIC_POSTS_EN,
      isExample: true,
    },
    'zh-TW': {
      label: '貼文 (使用觸發器)',
      config: CONFIG_DYNAMIC_POSTS_ZHTW,
      isExample: true,
    },
  },
};
