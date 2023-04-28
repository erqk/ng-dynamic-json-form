import { NgDynamicJsonFormArrayConfig } from './form-array-config.model';
import { NgDynamicJsonFormCondition } from './form-control-condition.model';
import { NgDynamicJsonFormControlOptions } from './form-control-options.model';
import { NgDynamicJsonFormValidatorConfig } from './form-validator-config.model';

export interface NgDynamicJsonFormConfig {
  label: string;
  formControlName: string;
  value?: any;
  type?:
    | 'text'
    | 'textarea'
    | 'password'
    | 'number'
    | 'email'
    | 'switch'
    | 'radio'
    | 'checkbox'
    | 'dropdown'
    | 'range';

  /**Custom component to use on this control */
  customComponent?: string;

  /**Custom data for this control. Example:
   *  @example
   *  <textarea
   *    pInputTextarea
   *    [rows]="data.extra?.['rows'] || 5"
   *    [cols]="data.extra?.['cols'] || 30"
   *    [formControl]="control"
   *    [autoResize]="data.extra?.['autoResize'] === true"
   *  ></textarea>
   */
  extra?: { [key: string]: any };

  /**Validators to add to this form control */
  validators?: NgDynamicJsonFormValidatorConfig[];

  /**Change state or toggle validators when condition met */
  conditions?: NgDynamicJsonFormCondition[];

  /**Display options using row or column (options must not be empty) */
  optionsLayout?: 'column' | 'row';

  /**Options with key value pairs, use with the following elements:
   * - Dropdown menu
   * - Radio buttons
   * - Multi select checkboxes
   * - ...etc
   */
  options?: NgDynamicJsonFormControlOptions[];

  /**Make this control as a FormGroup */
  children?: NgDynamicJsonFormConfig[];

  /**Make this control as a FormArray */
  formArray?: NgDynamicJsonFormArrayConfig;

  /**CSS Grid */
  cssGrid?: {
    gridRow?: string;
    gridColumn?: string;
    gridTemplateColumns?: string;
  };
}
