import { FactoryArg } from 'imask/esm/index';
import { Conditions } from './conditions.type';
import { FormControlOptions } from './form-control-options.interface';
import { FormControlType } from './form-control-type.type';
import { FormLayout } from './form-layout.interface';
import { ValidatorConfig } from './validator-config.interface';

export interface FormControlConfig {
  formControlName: string;
  
  conditions?: Conditions;

  /**Provide to make this control as a `FormGroup` */
  children?: FormControlConfig[];

  description?: string;

  /**
   * The properties to bind to the target element or `Directive`
   */
  props?: any;

  /**Don't render the UI of this control if set to true. */
  hidden?: boolean;

  label?: string;

  layout?: FormLayout;

  inputMask?: FactoryArg;

  options?: FormControlOptions;

  /**Set this input to readonly, and will add a class `readonly` to the host element of this control */
  readonly?: boolean;

  type?: FormControlType;

  value?: any;

  /**Validators to add to this form control */
  validators?: ValidatorConfig[];
}
