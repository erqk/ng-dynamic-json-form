import { FormControlConfig } from 'ng-dynamic-json-form';

export const FORM_CONFIG_FORM_ARRAY_EN: FormControlConfig[] = [
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
