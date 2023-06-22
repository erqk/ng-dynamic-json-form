import { FormControlConfig } from 'ng-dynamic-json-form';

export const FORM_CONFIG_MULTI_CONDITION_ZHTW: FormControlConfig[] = [
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
  {
    label: '基本資料',
    formControlName: 'basicInfo',
    children: [
      {
        label: '名字',
        formControlName: 'name',
        value: '王小明',
        type: 'text',
        conditions: [
          {
            name: 'required',
            control: 'basicInfo.age',
            controlValue: 20,
            operator: '>=',
          },
        ],
        validators: [
          {
            name: 'required',
            message: '請輸入名字',
          },
        ],
      },
      {
        label: '年齡',
        formControlName: 'age',
        value: '18',
        type: 'number',
        ngxMaskConfig: {
          mask: '00',
        },
      },
      {
        label: '性別',
        formControlName: 'gender',
        value: '0',
        type: 'radio',
        validators: [
          {
            name: 'required',
          },
        ],
        options: [
          {
            label: 'Male',
            value: '0',
          },
          {
            label: 'Female',
            value: '1',
          },
        ],
      },
      {
        label: '顯示 Email',
        formControlName: 'showEmail',
        value: false,
        type: 'switch',
        extra: {
          switch: {
            label: '顯示 Email 輸入框',
            labelPosition: 'before',
          },
        },
        validators: [
          {
            name: 'required',
          },
        ],
      },
      {
        label: 'Email',
        formControlName: 'email',
        value: 'emailaddress@example.com',
        type: 'email',
        conditions: [
          {
            name: 'hidden',
            control: 'basicInfo.showEmail',
            controlValue: false,
            operator: '===',
          },
        ],
        validators: [
          {
            name: 'required',
          },
          {
            name: 'email',
          },
        ],
      },
    ],
  },
];
