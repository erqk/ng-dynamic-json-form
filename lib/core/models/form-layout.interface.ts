export interface FormLayout {
  hostClass?: string;
  hostStyles?: string;
  labelClass?: string;
  labelStyles?: string;
  contentClass?: string;
  contentStyles?: string;
  formGroupStyles?: string;
  formGroupClass?: string;
  descriptionClass?: string;
  descriptionStyles?: string;
  inputAreaClass?: string;
  inputAreaStyles?: string;
  errorClass?: string;
  errorStyles?: string;

  /**Put description before or after input */
  descriptionPosition?: 'before' | 'after';

  /**Set to true to take control of label display on your own */
  hideLabel?: boolean;

  /**Enable expand/collapse of content. The default state will be determined by value provided */
  contentCollapsible?: 'collapse' | 'expand';

  /**Add `required` class to form label if there's validator named `required`.
   * Default is true.
   */
  autoAddRequiredClass?: boolean;
}
