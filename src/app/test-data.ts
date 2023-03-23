import { JsonFormGroupData } from "./core/models/json-form-group-data.model";

export const testData: JsonFormGroupData = {
  form: [
    {
      label: 'Name',
      value: 'Andrew',
      type: 'text',
      validators: ['required', 'minLength:4', 'regex:\\w+'],
    },
    {
      label: 'Age',
      value: '18',
      type: 'number',
      validators: ['required', 'min:18', 'max:50'],
    },
    {
      label: 'Email',
      value: 'emailaddress@example.com',
      type: 'email',
      validators: ['required', 'email'],
    },
    {
      label: 'Gender',
      value: '0',
      type: 'radio',
      validators: ['required'],
    },
    {
      label: 'Address',
      value: {},
      child: {
        addressHome: [
          {
            label: 'Country',
            value: 'country name',
            type: 'text',
          },
          {
            label: 'State',
            value: 'State name',
            type: 'text',
          },
          {
            label: 'Postcode',
            value: '00000',
            type: 'text',
          },
        ],
        addressCompany: [
          {
            label: 'Country',
            value: 'country name',
            type: 'text',
          },
          {
            label: 'State',
            value: 'State name',
            type: 'text',
          },
          {
            label: 'Postcode',
            value: '11111',
            type: 'text',
          },
        ],
      },
    },
  ],
};
