import { FormControlConfig } from 'ng-dynamic-json-form';

export const FORM_CONFIG_ADDRESS_DYNAMIC_EN: FormControlConfig[] = [
  {
    label: 'Address (dynamic)',
    formControlName: 'address',
    layout: {
      formGroupStyles: 'display: grid; grid-template-columns: repeat(3,1fr);',
    },
    children: [
      {
        label: 'Country',
        formControlName: 'country',
        type: 'select',
        extra: {
          autoDisplayFirst: false,
          virtualScroll: true,
          virtualScrollItemSize: 48,
        },
        options: {
          src: {
            url: 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json',
            method: 'GET',
            mapData: {
              labelKey: 'name',
            },
          },
        },
      },
      {
        label: 'State',
        formControlName: 'state',
        type: 'select',
        extra: {
          autoDisplayFirst: false,
          virtualScroll: true,
          virtualScrollItemSize: 48
        },
        options: {
          src: {
            url: 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states.json',
            method: 'GET',
            mapData: {
              labelKey: 'name',
            },
            filter: {
              by: 'address.country',
              conditions: {
                '&&': [['id', '===', 'country_id']],
              },
            },
          },
        },
      },
      {
        label: 'City',
        formControlName: 'city',
        type: 'select',
        extra: {
          autoDisplayFirst: false,
          virtualScroll: true,
          virtualScrollItemSize: 48
        },
        options: {
          src: {
            url: 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/cities.json',
            method: 'GET',
            mapData: {
              labelKey: 'name',
            },
            filter: {
              by: 'address.state',
              conditions: {
                '&&': [['id', '===', 'state_id']],
              },
            },
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
