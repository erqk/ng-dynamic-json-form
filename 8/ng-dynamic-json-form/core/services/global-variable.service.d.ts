import { UntypedFormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FormControlConfig, FormLayout, UiComponents } from '../models';
import { CustomAsyncValidators } from '../models/custom-async-validators.type';
import { CustomValidators } from '../models/custom-validators.type';
import { NgDynamicJsonFormComponent } from '../ng-dynamic-json-form.component';
import { FormConfig } from '../providers/ng-dynamic-json-form.provider';
import * as i0 from "@angular/core";
interface GlobalVariables extends Omit<GlobalVariableService, 'setup' | 'rootConfigs' | 'rootForm' | 'hideErrorMessage$'> {
}
export declare class GlobalVariableService {
    descriptionPosition?: FormLayout['descriptionPosition'];
    hideErrorMessage$: BehaviorSubject<boolean | undefined>;
    rootConfigs: FormControlConfig[];
    rootForm?: UntypedFormGroup;
    showErrorsOnTouched: boolean;
    hostElement?: HTMLElement;
    conditionsActionFunctions: NgDynamicJsonFormComponent['conditionsActionFunctions'];
    optionsSources: NgDynamicJsonFormComponent['optionsSources'];
    uiComponents: UiComponents | undefined;
    customAsyncValidators: CustomAsyncValidators | undefined;
    customValidators: CustomValidators | undefined;
    customComponents: NgDynamicJsonFormComponent['customComponents'];
    customTemplates: NgDynamicJsonFormComponent['customTemplates'];
    errorComponents: NgDynamicJsonFormComponent['errorComponents'];
    errorTemplates: NgDynamicJsonFormComponent['errorTemplates'];
    errorTemplateDefault: NgDynamicJsonFormComponent['errorTemplateDefault'];
    errorComponentDefault: NgDynamicJsonFormComponent['errorComponentDefault'];
    labelComponents: NgDynamicJsonFormComponent['labelComponents'];
    labelTemplates: NgDynamicJsonFormComponent['labelTemplates'];
    labelTemplateDefault: NgDynamicJsonFormComponent['labelTemplateDefault'];
    labelComponentDefault: NgDynamicJsonFormComponent['labelComponentDefault'];
    loadingComponent: NgDynamicJsonFormComponent['loadingComponent'];
    loadingTemplate: NgDynamicJsonFormComponent['loadingTemplate'];
    hideErrorsForTypes: FormConfig['hideErrorsForTypes'];
    validationMessages: FormConfig['validationMessages'];
    setup(variables: GlobalVariables): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GlobalVariableService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GlobalVariableService>;
}
export {};
