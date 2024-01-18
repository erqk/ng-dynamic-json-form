import { FormControlConfig } from 'ng-dynamic-json-form';

export const FORM_CONFIG_CUSTOM_COMPONENTS_ZHTW: FormControlConfig[] = [
  {
    label: '自訂元件 (FormControl)',
    description: '基本自訂元件',
    formControlName: 'customComponentControl',
    customComponent: 'custom-input',
  },
  {
    label: '自訂元件 (FormGroup)',
    description: '可利用 registerOnChange() 來更新此 FormControl 的值',
    formControlName: 'customComponentGroup',
    customComponent: 'custom-input-group',
  },
];
