import { FormControlConfig } from 'ng-dynamic-json-form';

export const PLAYGROUND_CONFIG_CUSTOM_COMPONENTS_EN: FormControlConfig[] = [
  {
    label: 'Custom Component (FormControl)',
    description: 'Simple custom input component',
    formControlName: 'customComponentControl',
    customComponent: 'custom-input',
  },
  {
    label: 'Custom Component (FormGroup)',
    description:
      'You can also build form group element, then use registerControlChange to update value of the main FormControl.',
    formControlName: 'customComponentGroup',
    customComponent: 'custom-input-group',
  },
];
