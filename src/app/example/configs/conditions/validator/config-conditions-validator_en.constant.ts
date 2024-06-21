import { FormControlConfig } from 'ng-dynamic-json-form';
import { FORM_CONFIG_BASIC_EN } from '../../basic/form-config-basic_en.constant';

const NAME = FORM_CONFIG_BASIC_EN.find((x) => x.formControlName === 'name')!;
const TEMPERATURE = FORM_CONFIG_BASIC_EN.find(
  (x) => x.formControlName === 'temperature'
)!;

export const CONFIG_CONDITIONS_VALIDATOR_EN: FormControlConfig[] = [
  {
    formControlName: 'group',
    description: 'Name is required when slider > 50',
    children: [
      { ...TEMPERATURE, label: 'Slider', formControlName: 'slider' },
      {
        ...NAME,
        value: '',
        conditions: {
          'control.disabled': {
            '&&': [['group.slider', '<', 0]],
          },
          'validator.required': {
            '&&': [['group.slider', '>', 50]],
          },
        },
      },
    ],
  },
];
