import { NgDynamicJsonFormControlConfig } from 'ng-dynamic-json-form';

export const testData: NgDynamicJsonFormControlConfig[] = [
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
        label: 'Custom Component',
        formControlName: 'customComponent',
        customComponent: 'custom-input',
        conditions: [
          {
            name: 'disabled',
            control: 'basicInfo.status',
            controlValue: false,
            operator: '===',
          },
          {
            name: 'required',
            control: 'basicInfo.age',
            controlValue: 20,
            operator: '>',
            groupBooleanOperator: 'AND',
            group: [
              {
                control: 'basicInfo.name',
                controlValue: 'Andrew',
                operator: '===',
              },
              {
                control: 'basicInfo.status',
                controlValue: true,
                operator: '===',
              },
            ],
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
        label: 'Is married',
        formControlName: 'status',
        value: false,
        type: 'switch',
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
            control: 'basicInfo.status',
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
        gridRow: '1/2',
      },
      {
        label: 'State',
        formControlName: 'state',
        value: 'State name',
        type: 'text',
        gridRow: '1/2',
      },
      {
        label: 'Postcode',
        formControlName: 'postcode',
        value: '00000',
        type: 'text',
        gridColumn: 'span 2',
      },
    ],
  },
  {
    label: 'Family member info',
    formControlName: 'familyMemberInfo',
    value: [],
    formArray: {
      length: 5,
      editable: true,
      templateLabel: 'Member',
      template: [
        {
          label: 'Name',
          formControlName: 'name',
          value: '111',
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
          label: 'Address',
          formControlName: 'address',
          value: {},
          children: [
            {
              label: 'Country',
              formControlName: 'country',
              value: 'country name',
              type: 'text',
              gridRow: '1/2',
            },
            {
              label: 'State',
              formControlName: 'state',
              value: 'State name',
              type: 'text',
              gridRow: '1/2',
            },
            {
              label: 'Postcode',
              formControlName: 'postcode',
              value: '00000',
              type: 'text',
              gridColumn: 'span 2',
            },
          ],
        },
        {
          label: 'Relationship',
          formControlName: 'relationship',
          value: '',
          type: 'dropdown',
          options: [
            {
              label: 'Father',
              value: 0,
            },
            {
              label: 'Mother',
              value: 1,
            },
            {
              label: 'Siblings',
              value: 2,
            },
          ],
        },
      ],
    },
  },
];
