import { FormControlConfig } from 'ng-dynamic-json-form';

export const FORM_CONFIG_BASIC_EN: FormControlConfig[] = [
  {
    label: 'Name',
    formControlName: 'name',
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
        value: '^\\D+$',
        message: 'Numbers are not allowed',
      },
    ],
  },
  {
    label: 'Age',
    description: 'Input mask (number)',
    formControlName: 'age',
    type: 'number',
    inputMask: {
      mask: 'Number',
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
      formGroupStyles: 'display: flex; gap: 2.5rem;',
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
    label: 'Address',
    formControlName: 'address',
    layout: {
      formGroupStyles: 'display: grid; grid-template-columns: repeat(3,1fr);',
      contentCollapsible: 'collapse',
    },
    children: [
      {
        label: 'Country',
        formControlName: 'country',
        type: 'text',
        props: {
          placeholder: 'Country',
        },
      },
      {
        label: 'State/Province',
        formControlName: 'state',
        type: 'text',
        props: {
          placeholder: 'State/Province',
        },
      },
      {
        label: 'Zip/Postal code',
        formControlName: 'postcode',
        type: 'text',
        props: {
          placeholder: '00000',
        },
      },
      {
        label: 'Address',
        formControlName: 'address',
        type: 'text',
        layout: {
          hostStyles: 'grid-column: -1/1;',
        },
        props: {
          placeholder: 'Address',
        },
      },
    ],
  },
  {
    label: 'Cards',
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
            {
              label: 'Other',
              value: 3,
            },
          ],
        },
      },
      {
        formControlName: 'cardOther',
        props: {
          placeholder: 'Other card type',
        },
        conditions: {
          'control.hidden': {
            '&&': [['cards.cardTypes', 'notIncludes', 3]],
          },
        },
      },
    ],
  },
  {
    label: 'Date',
    formControlName: 'date',
    type: 'date',
    props: {
      appendTo: 'body',
      min: new Date(),
      minDate: new Date(),
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
    props: {
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
    props: {
      rows: 3,
      cols: 30,
      minRows: 3,
      enabled: true,
      autoResize: true,
    },
  },
];
