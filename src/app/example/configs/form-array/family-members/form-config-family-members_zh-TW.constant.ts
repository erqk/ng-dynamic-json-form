import { FormControlConfig } from 'ng-dynamic-json-form';
import { FORM_CONFIG_BASIC_ZHTW } from '../../basic/form-config-basic_zh-TW.constant';

const target = (name: string) =>
  FORM_CONFIG_BASIC_ZHTW.find((x) => x.formControlName === name);

const NAME = target('name')!;
const EMAIL = target('email')!;
const ADDRESS = target('address')!;
const RELATIONSHIP = target('relationship')!;

export const FORM_CONFIG_FAMILY_MEMBERS_ZHTW: FormControlConfig[] = [
  {
    label: '家庭成員',
    formControlName: 'familyMembers',
    value: [],
    formArray: {
      length: 1,
      editable: true,
      templateLabel: '成員',
      template: [NAME, EMAIL, ADDRESS, RELATIONSHIP],
    },
  },
];
