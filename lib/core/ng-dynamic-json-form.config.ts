import { InjectionToken, Provider } from '@angular/core';
import { UiComponents } from './models';
import { CustomValidators } from './models/custom-validators.type';
import { LayoutComponents } from './models/global-layout-components.interface';

interface FormConfig {
  /**
   * User defined custom valiators. Use `name` as the key to map target ValidatorFn.
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
  layoutComponents?: LayoutComponents;
  uiComponents?: UiComponents;
}

export const NG_DYNAMIC_JSON_FORM_CONFIG = new InjectionToken<FormConfig>(
  'ng-dynamic-json-form-config'
);

export function provideNgDynamicJsonForm(config?: FormConfig): Provider[] {
  return [
    {
      provide: NG_DYNAMIC_JSON_FORM_CONFIG,
      useValue: config,
    },
  ];
}
