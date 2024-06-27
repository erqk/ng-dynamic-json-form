import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_BASIC_DATE_ZHTW: FormControlConfig = {
  label: '日期',
  formControlName: 'date',
  type: 'date',
  props: {
    appendTo: 'body',
    min: 'Date(2024/01/01)',
    minDate: 'Date(2024/01/01)',
    showTime: true,
    showIcon: true,
    styleClass: 'w-full',
  },
};
