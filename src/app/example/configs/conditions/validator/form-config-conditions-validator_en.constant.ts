import { FormControlConfig } from 'ng-dynamic-json-form';
import { FORM_CONFIG_BASIC_EN } from '../../basic/form-config-basic_en.constant';

const NAME = FORM_CONFIG_BASIC_EN.find((x) => x.formControlName === 'name')!;
const TEMPERATURE = FORM_CONFIG_BASIC_EN.find(
  (x) => x.formControlName === 'temperature'
)!;

export const FORM_CONFIG_CONDITIONS_VALIDATOR_EN: FormControlConfig[] = [
  {
    formControlName: 'group',
    label: 'Conditions - toggle validator',
    description:
      'The name field is required when the temperature is greater than 50.',
    layout: {
      labelStyles: 'margin-bottom: 0.5rem;',
      descriptionStyles: 'margin-bottom: 1rem;'
    },
    children: [
      TEMPERATURE,
      {
        ...NAME,
        value: '',
        conditions: {
          required: {
            '&&': [['group.temperature', '>', 50]],
          },
        },
      },
    ],
  },
];
