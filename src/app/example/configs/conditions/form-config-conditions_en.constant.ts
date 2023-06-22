import { FormControlConfig } from 'ng-dynamic-json-form';

export const FORM_CONFIG_MULTI_CONDITION_EN: FormControlConfig[] = [
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
  {
    label: 'Basic Info',
    formControlName: 'basicInfo',
    children: [
      {
        label: 'Name',
        formControlName: 'name',
        value: 'Andrew',
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
            message: 'Please type your name',
          },
        ],
      },
      {
        label: 'Age',
        formControlName: 'age',
        value: '18',
        type: 'number',
        ngxMaskConfig: {
          mask: '00',
        },
      },
      {
        label: 'Gender',
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
        label: 'Show email',
        formControlName: 'showEmail',
        value: false,
        type: 'switch',
        extra: {
          switch: {
            label: 'Show email input field',
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
