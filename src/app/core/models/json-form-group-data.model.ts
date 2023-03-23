import { JsonFormControlData } from './json-form-control-data.model';

export interface JsonFormGroupData {
  [key: string]: JsonFormControlData[];
}
