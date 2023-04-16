import { NgDynamicJsonFormControlConfig as NgDynamicJsonFormControlConfig } from './form-control-config.model';

export interface NgDynamicJsonFormArrayConfig {
  length: number;
  templateLabel: string;
  template: NgDynamicJsonFormControlConfig[];
  editable?: boolean;
  minLength?: number;
  maxLength?: number;
}
