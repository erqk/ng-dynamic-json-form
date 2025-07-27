import { Injectable, TemplateRef, Type } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { CustomErrorMessage, CustomFormLabel } from 'lib/public-api';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  ConditionsActionFunctions,
  CustomComponents,
  CustomErrorComponents,
  CustomLabelComponents,
  CustomTemplates,
  FormControlConfig,
  FormLayout,
  OptionItem,
  UiComponents,
} from '../models';
import { CustomAsyncValidators } from '../models/custom-async-validators.type';
import { CustomValidators } from '../models/custom-validators.type';
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
  showErrorsOnTouched = true;

  // =============== The variables that must be initialized ===============
  hostElement?: HTMLElement;
  conditionsActionFunctions: ConditionsActionFunctions | undefined;
  optionsSources:
    | {
        [key: string]: Observable<OptionItem[]>;
      }
    | undefined;
  uiComponents: UiComponents | undefined;
  customAsyncValidators: CustomAsyncValidators | undefined;
  customValidators: CustomValidators | undefined;
  customComponents: CustomComponents | undefined;
  customTemplates: CustomTemplates | undefined;

  // Custom error
  errorComponents: CustomErrorComponents | undefined;
  errorTemplates: CustomTemplates | undefined;
  errorTemplateDefault: TemplateRef<any> | undefined;
  errorComponentDefault: Type<CustomErrorMessage> | undefined;

  // Custom label
  labelComponents: CustomLabelComponents | undefined;
  labelTemplates: CustomTemplates | undefined;
  labelTemplateDefault: TemplateRef<any> | undefined;

  // Custom loading
  labelComponentDefault: Type<CustomFormLabel> | undefined;
  loadingComponent: Type<any> | undefined;
  loadingTemplate: TemplateRef<any> | undefined;

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
