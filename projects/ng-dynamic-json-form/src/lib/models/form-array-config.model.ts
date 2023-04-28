import { FormControlConfig as FormControlConfig } from './form-control-config.model';

export interface FormArrayConfig {
  length: number;
  templateLabel: string;
  template: FormControlConfig[];
  editable?: boolean;
  minLength?: number;
  maxLength?: number;
}
