import { FormControlConfig } from 'ng-dynamic-json-form';
import { FORM_CONFIG_BASIC_EN } from '../../basic/form-config-basic_en.constant';

const target = (name: string) =>
  FORM_CONFIG_BASIC_EN.find((x) => x.formControlName === name);

const NAME = target('name')!;
const EMAIL = target('email')!;
const ADDRESS = target('address')!;
const RELATIONSHIP = target('relationship')!;

export const FORM_CONFIG_FAMILY_MEMBERS_EN: FormControlConfig[] = [
  {
    label: 'Family members',
    formControlName: 'familyMembers',
    value: [],
    formArray: {
      length: 1,
      editable: true,
      templateLabel: 'Member',
      template: [NAME, EMAIL, ADDRESS, RELATIONSHIP],
    },
  },
];
