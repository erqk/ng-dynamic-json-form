import { formatDate } from '@angular/common';
import { FormControlConfig } from 'ng-dynamic-json-form';

const minDate = `Date(${formatDate(new Date(), 'yyyy/MM/dd', 'en-US')})`;
export const CONFIG_DATE_MINDATE_EN: FormControlConfig = {
  label: 'Date (min date)',
  formControlName: 'minDate',
  type: 'date',
  props: {
    min: new Date(),
    minDate
  },
};
