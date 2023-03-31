import { NgDynamicJsonFormControlConfig } from './form-control-config.model';

export interface NgDynamicJsonFormGroupConfig {
  [key: string]: NgDynamicJsonFormControlConfig[];
}
