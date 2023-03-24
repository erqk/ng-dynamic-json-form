import { JsonFormControlOptions } from './json-form-control-options.model';
import { JsonFormGroupData } from './json-form-group-data.model';

export interface JsonFormControlData {
  label: string;
  formControlName: string;
  value?: any;
  type?:
    | 'text'
    | 'password'
    | 'number'
    | 'email'
    | 'radio'
    | 'checkbox'
    | 'dropdown'
    | 'range';
  validators?: string[];
  options?: JsonFormControlOptions[];
  child?: JsonFormGroupData;
}
