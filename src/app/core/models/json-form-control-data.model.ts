import { JsonFormArrayData } from './json-form-array-data.model';
import { JsonFormControlOptions } from './json-form-control-options.model';

export interface JsonFormControlData {
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
  options?: JsonFormControlOptions[];
  children?: JsonFormControlData[];
  formArray?: JsonFormArrayData;
  gridRow?: string;
  gridColumn?: string;
}
