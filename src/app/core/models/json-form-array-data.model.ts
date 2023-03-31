import { JsonFormControlData } from './json-form-control-data.model';

export interface JsonFormArrayData {
  length: number;
  templateLabel: string;
  template: JsonFormControlData[];
  editable?: boolean;
  minLength?: number;
  maxLength?: number;
}
