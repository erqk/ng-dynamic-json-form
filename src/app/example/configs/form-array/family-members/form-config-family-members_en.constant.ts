import { FormControlConfig } from 'projects/ng-dynamic-json-form/src/public-api';
import { FORM_CONFIG_EMAIL_EN } from '../../basic/email/form-config-email_en.constant';
import { FORM_CONFIG_TEXT_NAME_EN } from '../../basic/text/form-config-text-name_en.constant';
import { FORM_CONFIG_ADDRESS_EN } from '../../form-group/address/form-config-address_en.constant';
import { FORM_CONFIG_SELECT_RELATIONSHIP_EN } from '../../basic/select/form-config-select-relationship_en.constant';

export const FORM_CONFIG_FAMILY_MEMBERS_EN: FormControlConfig = {
  label: 'Family members',
  formControlName: 'familyMembers',
  value: [],
  formArray: {
    length: 1,
    editable: true,
    templateLabel: 'Member',
    template: [
      FORM_CONFIG_TEXT_NAME_EN,
      FORM_CONFIG_EMAIL_EN,
      FORM_CONFIG_ADDRESS_EN,
      FORM_CONFIG_SELECT_RELATIONSHIP_EN,
    ],
  },
};
