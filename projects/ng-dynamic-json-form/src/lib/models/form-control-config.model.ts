import { NgDynamicJsonFormArrayConfig } from './form-array-config.model';
import { NgDynamicJsonFormControlOptions } from './form-control-options.model';

export interface NgDynamicJsonFormConfig {
  label: string;
  formControlName: string;
  value?: any;
  type?:
    | 'text'
    | 'password'
    | 'number'
    | 'email'
    | 'switch'
    | 'radio'
    | 'checkbox'
    | 'dropdown'
    | 'range';
  validators?: string[];
  optionsLayout?: 'column' | 'row';
  options?: NgDynamicJsonFormControlOptions[];
  children?: NgDynamicJsonFormConfig[];
  formArray?: NgDynamicJsonFormArrayConfig;
  gridRow?: string;
  gridColumn?: string;
}
