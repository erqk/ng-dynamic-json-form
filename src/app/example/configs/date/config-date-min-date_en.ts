import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_DATE_MINDATE_EN: FormControlConfig = {
  label: 'Date (min date)',
  formControlName: 'minDate',
  type: 'date',
  props: {
    min: new Date(),
  },
};
