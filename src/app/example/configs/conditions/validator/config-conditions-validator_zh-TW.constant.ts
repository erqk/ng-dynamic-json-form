import { FormControlConfig } from 'ng-dynamic-json-form';
import { CONFIG_BASIC_NAME_ZHTW } from '../../basic/name/config-basic-name_zh-TW';
import { CONFIG_BASIC_TEMPERATURE_ZHTW } from '../../basic/temperature/config-basic-temperature_zh-TW';

const NAME = CONFIG_BASIC_NAME_ZHTW;
const TEMPERATURE = CONFIG_BASIC_TEMPERATURE_ZHTW;

export const CONFIG_CONDITIONS_VALIDATOR_ZHTW: FormControlConfig[] = [
  {
    formControlName: 'group',
    description: 'Slider 的值 > 50 時，姓名欄位必填',
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
