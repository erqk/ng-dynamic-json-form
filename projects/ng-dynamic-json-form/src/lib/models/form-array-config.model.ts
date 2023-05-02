import { FormControlConfig as FormControlConfig } from './form-control-config.model';

export interface FormArrayConfig {
  templateLabel: string;
  template: FormControlConfig[];
  length?: number;
  editable?: boolean;
  minLength?: number;
  maxLength?: number;
}
