import { FormControlConfig } from 'ng-dynamic-json-form';

export const FORM_CONFIG_BASIC_ZHTW: FormControlConfig[] = [
  {
    label: '姓名',
    formControlName: 'name',
    type: 'text',
    validators: [
      {
        name: 'required',
        message: '請輸入名字',
      },
      {
        name: 'minLength',
        value: 2,
        message: '請輸入至少 2 個字',
      },
      {
        name: 'pattern',
        value: '^\\D+$',
        message: '不可輸入數字',
      },
    ],
  },
  {
    label: '年齡',
    description: '使用數字遮罩',
    formControlName: 'age',
    type: 'number',
    inputMask: {
      mask: '00',
    },
    validators: [
      {
        name: 'required',
        message: '請輸入年齡',
      },
      {
        name: 'min',
        value: 18,
        message: '不可小於 18 歲',
      },
      {
        name: 'max',
        value: 65,
        message: '不可超過 65 歲',
      },
    ],
  },
  {
    formControlName: 'toggles',
    layout: {
      formGroupStyles: 'display: flex; gap: 2.5rem;',
    },
    children: [
      {
        formControlName: 'checkbox',
        value: false,
        type: 'checkbox',
        description: '二元勾選框',
        layout: {
          descriptionPosition: 'after',
        },
        options: {
          data: [
            {
              label: '確定?',
            },
          ],
        },
      },
      {
        formControlName: 'switch',
        value: false,
        type: 'switch',
        options: {
          labelPosition: 'before',
          data: [
            {
              label: '開啟?',
            },
          ],
        },
      },
    ],
  },
  {
    label: '地址',
    formControlName: 'address',
    layout: {
      formGroupStyles: 'display: grid; grid-template-columns: repeat(3,1fr);',
      contentCollapsible: 'collapse',
    },
    children: [
      {
        label: '國家',
        formControlName: 'country',
        type: 'text',
        props: {
          placeholder: '國家',
        },
      },
      {
        label: '州/省/縣市',
        formControlName: 'state',
        type: 'text',
        props: {
          placeholder: '州/省/縣市',
        },
      },
      {
        label: '郵遞區號',
        formControlName: 'postcode',
        type: 'text',
        props: {
          placeholder: '00000',
        },
      },
      {
        label: '詳細地址',
        formControlName: 'address',
        type: 'text',
        layout: {
          hostStyles: 'grid-column: -1/1;',
        },
        props: {
          placeholder: '詳細地址',
        },
      },
    ],
  },
  {
    label: '信用卡',
    formControlName: 'cards',
    layout: {
      formGroupStyles: 'row-gap: 0px',
    },
    children: [
      {
        formControlName: 'cardTypes',
        type: 'checkbox',
        value: [0],
        validators: [
          {
            name: 'required',
            message: '請至少選擇一個',
          },
        ],
        options: {
          layout: 'column',
          data: [
            {
              label: 'Visa',
              value: 0,
            },
            {
              label: 'Master',
              value: 1,
            },
            {
              label: 'JCB',
              value: 2,
            },
            {
              label: '其他',
              value: 3,
            },
          ],
        },
      },
      {
        formControlName: 'cardOther',
        props: {
          placeholder: '其他卡片類型',
        },
        conditions: {
          hidden: {
            '&&': [['cards.cardTypes', 'notIncludes', 3]],
          },
        },
      },
    ],
  },
  {
    label: '日期',
    formControlName: 'date',
    type: 'date',
    props: {
      appendTo: 'body',
      min: 'Date(2024/01/01)',
      minDate: 'Date(2024/01/01)',
      showTime: true,
      showIcon: true,
    },
  },
  {
    label: '電子郵件',
    formControlName: 'email',
    value: 'emailaddress@example.com',
    type: 'email',
    validators: [
      {
        name: 'required',
        message: '請輸入電子郵件',
      },
      {
        name: 'email',
        message: '輸入的電子郵件格式不正確',
      },
    ],
  },
  {
    label: '性別',
    formControlName: 'gender',
    value: '0',
    type: 'radio',
    options: {
      data: [
        {
          label: '男生',
          value: '0',
        },
        {
          label: '女生',
          value: '1',
        },
        {
          label: '我不想說',
          value: '2',
        },
      ],
    },
  },
  {
    label: '關係',
    formControlName: 'relationship',
    value: '',
    type: 'select',
    options: {
      data: [
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
        {
          label: '配偶',
          value: 3,
        },
      ],
    },
  },
  {
    label: '溫度',
    formControlName: 'temperature',
    type: 'range',
    value: 27,
    props: {
      min: -20,
      max: 80,
      step: 1,
      showCurrentValue: true,
      showTickMarks: true,
    },
  },
  {
    label: '備註',
    formControlName: 'memo',
    type: 'textarea',
    props: {
      rows: 3,
      cols: 30,
      minRows: 3,
      enabled: true,
      autoResize: true,
    },
  },
];
