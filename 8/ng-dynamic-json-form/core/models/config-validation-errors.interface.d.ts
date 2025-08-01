import { FormControlConfig } from './form-control-config.interface';
export interface ConfigValidationErrors {
    errors: string;
    config?: Partial<FormControlConfig>;
}
