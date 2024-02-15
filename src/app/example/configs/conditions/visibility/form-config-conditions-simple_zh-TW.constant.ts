import { FormControlConfig } from 'ng-dynamic-json-form';
import { FORM_CONFIG_BASIC_ZHTW } from '../../basic/form-config-basic_zh-TW.constant';

const CARDS = FORM_CONFIG_BASIC_ZHTW.find(
  (x) => x.formControlName === 'cards'
)!;

export const FORM_CONFIG_CONDITIONS_VISIBILITY_ZHTW: FormControlConfig[] = [
  {
    label: '條件 - 切換顯示狀態',
    formControlName: 'hasCreditCards',
    value: true,
    type: 'switch',
    layout: {
      labelStyles: 'font-size: 1.2rem; font-weight:bold;',
    },
    options: {
      labelPosition: 'before',
      data: [
        {
          label: '是否持有信用卡?',
        },
      ],
    },
  },
  {
    ...CARDS,
    layout: {
      ...CARDS.layout,
      labelStyles: 'font-size: 1rem',
    },
    conditions: {
      hidden: {
        '&&': [['hasCreditCards', '===', false]],
      },
    },
  },
];
