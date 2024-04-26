import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgDynamicJsonFormComponent } from '../ng-dynamic-json-form.component';

@Injectable()
export class GlobalVariableService {
  hideErrorMessage$ = new BehaviorSubject<boolean | undefined>(undefined);

  customValidators?: NgDynamicJsonFormComponent['customValidators'];

  uiComponents?: NgDynamicJsonFormComponent['uiComponents'];

  customComponents?: NgDynamicJsonFormComponent['customComponents'];
  customTemplates?: NgDynamicJsonFormComponent['customTemplates'];

  errorComponents?: NgDynamicJsonFormComponent['errorComponents'];
  errorTemplates?: NgDynamicJsonFormComponent['errorTemplates'];

  labelComponents?: NgDynamicJsonFormComponent['labelComponents'];
  labelTemplates?: NgDynamicJsonFormComponent['labelTemplates'];

  globalLayoutComponents?: NgDynamicJsonFormComponent['globalLayoutComponents'];
  globalLayoutTemplates?: NgDynamicJsonFormComponent['globalLayoutTemplates'];

  setup({
    customValidators,
    customComponents,
    customTemplates,
    errorComponents,
    errorTemplates,
    globalLayoutComponents,
    globalLayoutTemplates,
    labelComponents,
    labelTemplates,
  }: {
    customValidators: NgDynamicJsonFormComponent['customValidators'];
    customComponents: NgDynamicJsonFormComponent['customComponents'];
    customTemplates: NgDynamicJsonFormComponent['customTemplates'];
    errorComponents: NgDynamicJsonFormComponent['errorComponents'];
    errorTemplates: NgDynamicJsonFormComponent['errorTemplates'];
    globalLayoutComponents: NgDynamicJsonFormComponent['globalLayoutComponents'];
    globalLayoutTemplates: NgDynamicJsonFormComponent['globalLayoutTemplates'];
    labelComponents: NgDynamicJsonFormComponent['labelComponents'];
    labelTemplates: NgDynamicJsonFormComponent['labelTemplates'];
  }): void {
    this.customValidators = customValidators;
    this.customComponents = customComponents;
    this.customTemplates = customTemplates;
    this.errorComponents = errorComponents;
    this.errorTemplates = errorTemplates;
    this.globalLayoutComponents = globalLayoutComponents;
    this.globalLayoutTemplates = globalLayoutTemplates;
    this.labelComponents = labelComponents;
    this.labelTemplates = labelTemplates;
  }
}
