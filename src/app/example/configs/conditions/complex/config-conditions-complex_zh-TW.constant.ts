import { FormControlConfig } from 'ng-dynamic-json-form';
import { FORM_CONFIG_BASIC_ZHTW } from '../../basic/form-config-basic_zh-TW.constant';

const target = (name: string) =>
  FORM_CONFIG_BASIC_ZHTW.find((x) => x.formControlName === name);

const NAME = target('name')!;
const AGE = target('age')!;
const TOGGLES = target('toggles')!;

export const CONFIG_CONDITIONS_MULTIPLE_ZHTW: FormControlConfig[] = [
  {
    description:
      "if (name === '王小明' && age > 20 && (checkbox === false || switch === false)), 禁用此欄位",
    formControlName: 'conditionsMultiple',
    conditions: {
      'control.disabled': {
        '&&': [
          ['group.name', '===', '王小明'],
          ['group.age', '>', 20],
          {
            '||': [
              ['group.toggles.checkbox', '===', false],
              ['group.toggles.switch', '===', false],
            ],
          },
        ],
      },
    },
  },
  {
    formControlName: 'group',
    layout: {
      hostStyles:
        'border: solid 1px var(--border-color-50); border-radius: 0.5rem; padding: 1rem;',
    },
    children: [NAME, AGE, TOGGLES],
  },
];
