import { FormControlConfig } from 'ng-dynamic-json-form';
import { FORM_CONFIG_BASIC_INFO_ZHTW } from '../../configs/form-group/basic-info/form-config-basic-info-zh-TW.constant';

export const PLAYGROUND_CONFIG_MULTI_CONDITION_ZHTW: FormControlConfig[] = [
  {
    label: '多重條件輸入元件',
    description:
      "若判斷式成立 (名字 === '王小明' && 年齡 > 20 && (顯示 Email === false || 性別 === '0'))\n" +
      '則 required === true',
    formControlName: 'multiConditionInput',
    type: 'text',
    validators: [
      {
        name: 'required',
      },
    ],
    conditions: [
      {
        name: 'required',
        control: 'basicInfo.age',
        controlValue: 20,
        operator: '>',
        groupOperator: '&&',
        groupWith: [
          {
            control: 'basicInfo.name',
            controlValue: '王小明',
            operator: '===',
          },
          {
            control: 'basicInfo.showEmail',
            controlValue: false,
            operator: '===',
            groupOperator: '||',
            groupWith: [
              {
                control: 'basicInfo.gender',
                controlValue: '0',
                operator: '===',
              },
            ],
          },
        ],
      },
    ],
  },
  FORM_CONFIG_BASIC_INFO_ZHTW,
];
