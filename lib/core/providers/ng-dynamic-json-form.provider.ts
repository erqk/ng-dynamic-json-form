import { InjectionToken, Provider, Type } from '@angular/core';
import { CustomErrorMessage } from '../components/custom-error-message/custom-error-message.abstract';
import { CustomFormLabel } from '../components/custom-form-label/custom-form-label.abstract';
import { CustomValidators, FormControlType, UiComponents } from '../models';
import { CustomAsyncValidators } from '../models/custom-async-validators.type';

export interface FormConfig {
  /**
   * User defined custom validators. Use `name` as the key to map target ValidatorFn.
   *
   * @example
   * // Config
   * {
   *    ...
   *    "validators": [
   *      { "name": "firstUppercase" }
   *    ]
   * }
   *
   * // TS
   * validators = {
   *    firstUppercase: firstUppercaseValidator,
   *    url: urlValidator,
   *    ...
   * }
   *
   * // HTML
   * <ng-dynamic-json-form
   *  [configs]="..."
   *  [customValidators]="validators"
   * ></ng-dynamic-json-form>
   */
  customValidators?: CustomValidators;
  /**
   * User defined custom async validators. Similar to custom validators.
   *
   * @example
   * // Config
   * {
   *    ...
   *    "asyncValidators": [
   *      ...
   *    ]
   * }
   *
   * // TS
   * asyncValidators = {
   *    ...
   * }
   *
   * // HTML
   * <ng-dynamic-json-form
   *  [configs]="..."
   *  [customAsyncValidators]="validators"
   * ></ng-dynamic-json-form>
   */
  customAsyncValidators?: CustomAsyncValidators;
  /**
   * If the key is matched with `type` in the config, then the corresponding component will be used.
   *
   * @example
   * config = {
   *  ...
   *  type: "file"
   * }
   *
   * uiComponents = {
   *  file: InputFileComponent
   * }
   */
  uiComponents?: UiComponents;
  /**
   * Custom component for all labels in this form
   */
  labelComponent?: Type<CustomFormLabel>;
  /**
   * Custom component for all loadings in this form
   */
  loadingComponent?: Type<any>;
  /**
   * Custom component for all errors in this form
   */
  errorComponent?: Type<CustomErrorMessage>;
  /**
   * Hide the error message for specific type of UI components
   */
  hideErrorsForTypes?: FormControlType[];
}

export const NG_DYNAMIC_JSON_FORM_CONFIG = new InjectionToken<FormConfig>(
  'ng-dynamic-json-form-config'
);

export function provideNgDynamicJsonForm(config?: FormConfig): Provider {
  return {
    provide: NG_DYNAMIC_JSON_FORM_CONFIG,
    useValue: config,
  };
}
