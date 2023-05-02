import { FormControlConfig } from 'ng-dynamic-json-form';

export const testData: FormControlConfig[] = [
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
        label: 'Multi condition input',
        description:
          "Required If (name==='Andrew' && age > 20 && (status===false || gender==='0') )",
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
                control: 'basicInfo.status',
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
      rows: 3,
      cols: 30,
      autoResize: true,
    },
  },
  {
    label: 'Custom Component (FormControl)',
    formControlName: 'customComponentControl',
    customComponent: 'custom-input',
  },
  {
    label: 'Custom Component (FormGroup)',
    formControlName: 'customComponentGroup',
    customComponent: 'custom-input-group',
  },
  {
    label: 'Family member info',
    formControlName: 'familyMemberInfo',
    value: [],
    formArray: {
      length: 1,
      editable: true,
      templateLabel: 'Member',
      template: [
        {
          label: 'Name',
          formControlName: 'name',
          value: 'Name',
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
