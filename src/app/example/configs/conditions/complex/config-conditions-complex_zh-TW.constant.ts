import { FormControlConfig } from 'ng-dynamic-json-form';
import { CONFIG_BASIC_AGE_ZHTW } from '../../basic/age/config-basic-age_zh-TW';
import { CONFIG_BASIC_NAME_ZHTW } from '../../basic/name/config-basic-name_zh-TW';
import { CONFIG_BASIC_TOGGLES_ZHTW } from '../../basic/toggles/config-basic-toggles_zh-TW';

const NAME = CONFIG_BASIC_NAME_ZHTW;
const AGE = CONFIG_BASIC_AGE_ZHTW;
const TOGGLES = CONFIG_BASIC_TOGGLES_ZHTW;

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
