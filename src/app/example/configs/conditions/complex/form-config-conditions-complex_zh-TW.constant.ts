import { FormControlConfig } from 'ng-dynamic-json-form';
import { FORM_CONFIG_BASIC_ZHTW } from '../../basic/form-config-basic_zh-TW.constant';

const target = (name: string) =>
  FORM_CONFIG_BASIC_ZHTW.find((x) => x.formControlName === name);

const NAME = target('name')!;
const AGE = target('age')!;
const TOGGLES = target('toggles')!;

export const FORM_CONFIG_CONDITIONS_COMPLEX_ZHTW: FormControlConfig[] = [
  {
    label: '條件 - 多重判斷',
    description:
      "必填條件 (name === '王小明' && age > 20 && (checkbox === false || switch === false))",
    formControlName: 'conditionsComplext',
    validators: [
      {
        name: 'required',
        message: '條件符合，此欄位必填！',
      },
    ],
    conditions: {
      required: {
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
