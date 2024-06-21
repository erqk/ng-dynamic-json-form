import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_DATE_MINDATE_ZHTW: FormControlConfig = {
  label: '日期 (最早日期)',
  formControlName: 'minDate',
  type: 'date',
  props: {
    min: new Date(),
  },
};
