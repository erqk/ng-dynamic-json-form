import { JsonFormGroupData } from './core/models/json-form-group-data.model';

export const testData: JsonFormGroupData = {
  form: [
    {
      label: 'Name',
      formControlName: 'name',
      value: 'Andrew',
      type: 'text',
      validators: ['required', 'minLength:4', 'regex:\\D+'],
    },
    {
      label: 'Age',
      formControlName: 'age',
      value: '18',
      type: 'number',
      validators: ['required', 'min:18', 'max:50'],
    },
    {
      label: 'Gender',
      formControlName: 'gender',
      value: '0',
      type: 'radio',
      validators: ['required'],
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
      validators: ['required'],
    },
    {
      label: 'Email',
      formControlName: 'email',
      value: 'emailaddress@example.com',
      type: 'email',
      validators: ['required', 'email'],
    },
    {
      label: 'Credit cards type',
      formControlName: 'creditCardTypes',
      type: 'checkbox',
      value: ['master'],
      validators: ['required'],
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
        },
        {
          label: 'State',
          formControlName: 'state',
          value: 'State name',
          type: 'text',
        },
        {
          label: 'Postcode',
          formControlName: 'postcode',
          value: '00000',
          type: 'text',
        },
      ],
    },
    // {
    //   label: 'Address',
    //   formControlName: 'address',
    //   value: {},
    //   children: {
    //     addressHome: [
    //       {
    //         label: 'Country',
    //         formControlName: 'country',
    //         value: 'country name',
    //         type: 'text',
    //       },
    //       {
    //         label: 'State',
    //         formControlName: 'state',
    //         value: 'State name',
    //         type: 'text',
    //       },
    //       {
    //         label: 'Postcode',
    //         formControlName: 'postcode',
    //         value: '00000',
    //         type: 'text',
    //       },
    //     ],
    //     addressCompany: [
    //       {
    //         label: 'Country',
    //         formControlName: 'country',
    //         value: 'country name',
    //         type: 'text',
    //       },
    //       {
    //         label: 'State',
    //         formControlName: 'state',
    //         value: 'State name',
    //         type: 'text',
    //       },
    //       {
    //         label: 'Postcode',
    //         formControlName: 'postcode',
    //         value: '11111',
    //         type: 'text',
    //       },
    //     ],
    //   },
    // },
  ],
};
