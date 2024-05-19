import { FORM_CONFIG_BASIC_EN } from 'src/app/example/configs/basic/form-config-basic_en.constant';
import { FORM_CONFIG_BASIC_ZHTW } from 'src/app/example/configs/basic/form-config-basic_zh-TW.constant';
import { FORM_CONFIG_CONDITIONS_COMPLEX_EN } from 'src/app/example/configs/conditions/complex/form-config-conditions-complex_en.constant';
import { FORM_CONFIG_CONDITIONS_COMPLEX_ZHTW } from 'src/app/example/configs/conditions/complex/form-config-conditions-complex_zh-TW.constant';
import { FORM_CONFIG_CONDITIONS_VALIDATOR_EN } from 'src/app/example/configs/conditions/validator/form-config-conditions-validator_en.constant';
import { FORM_CONFIG_CONDITIONS_VALIDATOR_ZHTW } from 'src/app/example/configs/conditions/validator/form-config-conditions-validator_zh-TW.constant';
import { FORM_CONFIG_CONDITIONS_VISIBILITY_EN } from 'src/app/example/configs/conditions/visibility/form-config-conditions-simple_en.constant';
import { FORM_CONFIG_CONDITIONS_VISIBILITY_ZHTW } from 'src/app/example/configs/conditions/visibility/form-config-conditions-simple_zh-TW.constant';
import { FORM_CONFIG_CUSTOM_COMPONENTS_EN } from 'src/app/example/configs/custom-components/form-config-custom-components_en.constant';
import { FORM_CONFIG_CUSTOM_COMPONENTS_ZHTW } from 'src/app/example/configs/custom-components/form-config-custom-components_zh-TW.constant';
import { FORM_CONFIG_FIRST_UPPERCASE_EN } from 'src/app/example/configs/custom-validators/first-uppercase/form-config-first-uppercase_en.constant';
import { FORM_CONFIG_FIRST_UPPERCASE_ZHTW } from 'src/app/example/configs/custom-validators/first-uppercase/form-config-first-uppercase_zh-TW.constant';
import { FORM_CONFIG_ADDRESS_DYNAMIC_EN } from 'src/app/example/configs/dynamic-data/address/form-config-dynamic-address_en.constant';
import { FORM_CONFIG_ADDRESS_DYNAMIC_ZHTW } from 'src/app/example/configs/dynamic-data/address/form-config-dynamic-address_zh-TW.constant';
import { FORM_CONFIG_DYNAMIC_MULTI_SOURCE_EN } from 'src/app/example/configs/dynamic-data/multi-source/form-config-dynamic-multi-source_en.constant';
import { FORM_CONFIG_DYNAMIC_MULTI_SOURCE_ZHTW } from 'src/app/example/configs/dynamic-data/multi-source/form-config-dynamic-multi-source_zh-TW.constant';
import { FORM_CONFIG_DYNAMIC_POSTS_EN } from 'src/app/example/configs/dynamic-data/posts/form-config-dynamic-posts_en.constant';
import { FORM_CONFIG_DYNAMIC_POSTS_ZHTW } from 'src/app/example/configs/dynamic-data/posts/form-config-dynamic-posts_zh-TW.constant';
import { FORM_CONFIG_DYNAMIC_PRODUCTS_EN } from 'src/app/example/configs/dynamic-data/products/form-config-dynamic-products_en.constant';
import { FORM_CONFIG_DYNAMIC_PRODUCTS_ZHTW } from 'src/app/example/configs/dynamic-data/products/form-config-dynamic-products_zh-TW.constant';
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
  'custom-components': {
    en: {
      label: 'Custom components',
      config: FORM_CONFIG_CUSTOM_COMPONENTS_EN,
      isExample: true,
    },
    'zh-TW': {
      label: '自訂元件',
      config: FORM_CONFIG_CUSTOM_COMPONENTS_ZHTW,
      isExample: true,
    },
  },
  'conditions-visibility': {
    en: {
      label: 'Conditions (Visibility)',
      config: FORM_CONFIG_CONDITIONS_VISIBILITY_EN,
      isExample: true,
    },
    'zh-TW': {
      label: '條件 (顯示狀態)',
      config: FORM_CONFIG_CONDITIONS_VISIBILITY_ZHTW,
      isExample: true,
    },
  },
  'conditions-validator': {
    en: {
      label: 'Conditions (Validator)',
      config: FORM_CONFIG_CONDITIONS_VALIDATOR_EN,
      isExample: true,
    },
    'zh-TW': {
      label: '條件 (驗證器)',
      config: FORM_CONFIG_CONDITIONS_VALIDATOR_ZHTW,
      isExample: true,
    },
  },
  'conditions-complex': {
    en: {
      label: 'Conditions (Multiple)',
      config: FORM_CONFIG_CONDITIONS_COMPLEX_EN,
      isExample: true,
    },
    'zh-TW': {
      label: '條件 (多重判斷)',
      config: FORM_CONFIG_CONDITIONS_COMPLEX_ZHTW,
      isExample: true,
    },
  },
  'dynamic-multi-source': {
    en: {
      label: 'Dynamic options (Multi-source)',
      config: FORM_CONFIG_DYNAMIC_MULTI_SOURCE_EN,
      isExample: true,
    },
    'zh-TW': {
      label: '動態選項 (多重來源)',
      config: FORM_CONFIG_DYNAMIC_MULTI_SOURCE_ZHTW,
      isExample: true,
    },
  },
  'dynamic-address': {
    en: {
      label: 'Dynamic options (Address)',
      config: FORM_CONFIG_ADDRESS_DYNAMIC_EN,
      isExample: true,
    },
    'zh-TW': {
      label: '動態選項 (地址)',
      config: FORM_CONFIG_ADDRESS_DYNAMIC_ZHTW,
      isExample: true,
    },
  },
  'dynamic-products': {
    en: {
      label: 'Dynamic options (Products)',
      config: FORM_CONFIG_DYNAMIC_PRODUCTS_EN,
      isExample: true,
    },
    'zh-TW': {
      label: '動態選項 (商品)',
      config: FORM_CONFIG_DYNAMIC_PRODUCTS_ZHTW,
      isExample: true,
    },
  },
  'dynamic-posts': {
    en: {
      label: 'Dynamic options (Posts)',
      config: FORM_CONFIG_DYNAMIC_POSTS_EN,
      isExample: true,
    },
    'zh-TW': {
      label: '動態選項 (貼文)',
      config: FORM_CONFIG_DYNAMIC_POSTS_ZHTW,
      isExample: true,
    },
  },
};
