import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FormControlConfig, UiComponents } from '../models';
import { CustomValidators } from '../models/custom-validators.type';
import { NgDynamicJsonFormComponent } from '../ng-dynamic-json-form.component';
interface GlobalVariables
  extends Omit<
    GlobalVariableService,
    'setup' | 'rootConfigs' | 'rootForm' | 'hideErrorMessage$'
  > {}
@Injectable()
export class GlobalVariableService {
  hideErrorMessage$ = new BehaviorSubject<boolean | undefined>(undefined);
  rootConfigs: FormControlConfig[] = [];
  rootForm?: UntypedFormGroup;

  // =============== The variables that must be initialized ===============
  hostElement?: HTMLElement;
  conditionsActionFunctions: NgDynamicJsonFormComponent['conditionsActionFunctions'];
  optionsSources: NgDynamicJsonFormComponent['optionsSources'];
  uiComponents: UiComponents | undefined;
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
  // ======================================================================

  setup(variables: GlobalVariables): void {
    for (const key in variables) {
      (this as any)[key] = (variables as any)[key];
    }
  }
}
