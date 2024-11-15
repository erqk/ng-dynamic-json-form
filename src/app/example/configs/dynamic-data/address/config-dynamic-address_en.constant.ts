import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_ADDRESS_DYNAMIC_EN = (translation?: {
  [formControlName: string]: string;
}): FormControlConfig[] => [
  {
    label: translation?.['address'] ?? 'Address (dynamic)',
    formControlName: 'address',
    layout: {
      formGroupStyles: 'display: grid; grid-template-columns: repeat(3,1fr);',
    },
    children: [
      {
        label: translation?.['country'] ?? 'Country/Region',
        formControlName: 'country',
        type: 'select',
        props: {
          autoDisplayFirst: false,
          virtualScroll: true,
          virtualScrollItemSize: 48,
        },
        options: {
          src: {
            url: 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/json/countries.json',
            method: 'GET',
            mapData: {
              labelKey: translation?.['countryLabelKey'] ?? 'name',
              valueKeys: [
                'id',
                'name',
                'timezones.0.zoneName',
                'latitude',
                'longitude',
                'translations',
              ],
            },
          },
        },
      },
      {
        label: translation?.['state'] ?? 'State',
        formControlName: 'state',
        type: 'select',
        props: {
          autoDisplayFirst: false,
          virtualScroll: true,
          virtualScrollItemSize: 48,
        },
        options: {
          src: {
            url: 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/json/states.json',
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
        label: translation?.['city'] ?? 'City',
        formControlName: 'city',
        type: 'select',
        props: {
          autoDisplayFirst: false,
          virtualScroll: true,
          virtualScrollItemSize: 48,
        },
        options: {
          src: {
            url: 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/json/cities.json',
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
        label: translation?.['address'] ?? 'Address',
        formControlName: 'detail',
        type: 'text',
        layout: {
          hostStyles: 'grid-column: -1/1;',
        },
      },
    ],
  },
];
