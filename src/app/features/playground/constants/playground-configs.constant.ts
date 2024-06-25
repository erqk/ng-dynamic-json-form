import { FORM_CONFIG_BASIC_EN } from 'src/app/example/configs/basic/form-config-basic_en.constant';
import { FORM_CONFIG_BASIC_ZHTW } from 'src/app/example/configs/basic/form-config-basic_zh-TW.constant';
import { CONFIG_CONDITIONS_MULTIPLE_EN } from 'src/app/example/configs/conditions/complex/config-conditions-complex_en.constant';
import { CONFIG_CONDITIONS_MULTIPLE_ZHTW } from 'src/app/example/configs/conditions/complex/config-conditions-complex_zh-TW.constant';
import { CONFIG_CONDITIONS_VALIDATOR_EN } from 'src/app/example/configs/conditions/validator/config-conditions-validator_en.constant';
import { CONFIG_CONDITIONS_VALIDATOR_ZHTW } from 'src/app/example/configs/conditions/validator/config-conditions-validator_zh-TW.constant';
import { CONFIG_CONDITIONS_VISIBILITY_EN } from 'src/app/example/configs/conditions/visibility/config-conditions-visibility_en.constant';
import { CONFIG_CONDITIONS_VISIBILITY_ZHTW } from 'src/app/example/configs/conditions/visibility/config-conditions-visibility_zh-TW.constant';
import { FORM_CONFIG_FIRST_UPPERCASE_EN } from 'src/app/example/configs/custom-validators/first-uppercase/form-config-first-uppercase_en.constant';
import { FORM_CONFIG_FIRST_UPPERCASE_ZHTW } from 'src/app/example/configs/custom-validators/first-uppercase/form-config-first-uppercase_zh-TW.constant';
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
      config: FORM_CONFIG_BASIC_EN,
      isExample: true,
    },
    'zh-TW': {
      label: '基本元件',
      config: FORM_CONFIG_BASIC_ZHTW,
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
  'conditions-visibility': {
    en: {
      label: 'Conditions (Visibility)',
      config: CONFIG_CONDITIONS_VISIBILITY_EN(''),
      isExample: true,
    },
    'zh-TW': {
      label: '條件 (顯示狀態)',
      config: CONFIG_CONDITIONS_VISIBILITY_ZHTW(''),
      isExample: true,
    },
  },
  'conditions-validator': {
    en: {
      label: 'Conditions (Validator)',
      config: CONFIG_CONDITIONS_VALIDATOR_EN,
      isExample: true,
    },
    'zh-TW': {
      label: '條件 (驗證器)',
      config: CONFIG_CONDITIONS_VALIDATOR_ZHTW,
      isExample: true,
    },
  },
  'conditions-complex': {
    en: {
      label: 'Conditions (Multiple)',
      config: CONFIG_CONDITIONS_MULTIPLE_EN,
      isExample: true,
    },
    'zh-TW': {
      label: '條件 (多重判斷)',
      config: CONFIG_CONDITIONS_MULTIPLE_ZHTW,
      isExample: true,
    },
  },
  'dynamic-multi-source': {
    en: {
      label: 'Dynamic options (Multi-source)',
      config: CONFIG_DYNAMIC_MULTI_SOURCE_EN,
      isExample: true,
    },
    'zh-TW': {
      label: '動態選項 (多重來源)',
      config: CONFIG_DYNAMIC_MULTI_SOURCE_ZHTW,
      isExample: true,
    },
  },
  'dynamic-address': {
    en: {
      label: 'Dynamic options (Address)',
      config: CONFIG_ADDRESS_DYNAMIC_EN(),
      isExample: true,
    },
    'zh-TW': {
      label: '動態選項 (地址)',
      config: CONFIG_ADDRESS_DYNAMIC_ZHTW,
      isExample: true,
    },
  },
  'dynamic-products': {
    en: {
      label: 'Dynamic options (Products)',
      config: CONFIG_DYNAMIC_PRODUCTS_EN,
      isExample: true,
    },
    'zh-TW': {
      label: '動態選項 (商品)',
      config: CONFIG_DYNAMIC_PRODUCTS_ZHTW,
      isExample: true,
    },
  },
  'dynamic-posts': {
    en: {
      label: 'Dynamic options (Posts)',
      config: CONFIG_DYNAMIC_POSTS_EN,
      isExample: true,
    },
    'zh-TW': {
      label: '動態選項 (貼文)',
      config: CONFIG_DYNAMIC_POSTS_ZHTW,
      isExample: true,
    },
  },
};
