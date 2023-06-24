import { FormControlConfig } from 'projects/ng-dynamic-json-form/src/public-api';

export const FORM_CONFIG_DATE_EN: FormControlConfig = {
  label: 'Date',
  formControlName: 'date',
  type: 'date',
  extra: {
    date: {
      selectTime: true,
      outputFormat: 'yyyy/MM/dd HH:mm',
    },
  },
};
