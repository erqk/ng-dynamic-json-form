import { FormControlConfig } from 'ng-dynamic-json-form';
import { FORM_CONFIG_BASIC_EN } from '../../basic/form-config-basic_en.constant';

const CARDS = FORM_CONFIG_BASIC_EN.find((x) => x.formControlName === 'cards')!;

export const FORM_CONFIG_CONDITIONS_VISIBILITY_EN: FormControlConfig[] = [
  {
    label: 'Conditions - toggle visibility',
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
          label: 'Has credit cards?',
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
