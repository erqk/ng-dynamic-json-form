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
        operation: ['basicInfo.age', '>', 20],
        groupOperator: '&&',
        groupWith: [
          {
            operation: ['basicInfo.name', '===', '王小明'],
          },
          {
            operation: ['basicInfo.showEmail', '===', false],
            groupOperator: '||',
            groupWith: [
              {
                operation: ['basicInfo.gender', '===', '0'],
              },
            ],
          },
        ],
      },
    ],
  },
  FORM_CONFIG_BASIC_INFO_ZHTW,
];
