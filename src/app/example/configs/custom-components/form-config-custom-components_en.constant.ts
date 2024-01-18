import { FormControlConfig } from 'ng-dynamic-json-form';

export const FORM_CONFIG_CUSTOM_COMPONENTS_EN: FormControlConfig[] = [
  {
    label: 'Custom Component (FormControl)',
    description: 'Simple custom input component',
    formControlName: 'customComponentControl',
    customComponent: 'custom-input',
  },
  {
    label: 'Custom Component (FormGroup)',
    description: 'Use registerOnChange() to update value of this FormControl.',
    formControlName: 'customComponentGroup',
    customComponent: 'custom-input-group',
  },
];
