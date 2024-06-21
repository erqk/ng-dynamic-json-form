import { FormControlConfig } from 'ng-dynamic-json-form';
import { FORM_CONFIG_BASIC_EN } from '../../basic/form-config-basic_en.constant';

const target = (name: string) =>
  FORM_CONFIG_BASIC_EN.find((x) => x.formControlName === name);

const NAME = target('name')!;
const AGE = target('age')!;
const TOGGLES = target('toggles')!;

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
