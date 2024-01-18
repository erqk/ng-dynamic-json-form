export interface FormLayout {
  hostClass?: string;
  hostStyles?: string;
  labelClass?: string;
  labelStyles?: string;
  childClass?: string;
  childStyles?: string;
  descriptionClass?: string;
  descriptionStyles?: string;

  /**Put description before or after input */
  descriptionPosition?: 'before' | 'after';

  /**Set to true to take control of how to display error message */
  hideErrorMessage?: boolean;

  /**Set to true to take control of how to display label */
  hideLabel?: boolean;

  /**Enable expand/collapse of children in the FormGroup/FormArray
   * The default state will be determined by value provided
   */
  childCollapsible?: 'collapse' | 'expand';
}
