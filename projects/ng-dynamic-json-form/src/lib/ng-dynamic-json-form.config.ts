import { InjectionToken, Provider, Type } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { CustomControlComponent } from './components/custom-control/custom-control.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';

interface FormConfig {
  customValidators?: { [key: string]: ValidatorFn };
  customComponents?: { [key: string]: Type<CustomControlComponent> };
  uiComponents?: { [key: string]: Type<CustomControlComponent> };
  errorMessageComponent?: Type<ErrorMessageComponent>;
  loadingComponent?: Type<any>;
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
