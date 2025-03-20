import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormLayout } from 'ng-dynamic-json-form';
import { BehaviorSubject } from 'rxjs';
import { FormControlConfig, UiComponents } from '../models';
import { CustomAsyncValidators } from '../models/custom-async-validators.type';
import { CustomValidators } from '../models/custom-validators.type';
import { NgDynamicJsonFormComponent } from '../ng-dynamic-json-form.component';
import { FormConfig } from '../providers/ng-dynamic-json-form.provider';
interface GlobalVariables
  extends Omit<
    GlobalVariableService,
    'setup' | 'rootConfigs' | 'rootForm' | 'hideErrorMessage$'
  > {}
@Injectable()
export class GlobalVariableService {
  descriptionPosition?: FormLayout['descriptionPosition'];
  hideErrorMessage$ = new BehaviorSubject<boolean | undefined>(undefined);
  rootConfigs: FormControlConfig[] = [];
  rootForm?: UntypedFormGroup;

  // =============== The variables that must be initialized ===============
  hostElement?: HTMLElement;
  conditionsActionFunctions: NgDynamicJsonFormComponent['conditionsActionFunctions'];
  optionsSources: NgDynamicJsonFormComponent['optionsSources'];
  uiComponents: UiComponents | undefined;
  customAsyncValidators: CustomAsyncValidators | undefined;
  customValidators: CustomValidators | undefined;
  customComponents: NgDynamicJsonFormComponent['customComponents'];
  customTemplates: NgDynamicJsonFormComponent['customTemplates'];

  // Custom error
  errorComponents: NgDynamicJsonFormComponent['errorComponents'];
  errorTemplates: NgDynamicJsonFormComponent['errorTemplates'];
  errorTemplateDefault: NgDynamicJsonFormComponent['errorTemplateDefault'];
  errorComponentDefault: NgDynamicJsonFormComponent['errorComponentDefault'];

  // Custom label
  labelComponents: NgDynamicJsonFormComponent['labelComponents'];
  labelTemplates: NgDynamicJsonFormComponent['labelTemplates'];
  labelTemplateDefault: NgDynamicJsonFormComponent['labelTemplateDefault'];

  // Custom loading
  labelComponentDefault: NgDynamicJsonFormComponent['labelComponentDefault'];
  loadingComponent: NgDynamicJsonFormComponent['loadingComponent'];
  loadingTemplate: NgDynamicJsonFormComponent['loadingTemplate'];

  // Hide error message
  hideErrorsForTypes: FormConfig['hideErrorsForTypes'];

  // Global validation messages
  validationMessages: FormConfig['validationMessages'];
  // ======================================================================

  setup(variables: GlobalVariables): void {
    for (const key in variables) {
      (this as any)[key] = (variables as any)[key];
    }
  }
}
