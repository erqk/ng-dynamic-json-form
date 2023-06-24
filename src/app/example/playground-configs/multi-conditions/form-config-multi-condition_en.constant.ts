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
        control: 'basicInfo.age',
        controlValue: 20,
        operator: '>',
        groupOperator: '&&',
        groupWith: [
          {
            control: 'basicInfo.name',
            controlValue: 'Andrew',
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
  FORM_CONFIG_BASIC_INFO_EN,
];
