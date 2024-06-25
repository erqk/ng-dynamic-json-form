import { FormControlConfig } from 'ng-dynamic-json-form';
import { CONFIG_BASIC_AGE_EN } from '../../basic/age/config-basic-age_en';
import { CONFIG_BASIC_NAME_EN } from '../../basic/name/config-basic-name_en';
import { CONFIG_BASIC_TOGGLES_EN } from '../../basic/toggles/config-basic-toggles_en';

const NAME = CONFIG_BASIC_NAME_EN;
const AGE = CONFIG_BASIC_AGE_EN;
const TOGGLES = CONFIG_BASIC_TOGGLES_EN;

export const CONFIG_CONDITIONS_MULTIPLE_EN: FormControlConfig[] = [
  {
    description:
      "Disabled if (name === 'Andrew' && age > 20 && (checkbox === false || switch === false))",
    formControlName: 'conditionsMultiple',
    conditions: {
      'control.disabled': {
        '&&': [
          ['group.name', '===', 'Andrew'],
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
      hostStyles: 'margin-top: 1.5rem',
    },
    children: [{ ...NAME, value: 'Andrew' }, { ...AGE, value: 22 }, TOGGLES],
  },
];
