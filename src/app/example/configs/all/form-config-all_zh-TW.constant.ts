import { FormControlConfig } from 'ng-dynamic-json-form';

export const FORM_CONFIG_ALL_ZHTW: FormControlConfig[] = [
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
          {
            name: 'minLength',
            value: 2,
          },
          {
            name: 'pattern',
            value: '\\D+',
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
        validators: [
          {
            name: 'required',
          },
          {
            name: 'min',
            value: 18,
          },
          {
            name: 'max',
            value: 50,
          },
        ],
      },
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
            label: '男',
            value: '0',
          },
          {
            label: '女',
            value: '1',
          },
        ],
      },
      {
        label: '顯示 email',
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
  {
    formControlName: 'binaryCheckbox',
    value: false,
    type: 'checkbox',
    options: [
      {
        label: "我是二元勾選框",
      },
    ],
  },
  {
    label: '信用卡類型',
    formControlName: 'creditCardTypes',
    type: 'checkbox',
    value: ['master'],
    validators: [
      {
        name: 'required',
      },
    ],
    optionsLayout: 'column',
    options: [
      {
        label: 'Visa',
        value: 'visa',
      },
      {
        label: 'Master',
        value: 'master',
      },
      {
        label: 'JCB',
        value: 'jcb',
      },
    ],
  },
  {
    label: '車輛品牌',
    formControlName: 'carBrand',
    type: 'dropdown',
    value: '0',
    options: [
      {
        label: 'Tesla',
        value: '0',
      },
      {
        label: 'BMW',
        value: '1',
      },
      {
        label: 'Mercedes',
        value: '2',
      },
    ],
  },
  {
    label: '地址',
    formControlName: 'address',
    value: {},
    children: [
      {
        label: '國家',
        formControlName: 'country',
        value: '國家名',
        type: 'text',
        cssGrid: {
          gridColumn: '1',
        },
      },
      {
        label: '州屬',
        formControlName: 'state',
        value: '州屬名',
        type: 'text',
        cssGrid: {
          gridColumn: '2',
        },
      },
      {
        label: '郵編',
        formControlName: 'postcode',
        value: '00000',
        type: 'text',
      },
    ],
  },
  {
    label: 'Textarea',
    formControlName: 'textarea',
    type: 'textarea',
    extra: {
      textarea: {
        rows: 3,
        cols: 30,
        autoResize: true,
      },
    },
  },
  {
    label: 'Slider',
    formControlName: 'rangeSlider',
    type: 'range',
    value: 20,
    extra: {
      range: {
        min: 0,
        max: 100,
        step: 10,
        showCurrentValue: true,
        showTickMarks: true,
      },
    },
  },
  {
    label: '日期',
    formControlName: 'dateTimeInput',
    type: 'date',
    extra: {
      date: {
        selectTime: true,
        outputFormat: 'yyyy/MM/dd HH:mm',
      },
    },
  },
  {
    label: '自訂元件 (FormControl)',
    formControlName: 'customComponentControl',
    customComponent: 'custom-input',
  },
  {
    label: '自訂元件 (FormGroup)',
    formControlName: 'customComponentGroup',
    customComponent: 'custom-input-group',
  },
  {
    label: '家庭成員資料',
    formControlName: 'familyMemberInfo',
    value: [],
    formArray: {
      length: 1,
      editable: true,
      templateLabel: '成員',
      template: [
        {
          label: '名字',
          formControlName: 'name',
          value: '某某某',
          type: 'text',
        },
        {
          label: 'Email',
          formControlName: 'email',
          value: '',
          validators: [
            {
              name: 'email',
            },
          ],
          type: 'text',
        },
        {
          label: '地址',
          formControlName: 'address',
          value: {},
          children: [
            {
              label: '國家',
              formControlName: 'country',
              value: '國家名',
              type: 'text',
              cssGrid: {
                gridColumn: '1',
              },
            },
            {
              label: '州屬',
              formControlName: 'state',
              value: '州屬名',
              type: 'text',
              cssGrid: {
                gridColumn: '2',
              },
            },
            {
              label: '郵編',
              formControlName: 'postcode',
              value: '00000',
              type: 'text',
            },
          ],
        },
        {
          label: '關係',
          formControlName: 'relationship',
          value: '',
          type: 'dropdown',
          options: [
            {
              label: '父親',
              value: 0,
            },
            {
              label: '母親',
              value: 1,
            },
            {
              label: '兄弟姐妹',
              value: 2,
            },
          ],
        },
      ],
    },
  },
];
