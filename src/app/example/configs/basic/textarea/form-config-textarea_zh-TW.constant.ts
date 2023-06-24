import { FormControlConfig } from 'projects/ng-dynamic-json-form/src/public-api';

export const FORM_CONFIG_TEXTAREA_ZHTW: FormControlConfig = {
  label: '備忘錄',
  formControlName: 'memo',
  type: 'textarea',
  extra: {
    textarea: {
      rows: 3,
      cols: 30,
      autoResize: true,
    },
  },
};
