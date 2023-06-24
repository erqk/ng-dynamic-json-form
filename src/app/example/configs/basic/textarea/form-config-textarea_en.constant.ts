import { FormControlConfig } from 'projects/ng-dynamic-json-form/src/public-api';

export const FORM_CONFIG_TEXTAREA_EN: FormControlConfig = {
  label: 'Memo',
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
