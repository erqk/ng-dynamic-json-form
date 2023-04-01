import { NgDynamicJsonFormConfig as NgDynamicJsonFormConfig } from './form-control-config.model';

export interface NgDynamicJsonFormArrayConfig {
  length: number;
  templateLabel: string;
  template: NgDynamicJsonFormConfig[];
  editable?: boolean;
  minLength?: number;
  maxLength?: number;
}
