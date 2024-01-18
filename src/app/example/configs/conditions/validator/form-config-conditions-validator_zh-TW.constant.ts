import { FormControlConfig } from 'ng-dynamic-json-form';
import { FORM_CONFIG_BASIC_ZHTW } from '../../basic/form-config-basic_zh-TW.constant';

const NAME = FORM_CONFIG_BASIC_ZHTW.find((x) => x.formControlName === 'name')!;
const TEMPERATURE = FORM_CONFIG_BASIC_ZHTW.find(
  (x) => x.formControlName === 'temperature'
)!;

export const FORM_CONFIG_CONDITIONS_VALIDATOR_ZHTW: FormControlConfig[] = [
  {
    formControlName: 'group',
    label: '條件 - 設定驗證器',
    description: '溫度值大於 50 時，姓名欄位為必填。',
    layout: {
      labelStyles: 'margin-bottom: 0.5rem;',
      descriptionStyles: 'margin-bottom: 1rem;',
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
