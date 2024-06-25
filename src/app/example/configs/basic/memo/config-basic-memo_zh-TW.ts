import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_BASIC_MEMO_ZHTW: FormControlConfig = {
  label: '備註',
  formControlName: 'memo',
  type: 'textarea',
  props: {
    rows: 3,
    cols: 30,
    minRows: 3,
    enabled: true,
    autoResize: true,
  },
};
