import { NgDynamicJsonFormArrayConfig } from './form-array-config.model';
import { NgDynamicJsonFormControlCondition } from './form-control-condition.model';
import { NgDynamicJsonFormControlOptions } from './form-control-options.model';
import { NgDynamicJsonFormValidatorConfig } from './form-validator-config.model';

export interface NgDynamicJsonFormControlConfig {
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
   * <textarea rows="5" cols="30"
   *    pInputTextarea
   *    [autoResize]="data.customData?.['autoResize'] === true">
   * </textarea>
   */
  customData?: { [key: string]: any };

  /**Validators to add to this form control */
  validators?: NgDynamicJsonFormValidatorConfig[];

  /**Change state or toggle validators when condition met */
  conditions?: NgDynamicJsonFormControlCondition[];

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
  children?: NgDynamicJsonFormControlConfig[];

  /**Make this control as a FormArray */
  formArray?: NgDynamicJsonFormArrayConfig;

  /**CSS grid-row */
  gridRow?: string;

  /**CSS grid-column */
  gridColumn?: string;
}
