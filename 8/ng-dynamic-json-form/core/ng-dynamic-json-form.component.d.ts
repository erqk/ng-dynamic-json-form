import { EventEmitter, SimpleChanges, TemplateRef, Type } from '@angular/core';
import { ControlValueAccessor, UntypedFormGroup, ValidationErrors, Validator } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomErrorMessage } from './components/custom-error-message/custom-error-message.abstract';
import { CustomFormLabel } from './components/custom-form-label/custom-form-label.abstract';
import { FormGroupComponent } from './components/form-group/form-group.component';
import { CustomComponents, FormControlConfig, OptionItem } from './models';
import { ConditionsActionFunctions } from './models/conditions-action-functions.interface';
import { ConfigValidationErrors } from './models/config-validation-errors.interface';
import { CustomErrorComponents } from './models/custom-error-components.type';
import { CustomLabelComponents } from './models/custom-label-components.type';
import { CustomTemplates } from './models/custom-templates.type';
import { FormDisplayValue } from './models/form-display-value.interface';
import { FormLayout } from './models/form-layout.interface';
import { FormStatusFunctions } from './models/form-status-functions.interface';
import * as i0 from "@angular/core";
export declare class NgDynamicJsonFormComponent implements ControlValueAccessor, Validator {
    private _providerConfig;
    private _cd;
    private _el;
    private _injector;
    private _destroyRef;
    private _configValidationService;
    private _formGeneratorService;
    private _formConditionsService;
    private _formValueService;
    private _formReadyStateService;
    private _globalVariableService;
    private _optionsDataService;
    private _controlDirective;
    /**
     * Whether to allow the form to mark as dirty
     * @description
     * If false, then it will automatically set to pristine
     * after each value changes.
     */
    private _allowFormDirty;
    private _globalVariablesInitialized;
    private _reset$;
    private _validationCount;
    private _onTouched;
    private _onChange;
    configGet: FormControlConfig[];
    configValidationErrors: ConfigValidationErrors[];
    form?: UntypedFormGroup;
    configs?: FormControlConfig[] | string;
    /**
     * User defined custom components. Use `formControlName` as the key to map target component.
     *
     * @example
     * // Config
     * {
     *    ...
     *    "formControlName": "compA"
     * }
     *
     * // TS
     * components = {
     *    compA: YourComponentA,
     *    compB: YourComponentB,
     *    ...
     * }
     */
    customComponents?: CustomComponents;
    /**
     * Custom templates for input, using `formControlName` as the key.
     * Use this if creating a custom component is way too much.
     *
     * The template variables available:
     * - `control` The FormControl for this input
     * - `data` The config for this input
     */
    customTemplates?: CustomTemplates;
    /**
     * Functions to execute when conditions is met.
     * @description
     * - When there's condition met, the function with key that match will be called.
     * - The function contains an optional argument, which is the control of where the conditions will affect to.
     */
    conditionsActionFunctions?: ConditionsActionFunctions;
    collapsibleState?: FormLayout['contentCollapsible'];
    descriptionPosition?: FormLayout['descriptionPosition'];
    rootClass?: string;
    rootStyles?: string;
    hideErrorMessage?: boolean;
    errorComponents?: CustomErrorComponents;
    errorComponentDefault?: Type<CustomErrorMessage>;
    errorTemplates?: CustomTemplates;
    errorTemplateDefault?: TemplateRef<any>;
    labelComponents?: CustomLabelComponents;
    labelComponentDefault?: Type<CustomFormLabel>;
    labelTemplates?: CustomTemplates;
    labelTemplateDefault?: TemplateRef<any>;
    loadingComponent?: Type<any>;
    loadingTemplate?: TemplateRef<any>;
    /**
     * Custom observables for the options
     * @description
     * The observable with key that match with the `src` will be used.
     *
     * @example
     * ```ts
     * optionsSources = {
     *    'getCountries': ...
     * }
     *
     * config = {
     *  ...
     *  options: {
     *    ...
     *    src: 'getCountries'
     *  }
     * }
     * ```
     */
    optionsSources?: {
        [key: string]: Observable<OptionItem[]>;
    };
    formGet: EventEmitter<UntypedFormGroup>;
    /**
     * The value change event of the form, which trigger by the user
     * (by checking click or keydown event)
     */
    onChange: EventEmitter<any>;
    optionsLoaded: EventEmitter<void>;
    displayValue: EventEmitter<FormDisplayValue>;
    updateStatusFunctions: EventEmitter<FormStatusFunctions>;
    formGroupRef?: FormGroupComponent;
    ngOnChanges(simpleChanges: SimpleChanges): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    validate(): Observable<ValidationErrors | null>;
    registerOnValidatorChange?(fn: () => void): void;
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState?(isDisabled: boolean): void;
    private _setupVariables;
    private _buildForm;
    private _getControlDirective;
    private _setupListeners;
    private _reset;
    private _updateFormStatus;
    private _formValueChanges$;
    private _checkOptionsLoaded;
    private get _formErrors();
    static ɵfac: i0.ɵɵFactoryDeclaration<NgDynamicJsonFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgDynamicJsonFormComponent, "ng-dynamic-json-form", never, { "configs": { "alias": "configs"; "required": false; }; "customComponents": { "alias": "customComponents"; "required": false; }; "customTemplates": { "alias": "customTemplates"; "required": false; }; "conditionsActionFunctions": { "alias": "conditionsActionFunctions"; "required": false; }; "collapsibleState": { "alias": "collapsibleState"; "required": false; }; "descriptionPosition": { "alias": "descriptionPosition"; "required": false; }; "rootClass": { "alias": "rootClass"; "required": false; }; "rootStyles": { "alias": "rootStyles"; "required": false; }; "hideErrorMessage": { "alias": "hideErrorMessage"; "required": false; }; "errorComponents": { "alias": "errorComponents"; "required": false; }; "errorComponentDefault": { "alias": "errorComponentDefault"; "required": false; }; "errorTemplates": { "alias": "errorTemplates"; "required": false; }; "errorTemplateDefault": { "alias": "errorTemplateDefault"; "required": false; }; "labelComponents": { "alias": "labelComponents"; "required": false; }; "labelComponentDefault": { "alias": "labelComponentDefault"; "required": false; }; "labelTemplates": { "alias": "labelTemplates"; "required": false; }; "labelTemplateDefault": { "alias": "labelTemplateDefault"; "required": false; }; "loadingComponent": { "alias": "loadingComponent"; "required": false; }; "loadingTemplate": { "alias": "loadingTemplate"; "required": false; }; "optionsSources": { "alias": "optionsSources"; "required": false; }; }, { "formGet": "formGet"; "onChange": "onChange"; "optionsLoaded": "optionsLoaded"; "displayValue": "displayValue"; "updateStatusFunctions": "updateStatusFunctions"; }, never, never, true, never>;
}
