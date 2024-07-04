import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_CUSTOM_COMPONENT_EN = (translation?: {
  label: string;
}): FormControlConfig => ({
  label: translation?.label ?? 'Custom Component',
  formControlName: 'customInput',
});
