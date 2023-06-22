import { FormControlConfig } from 'ng-dynamic-json-form';

export const FORM_CONFIG_BASIC_EN: FormControlConfig[] = [
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
          {
            name: 'minLength',
            value: 4,
          },
          {
            name: 'pattern',
            value: '\\D+',
          },
          {
            name: 'custom',
            value: 'firstUppercase',
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
  {
    formControlName: 'binaryCheckbox',
    value: false,
    type: 'checkbox',
    options: [
      {
        label: "I'm a binary checkbox",
      },
    ],
  },
  {
    label: 'Credit cards type',
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
    label: 'Car brand',
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
    label: 'Address',
    formControlName: 'address',
    value: {},
    children: [
      {
        label: 'Country',
        formControlName: 'country',
        value: 'country name',
        type: 'text',
        cssGrid: {
          gridColumn: '1',
        },
      },
      {
        label: 'State',
        formControlName: 'state',
        value: 'State name',
        type: 'text',
        cssGrid: {
          gridColumn: '2',
        },
      },
      {
        label: 'Postcode',
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
    label: 'Date time',
    formControlName: 'dateTimeInput',
    type: 'date',
    extra: {
      date: {
        selectTime: true,
        outputFormat: 'yyyy/MM/dd HH:mm',
      },
    },
  },
];
