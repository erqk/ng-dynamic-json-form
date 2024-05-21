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

  // The variables that must be initialized
  customValidators: CustomValidators | undefined;
  customComponents: NgDynamicJsonFormComponent['customComponents'];
  customTemplates: NgDynamicJsonFormComponent['customTemplates'];
  conditionsActionFuntions: NgDynamicJsonFormComponent['conditionsActionFuntions'];
  errorComponents: NgDynamicJsonFormComponent['errorComponents'];
  errorTemplates: NgDynamicJsonFormComponent['errorTemplates'];
  hostElement?: HTMLElement;
  labelComponents: NgDynamicJsonFormComponent['labelComponents'];
  labelTemplates: NgDynamicJsonFormComponent['labelTemplates'];
  layoutComponents: NgDynamicJsonFormComponent['layoutComponents'];
  layoutTemplates: NgDynamicJsonFormComponent['layoutTemplates'];
  uiComponents: UiComponents | undefined;

  setup(variables: GlobalVariables): void {
    this.customValidators = variables.customValidators;
    this.customComponents = variables.customComponents;
    this.customTemplates = variables.customTemplates;
    this.errorComponents = variables.errorComponents;
    this.errorTemplates = variables.errorTemplates;
    this.layoutComponents = variables.layoutComponents;
    this.layoutTemplates = variables.layoutTemplates;
    this.hostElement = variables.hostElement;
    this.labelComponents = variables.labelComponents;
    this.labelTemplates = variables.labelTemplates;
    this.uiComponents = variables.uiComponents;
  }
}
