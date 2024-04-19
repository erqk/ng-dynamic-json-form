import { FormArrayConfig } from './form-array-config.interface';
import { FormControlCondition } from './form-control-condition.type';
import { FormControlOptions } from './form-control-options.interface';
import { FormControlType } from './form-control-type.type';
import { FormLayout } from './form-layout.interface';
import { ValidatorConfig } from './form-validator-config.interface';
import { NgxMaskConfig } from './ngx-mask-config.interface';

export interface FormControlConfig {
  formControlName: string;

  /**Change state or toggle validators when condition met */
  conditions?: FormControlCondition;

  /**Provide to make this control as a FormGroup, cannot use with `formArray` */
  children?: FormControlConfig[];

  /**Key of the custom component/template to use on this control */
  customComponent?: string;

  /**Key of the custom component/template of the label to use on this control */
  customLabel?: string;

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

  /**Provide to make this control as a FormArray, cannot use with `children` */
  formArray?: FormArrayConfig;

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
