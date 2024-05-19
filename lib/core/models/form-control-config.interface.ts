import { Conditions } from './conditions.type';
import { FormControlOptions } from './form-control-options.interface';
import { FormControlType } from './form-control-type.type';
import { FormLayout } from './form-layout.interface';
import { ValidatorConfig } from './validator-config.interface';
import { NgxMaskConfig } from './ngx-mask-config.interface';

export interface FormControlConfig {
  formControlName: string;

  /**Action to do on this control when condition is met. e.g. Change visibility or toggle validators */
  conditions?: Conditions;

  /**Provide to make this control as a FormGroup, cannot use with `formArray` */
  children?: FormControlConfig[];

  description?: string;

  /**Properties for the input element or `Directive`. Example:
   *  @example
   *  <textarea
   *    [rows]="extra.rows"
   *    [cols]="extra.cols"
   *    ...
   *  ></textarea>
   *
   * @example
   * <p-calendar
   *    [appendTo]="extra.appendTo"
   * ></p-calendar>
   */
  extra?: any;

  /**Don't render the UI of this control if set to true. */
  hidden?: boolean;

  label?: string;

  layout?: FormLayout;

  /**Config for ngx-mask, provide to use input with masking */
  inputMask?: Partial<NgxMaskConfig>;

  /**A list of data, use with the following input type:
   * - `checkbox`
   * - `dropdown`
   * - `radio`
   * - ...custom component type
   */
  options?: FormControlOptions;

  placeholder?: string;

  /**Set this input to readonly, and will add a class `readonly` for styling */
  readonly?: boolean;

  type?: FormControlType;

  value?: any;

  /**Validators to add to this form control */
  validators?: ValidatorConfig[];
}
