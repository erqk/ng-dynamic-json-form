import { FormControlConfig } from 'ng-dynamic-json-form';

export const FORM_CONFIG_BASIC_EN: FormControlConfig[] = [
  {
    label: 'Name',
    formControlName: 'name',
    value: 'Andrew',
    type: 'text',
    validators: [
      {
        name: 'required',
        message: 'Please type your name',
      },
      {
        name: 'minLength',
        value: 4,
        message: 'Please enter at lease 4 characters',
      },
      {
        name: 'pattern',
        value: '\\D+',
        message: 'Numbers is not allowed',
      },
    ],
  },
  {
    label: 'Age',
    description: 'Input mask (number)',
    formControlName: 'age',
    value: '18',
    type: 'number',
    inputMask: {
      mask: '00',
    },
    validators: [
      {
        name: 'required',
        message: 'Please enter your age',
      },
      {
        name: 'min',
        value: 18,
        message: 'Must above 18 years old',
      },
      {
        name: 'max',
        value: 65,
        message: 'Must not greater than 65 years old',
      },
    ],
  },
  {
    formControlName: 'toggles',
    layout: {
      contentStyles: 'display: flex; gap: 2.5rem;',
    },
    children: [
      {
        formControlName: 'checkbox',
        value: false,
        type: 'checkbox',
        description: 'A binary checkbox',
        layout: {
          descriptionPosition: 'after',
        },
        options: {
          data: [
            {
              label: 'Confirm?',
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
              label: 'Open?',
            },
          ],
        },
      },
    ],
  },
  {
    formControlName: 'address',
    layout: {
      contentStyles: 'display: grid; grid-template-columns: repeat(3,1fr);',
    },
    children: [
      {
        label: 'Country',
        formControlName: 'country',
        placeholder: 'Country',
        type: 'text',
      },
      {
        label: 'State/Province',
        formControlName: 'state',
        placeholder: 'State/Province',
        type: 'text',
      },
      {
        label: 'Zip/Postal code',
        formControlName: 'postcode',
        placeholder: '00000',
        type: 'text',
      },
      {
        label: 'Address',
        formControlName: 'address',
        type: 'text',
        placeholder: 'Address',
        layout: {
          hostStyles: 'grid-column: -1/1;',
        },
      },
    ],
  },
  {
    label: 'Cards',
    formControlName: 'cards',
    type: 'checkbox',
    value: [0],
    validators: [
      {
        name: 'required',
        message: 'Please choose at least one.',
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
      ],
    },
  },
  {
    label: 'Date',
    formControlName: 'date',
    type: 'date',
    extra: {
      appendTo: 'body',
      min: 'Date(2024/01/01)',
      minDate: 'Date(2024/01/01)',
      showTime: true,
      showIcon: true,
    },
  },
  {
    label: 'Email',
    formControlName: 'email',
    value: 'emailaddress@example.com',
    type: 'email',
    validators: [
      {
        name: 'required',
        message: 'Please enter your email',
      },
      {
        name: 'email',
        message: 'Invalid email format',
      },
    ],
  },
  {
    label: 'Gender',
    formControlName: 'gender',
    value: '0',
    type: 'radio',
    options: {
      data: [
        {
          label: 'Male',
          value: '0',
        },
        {
          label: 'Female',
          value: '1',
        },
        {
          label: 'Prefer not to state',
          value: '2',
        },
      ],
    },
  },
  {
    label: 'Relationship',
    formControlName: 'relationship',
    value: '',
    type: 'select',
    options: {
      data: [
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
        {
          label: 'Spouse',
          value: 3,
        },
      ],
    },
  },
  {
    label: 'Temperature',
    formControlName: 'temperature',
    type: 'range',
    value: 27,
    extra: {
      min: -20,
      max: 80,
      step: 1,
      showCurrentValue: true,
      showTickMarks: true,
      discrete: true,
    },
  },
  {
    label: 'Memo',
    formControlName: 'memo',
    type: 'textarea',
    extra: {
      rows: 3,
      cols: 30,
      minRows: 3,
      enabled: true,
      autoResize: true,
    },
  },
];
