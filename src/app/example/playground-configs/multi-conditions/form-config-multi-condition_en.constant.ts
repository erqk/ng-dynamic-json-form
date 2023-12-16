import { FormControlConfig } from 'ng-dynamic-json-form';
import { FORM_CONFIG_BASIC_INFO_EN } from '../../configs/form-group/basic-info/form-config-basic-info-en.constant';

export const PLAYGROUND_CONFIG_MULTI_CONDITION_EN: FormControlConfig[] = [
  {
    label: 'Multi condition input',
    description:
      "if (name==='Andrew' && age > 20 && (showEmail===false || gender==='0'))\n" +
      'then required === true',
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
            operation: ['basicInfo.name', '===', 'Andrew'],
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
  FORM_CONFIG_BASIC_INFO_EN,
];
