import { InjectionToken, Provider, TemplateRef, Type } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { CustomControlComponent } from './components/custom-control/custom-control.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { FormArrayItemHeaderComponent } from './components/form-array-item-header/form-array-item-header.component';

interface FormConfig {
  customValidators?: { [key: string]: ValidatorFn };
  customComponents?: { [key: string]: Type<CustomControlComponent> };
  uiComponents?: { [key: string]: Type<CustomControlComponent> };
  layoutComponents?: LayoutComponents;
  layoutTemplates?: LayoutTemplates;
  outputDateFormat?: string;
}

export interface LayoutComponents {
  loading?: Type<any>;
  errorMessage?: Type<ErrorMessageComponent>;
  formArrayItemHeader?: Type<FormArrayItemHeaderComponent>;
}
export interface LayoutTemplates {
  loading?: TemplateRef<any>;
  errorMessage?: TemplateRef<any>;
  formArrayItemHeader?: TemplateRef<any>;
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
