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

  /**Set to true if you need to take control of how to display error message */
  hideErrorMessage?: boolean;

  /**Set to true if you need to take control of how to display label */
  hideLabel?: boolean;
}
