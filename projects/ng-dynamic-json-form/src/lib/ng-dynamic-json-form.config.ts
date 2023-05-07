import { Type, InjectionToken, Provider } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { NgDynamicJsonFormCustomComponent } from './components/custom-component-base/custom-component-base.component';
import { FormGeneratorService } from './services/form-generator.service';
import { FormStatusService } from './services/form-status.service';
import { FormValidatorService } from './services/form-validator.service';
import { GridLayoutService } from './services/grid-layout.service';

interface FormConfig {
  customValidators: { [key: string]: ValidatorFn };
  customComponents: { [key: string]: Type<NgDynamicJsonFormCustomComponent> };
  customUIComponents: { [key: string]: Type<NgDynamicJsonFormCustomComponent> };
}

export const NG_DYNAMIC_JSON_FORM_CONFIG = new InjectionToken<FormConfig>(
  'ng-dynamic-json-form config'
);

export function provideNgDynamicJsonForm(config?: FormConfig): Provider[] {
  return [
    {
      provide: NG_DYNAMIC_JSON_FORM_CONFIG,
      useValue: config,
    },
    FormGeneratorService,
    FormValidatorService,
    FormStatusService,
    GridLayoutService,
  ];
}
