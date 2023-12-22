## FormControlConfig

```javascript
interface FormControlConfig {
  formControlName: string;

  /**此 Control 的狀態切換條件 */
  conditions?: FormControlCondition[];

  /**若有資料則會把此 Control 轉為 FormGroup */
  children?: FormControlConfig[];

  /**自訂元件的 key */
  customComponent?: string;

  /**CSS Grid (請參照) */
  cssGrid?: {
    gridRow?: string,
    gridColumn?: string,
    gridTemplateColumns?: string,
  };

  /**描述欄位 */
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

  /**Make this control as a FormArray */
  formArray?: FormArrayConfig;

  /**Set to true if you need to take control of validation message */
  hideValidationMessage?: boolean;

  label?: string;
  ngxMaskConfig?: Partial<NgxMaskConfig>;

  /**Options with key value pairs, use with the following elements:
   * - Dropdown menu
   * - Radio buttons
   * - Multi select checkboxes
   * - ...etc
   */
  options?: FormControlOptions[];

  /**Display options using row or column (options must not be empty) */
  optionsLayout?: "column" | "row";

  placeholder?: string;
  type?: FormControlType;
  value?: any;

  /**Validators to add to this form control */
  validators?: ValidatorConfig[];
}
```
