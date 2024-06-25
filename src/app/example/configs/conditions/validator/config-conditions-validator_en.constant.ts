import { FormControlConfig } from 'ng-dynamic-json-form';
import { CONFIG_BASIC_NAME_EN } from '../../basic/name/config-basic-name_en';
import { CONFIG_BASIC_TEMPERATURE_EN } from '../../basic/temperature/config-basic-temperature_en';

const NAME = CONFIG_BASIC_NAME_EN;
const TEMPERATURE = CONFIG_BASIC_TEMPERATURE_EN;

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
