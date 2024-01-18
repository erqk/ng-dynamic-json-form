import { FormControlConfig } from 'ng-dynamic-json-form';
import { FORM_CONFIG_BASIC_EN } from '../../basic/form-config-basic_en.constant';

const target = (name: string) =>
  FORM_CONFIG_BASIC_EN.find((x) => x.formControlName === name);

const NAME = target('name')!;
const AGE = target('age')!;
const TOGGLES = target('toggles')!;

export const FORM_CONFIG_CONDITIONS_COMPLEX_EN: FormControlConfig[] = [
  {
    label: 'Conditions - complext operation',
    description:
      "Required if (name === 'Andrew' && age > 20 && (checkbox === false || switch === false))",
    formControlName: 'conditionsComplext',
    validators: [
      {
        name: 'required',
        message: 'Conditions met, this input is required!'
      }
    ],
    conditions: {
      required: {
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
    label: 'Group',
    formControlName: 'group',
    children: [NAME, AGE, TOGGLES],
  },
];
