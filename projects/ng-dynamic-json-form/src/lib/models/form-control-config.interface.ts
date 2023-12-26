import { FormControlExtra } from './extra/form-control-extra.interface';
import { FormArrayConfig } from './form-array-config.interface';
import { FormControlCondition } from './form-control-condition.type';
import { FormControlOptions } from './form-control-options.interface';
import { FormControlType } from './form-control-type.type';
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

  /**CSS Grid */
  cssGrid?: {
    /**https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row */
    gridRow?: string;
    /**https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column */
    gridColumn?: string;
    /**https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns */
    gridTemplateColumns?: string;
  };

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

  /**Set to true if you need to take control of validation message */
  hideValidationMessage?: boolean;

  label?: string;

  layout?: {
    hostClass?: string;
    hostStyles?: string;
    labelClass?: string;
    labelStyles?: string;
    childClass?: string;
    childStyles?: string;
  };

  ngxMaskConfig?: Partial<NgxMaskConfig>;

  /**A list of data, use with the following input type:
   * - `checkbox`
   * - `dropdown`
   * - `radio`
   * - ...your custom component
   */
  options?: FormControlOptions;

  placeholder?: string;
  type?: FormControlType;
  value?: any;

  /**Validators to add to this form control */
  validators?: ValidatorConfig[];
}
