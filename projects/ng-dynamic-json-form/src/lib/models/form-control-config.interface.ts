import { FormControlExtra } from './extra/form-control-extra.interface';
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

  /**Key of the custom component to use on this control */
  customComponent?: string;

  description?: string;

  /**Custom data for this control. Example:
   *  @example
   *  <textarea
   *    [rows]="data.extra?.['rows'] || 5"
   *    [cols]="data.extra?.['cols'] || 30"
   *    ...
   *  ></textarea>
   */
  extra?: FormControlExtra;

  /**Provide to make this control as a FormArray, cannot use with `children` */
  formArray?: FormArrayConfig;

  label?: string;

  layout?: FormLayout;

  ngxMaskConfig?: Partial<NgxMaskConfig>;

  /**A list of data, use with the following input type:
   * - `checkbox`
   * - `dropdown`
   * - `radio`
   * - ...your custom component
   */
  options?: FormControlOptions;

  placeholder?: string;

  /**Set this input to readonly, and will add a class as a mark for styling */
  readonly?: boolean;

  type?: FormControlType;
  
  value?: any;

  /**Validators to add to this form control */
  validators?: ValidatorConfig[];
}
