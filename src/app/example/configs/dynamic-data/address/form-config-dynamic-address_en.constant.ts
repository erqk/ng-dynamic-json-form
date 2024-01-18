import { FormControlConfig } from 'projects/ng-dynamic-json-form/src/public-api';

export const FORM_CONFIG_ADDRESS_DYNAMIC_EN: FormControlConfig[] = [
  {
    label: 'Address (dynamic)',
    formControlName: 'address',
    layout: {
      childStyles: 'display: grid; grid-template-columns: repeat(3,1fr);',
    },
    children: [
      {
        label: 'Country',
        formControlName: 'country',
        type: 'select',
        extra: {
          autoDisplayFirst: false,
        },
        options: {
          sourceList: [
            {
              src: 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json',
              method: 'GET',
              data: {
                labelKey: 'name',
                valueKeys: ['id', 'name'],
              },
            },
          ],
        },
      },
      {
        label: 'State',
        formControlName: 'state',
        type: 'select',
        extra: {
          autoDisplayFirst: false,
        },
        options: {
          trigger: {
            action: 'FILTER',
            src: 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states.json',
            method: 'GET',
            data: {
              labelKey: 'name',
              valueKeys: ['id', 'name'],
            },
            triggerValuePath: 'address.country, id',
            filterMatchPath: 'country_id',
          },
        },
      },
      {
        label: 'City',
        formControlName: 'city',
        type: 'select',
        extra: {
          autoDisplayFirst: false,
        },
        options: {
          trigger: {
            action: 'FILTER',
            src: 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/cities.json',
            method: 'GET',
            data: {
              labelKey: 'name',
              valueKeys: ['id', 'name'],
            },
            triggerValuePath: 'address.state,id',
            filterMatchPath: 'state_id',
          },
        },
      },
      {
        label: 'Address',
        formControlName: 'address',
        type: 'text',
        layout: {
          hostStyles: 'grid-column: -1/1;',
        },
      },
    ],
  },
];
