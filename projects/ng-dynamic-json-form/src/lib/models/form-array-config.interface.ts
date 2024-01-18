import { FormControlConfig as FormControlConfig } from './form-control-config.interface';

export interface FormArrayConfig {
  /**Data to tell how to construct each `FormGroup` in this `FormArray` */
  template: FormControlConfig[];

  /**Label for each `FormGroup` in this `FormArray`.
   * You can pass custom template to overwite it.
   *
   * By default, the label will be suffix by a number,
   * which tells the position of the current `FormGroup`.
   */
  templateLabel?: string;

  /**Numbers of `FormGroup` to generate at initial.
   *
   * If `value` from this `FormArray` is provided,
   * it will take the length from `value`.
   */
  length?: number;

  /**Provide button to add or remove item if set to `true` */
  editable?: boolean;

  /**Minimum length of this `FormArray` */
  minLength?: number;

  /**Maximum length of this `FormArray` */
  maxLength?: number;
}
