import { FormControlConfig } from 'projects/ng-dynamic-json-form/src/public-api';
import { FORM_CONFIG_EMAIL_ZHTW } from '../../basic/email/form-config-email_zh-TW.constant';
import { FORM_CONFIG_SELECT_RELATIONSHIP_ZHTW } from '../../basic/select/form-config-select-relationship_zh-TW.constant';
import { FORM_CONFIG_TEXT_NAME_ZHTW } from '../../basic/text/form-config-text-name_zh-TW.constant';
import { FORM_CONFIG_ADDRESS_ZHTW } from '../../form-group/address/form-config-address_zh-TW.constant';

export const FORM_CONFIG_FAMILY_MEMBERS_ZHTW: FormControlConfig = {
  label: '家庭成員',
  formControlName: 'familyMembers',
  value: [],
  formArray: {
    length: 1,
    editable: true,
    templateLabel: '成員',
    template: [
      FORM_CONFIG_TEXT_NAME_ZHTW,
      FORM_CONFIG_EMAIL_ZHTW,
      FORM_CONFIG_ADDRESS_ZHTW,
      FORM_CONFIG_SELECT_RELATIONSHIP_ZHTW,
    ],
  },
};
