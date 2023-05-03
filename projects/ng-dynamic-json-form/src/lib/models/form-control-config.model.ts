import { FormArrayConfig } from './form-array-config.model';
import { FormControlCondition } from './form-control-condition.model';
import { FormControlOptions } from './form-control-options.model';
import { ValidatorConfig } from './form-validator-config.model';

export interface FormControlConfig {
  label: string;
  formControlName: string;
  value?: any;
  placeholder?: string;
  description?: string;
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
    | 'range'
    | (string & {});

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
