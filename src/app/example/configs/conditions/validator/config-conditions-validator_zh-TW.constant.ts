import { FormControlConfig } from 'ng-dynamic-json-form';
import { FORM_CONFIG_BASIC_ZHTW } from '../../basic/form-config-basic_zh-TW.constant';
import { CONFIG_CONDITIONS_VALIDATOR_EN } from './config-conditions-validator_en.constant';

const NAME = FORM_CONFIG_BASIC_ZHTW.find((x) => x.formControlName === 'name')!;
const TEMPERATURE = FORM_CONFIG_BASIC_ZHTW.find(
  (x) => x.formControlName === 'temperature'
)!;

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
