export interface FormLayout {
  hostClass?: string;
  hostStyles?: string;
  labelClass?: string;
  labelStyles?: string;
  contentClass?: string;
  contentStyles?: string;
  descriptionClass?: string;
  descriptionStyles?: string;
  errorClass?: string;
  errorStyles?: string;

  /**Put description before or after input */
  descriptionPosition?: 'before' | 'after';

  /**Set to true to take control of how to display error message */
  hideErrorMessage?: boolean;

  /**Set to true to take control of how to display label */
  hideLabel?: boolean;

  /**Enable expand/collapse of content. The default state will be determined by value provided */
  contentCollapsible?: 'collapse' | 'expand';

  /**Add `required` class automatically to control if there's validator named `required`.
   * Default is true.
   */
  autoAddRequiredClass?: boolean;
}
