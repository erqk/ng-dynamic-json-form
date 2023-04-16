import { NgDynamicJsonFormArrayConfig } from './form-array-config.model';
import { NgDynamicJsonFormControlCondition } from './form-control-condition.model';
import { NgDynamicJsonFormControlOptions } from './form-control-options.model';
import { NgDynamicJsonFormValidatorConfig } from './form-validator-config.model';

export interface NgDynamicJsonFormControlConfig {
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
  customComponent?: string;
  validators?: NgDynamicJsonFormValidatorConfig[];
  conditions?: NgDynamicJsonFormControlCondition[];
  optionsLayout?: 'column' | 'row';
  options?: NgDynamicJsonFormControlOptions[];
  children?: NgDynamicJsonFormControlConfig[];
  formArray?: NgDynamicJsonFormArrayConfig;
  gridRow?: string;
  gridColumn?: string;
}
