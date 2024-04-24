import { InjectionToken, Provider } from '@angular/core';
import { UiComponents } from './models';
import { CustomValidators } from './models/custom-validators.type';
import { GlobalLayoutComponents } from './models/global-layout-components.interface';

interface FormConfig {
  customValidators?: CustomValidators;
  globalLayoutComponents?: GlobalLayoutComponents;
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
