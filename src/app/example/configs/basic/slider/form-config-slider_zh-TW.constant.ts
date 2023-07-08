import { FormControlConfig } from 'projects/ng-dynamic-json-form/src/public-api';

export const FORM_CONFIG_SLIDER_TEMPERATURE_ZHTW: FormControlConfig = {
  label: '溫度',
  formControlName: 'temperature',
  type: 'range',
  value: 27,
  extra: {
    range: {
      min: -20,
      max: 80,
      step: 1,
      showCurrentValue: true,
      showTickMarks: true,
    },
  },
};
