import { FormControlConfig } from 'ng-dynamic-json-form';
import { FORM_CONFIG_CHECKBOX_BINARY_EN } from '../../configs/basic/checkbox-binary/form-config-checkbox-binary_en.constant';
import { FORM_CONFIG_CHECKBOX_MULTIPLE_EN } from '../../configs/basic/checkbox-multiple/form-config-checkbox-multiple_en.constant';
import { FORM_CONFIG_DATE_EN } from '../../configs/basic/date/form-config-date_en.constant';
import { FORM_CONFIG_SELECT_CAR_BRAND_EN } from '../../configs/basic/select/form-config-select-car-brand_en.constant';
import { FORM_CONFIG_SLIDER_TEMPERATURE_EN } from '../../configs/basic/slider/form-config-slider_en.constant';
import { FORM_CONFIG_TEXTAREA_EN } from '../../configs/basic/textarea/form-config-textarea_en.constant';
import { PLAYGROUND_CONFIG_CUSTOM_COMPONENTS_EN } from '../custom-components/playground-config-custom-components_en.constant';
import { FORM_CONFIG_FAMILY_MEMBERS_EN } from '../../configs/form-array/family-members/form-config-family-members_en.constant';
import { FORM_CONFIG_ADDRESS_EN } from '../../configs/form-group/address/form-config-address_en.constant';
import { FORM_CONFIG_BASIC_INFO_EN } from '../../configs/form-group/basic-info/form-config-basic-info-en.constant';

export const PLAYGROUND_CONFIG_ALL_EN: FormControlConfig[] = [
  FORM_CONFIG_BASIC_INFO_EN,
  FORM_CONFIG_CHECKBOX_BINARY_EN,
  FORM_CONFIG_CHECKBOX_MULTIPLE_EN,
  FORM_CONFIG_SELECT_CAR_BRAND_EN,
  FORM_CONFIG_ADDRESS_EN,
  FORM_CONFIG_TEXTAREA_EN,
  FORM_CONFIG_SLIDER_TEMPERATURE_EN,
  FORM_CONFIG_DATE_EN,
  ...PLAYGROUND_CONFIG_CUSTOM_COMPONENTS_EN,
  FORM_CONFIG_FAMILY_MEMBERS_EN,
];
