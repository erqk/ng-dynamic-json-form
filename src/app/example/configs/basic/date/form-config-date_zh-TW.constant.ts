import { FormControlConfig } from 'projects/ng-dynamic-json-form/src/public-api';

export const FORM_CONFIG_DATE_ZHTW: FormControlConfig = {
  label: '日期',
  formControlName: 'date',
  type: 'date',
  extra: {
    date: {
      selectTime: true,
      outputFormat: 'yyyy/MM/dd HH:mm',
    },
  },
};
