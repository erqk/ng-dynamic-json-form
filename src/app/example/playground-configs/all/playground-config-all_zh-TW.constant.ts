import { FormControlConfig } from 'ng-dynamic-json-form';
import { FORM_CONFIG_CHECKBOX_BINARY_ZHTW } from '../../configs/basic/checkbox-binary/form-config-checkbox-binary_zh-TW.constant';
import { FORM_CONFIG_CHECKBOX_MULTIPLE_ZHTW } from '../../configs/basic/checkbox-multiple/form-config-checkbox-multiple_zh-TW.constant';
import { FORM_CONFIG_DATE_ZHTW } from '../../configs/basic/date/form-config-date_zh-TW.constant';
import { FORM_CONFIG_SELECT_CAR_BRAND_ZHTW } from '../../configs/basic/select/form-config-select-car-brand_zh-TW.constant';
import { FORM_CONFIG_SLIDER_TEMPERATURE_ZHTW } from '../../configs/basic/slider/form-config-slider_zh-TW.constant';
import { FORM_CONFIG_TEXTAREA_ZHTW } from '../../configs/basic/textarea/form-config-textarea_zh-TW.constant';
import { PLAYGROUND_CONFIG_CUSTOM_COMPONENTS_ZHTW } from '../custom-components/playground-config-custom-components_zh-TW.constant';
import { FORM_CONFIG_FAMILY_MEMBERS_ZHTW } from '../../configs/form-array/family-members/form-config-family-members_zh-TW.constant';
import { FORM_CONFIG_ADDRESS_ZHTW } from '../../configs/form-group/address/form-config-address_zh-TW.constant';
import { FORM_CONFIG_BASIC_INFO_ZHTW } from '../../configs/form-group/basic-info/form-config-basic-info-zh-TW.constant';

export const PLAYGROUND_CONFIG_ALL_ZHTW: FormControlConfig[] = [
  FORM_CONFIG_BASIC_INFO_ZHTW,
  FORM_CONFIG_CHECKBOX_BINARY_ZHTW,
  FORM_CONFIG_CHECKBOX_MULTIPLE_ZHTW,
  FORM_CONFIG_SELECT_CAR_BRAND_ZHTW,
  FORM_CONFIG_ADDRESS_ZHTW,
  FORM_CONFIG_TEXTAREA_ZHTW,
  FORM_CONFIG_SLIDER_TEMPERATURE_ZHTW,
  FORM_CONFIG_DATE_ZHTW,
  ...PLAYGROUND_CONFIG_CUSTOM_COMPONENTS_ZHTW,
  FORM_CONFIG_FAMILY_MEMBERS_ZHTW
];
