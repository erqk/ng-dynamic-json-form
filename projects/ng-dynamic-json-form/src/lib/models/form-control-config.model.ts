import { FormControlExtra } from './extra/form-control-extra.model';
import { FormArrayConfig } from './form-array-config.model';
import { FormControlCondition } from './form-control-condition.model';
import { FormControlOptions } from './form-control-options.model';
import { FormControlType } from './form-control-type.model';
import { ValidatorConfig } from './form-validator-config.model';
import { NgxMaskConfig } from './ngx-mask-config.model';

export interface FormControlConfig {
  label?: string;
  formControlName: string;
  value?: any;
  placeholder?: string;
  description?: string;
  type?: FormControlType;
  ngxMaskConfig?: Partial<NgxMaskConfig>;

  /**Custom component to use on this control */
  customComponent?: string;

  /**Custom data for this control. Example:
   *  @example
   *  <textarea
   *    [rows]="data.extra?.['rows'] || 5"
   *    [cols]="data.extra?.['cols'] || 30"
   *    ...
   *  ></textarea>
   */
  extra?: FormControlExtra;

  /**Validators to add to this form control */
  validators?: ValidatorConfig[];

  /**Change state or toggle validators when condition met */
  conditions?: FormControlCondition[];

  /**Display options using row or column (options must not be empty) */
  optionsLayout?: 'column' | 'row';

  /**Options with key value pairs, use with the following elements:
   * - Dropdown menu
   * - Radio buttons
   * - Multi select checkboxes
   * - ...etc
   */
  options?: FormControlOptions[];

  /**Make this control as a FormGroup */
  children?: FormControlConfig[];

  /**Make this control as a FormArray */
  formArray?: FormArrayConfig;

  /**CSS Grid */
  cssGrid?: {
    gridRow?: string;
    gridColumn?: string;
    gridTemplateColumns?: string;
  };
}
