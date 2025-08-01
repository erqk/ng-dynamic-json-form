import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, DestroyRef, ElementRef, EventEmitter, Injector, Input, Output, ViewChild, forwardRef, inject, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NG_ASYNC_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, } from '@angular/forms';
import { EMPTY, Subject, filter, fromEvent, map, merge, of, startWith, take, takeUntil, tap, } from 'rxjs';
import { FormGroupComponent } from './components/form-group/form-group.component';
import { NG_DYNAMIC_JSON_FORM_CONFIG } from './providers/ng-dynamic-json-form.provider';
import { ConfigMappingService, ConfigValidationService, FormConditionsService, FormGeneratorService, FormValidationService, FormValueService, GlobalVariableService, HttpRequestCacheService, OptionsDataService, } from './services';
import { FormReadyStateService } from './services/form-ready-state.service';
import { UI_BASIC_COMPONENTS } from './ui-basic/ui-basic-components.constant';
import { getControlErrors } from './utilities/get-control-errors';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
class NgDynamicJsonFormComponent {
    constructor() {
        this._providerConfig = inject(NG_DYNAMIC_JSON_FORM_CONFIG, {
            optional: true,
        });
        this._cd = inject(ChangeDetectorRef);
        this._el = inject(ElementRef);
        this._injector = inject(Injector);
        this._destroyRef = inject(DestroyRef);
        this._configValidationService = inject(ConfigValidationService);
        this._formGeneratorService = inject(FormGeneratorService);
        this._formConditionsService = inject(FormConditionsService);
        this._formValueService = inject(FormValueService);
        this._formReadyStateService = inject(FormReadyStateService);
        this._globalVariableService = inject(GlobalVariableService);
        this._optionsDataService = inject(OptionsDataService);
        this._controlDirective = null;
        /**
         * Whether to allow the form to mark as dirty
         * @description
         * If false, then it will automatically set to pristine
         * after each value changes.
         */
        this._allowFormDirty = false;
        this._globalVariablesInitialized = false;
        this._reset$ = new Subject();
        this._validationCount = 0;
        this._onTouched = () => { };
        this._onChange = (_) => { };
        this.configGet = [];
        this.configValidationErrors = [];
        this.formGet = new EventEmitter();
        /**
         * The value change event of the form, which trigger by the user
         * (by checking click or keydown event)
         */
        this.onChange = new EventEmitter();
        this.optionsLoaded = new EventEmitter();
        this.displayValue = new EventEmitter();
        this.updateStatusFunctions = new EventEmitter();
    }
    ngOnChanges(simpleChanges) {
        const { configs, hideErrorMessage } = simpleChanges;
        if (hideErrorMessage) {
            this._globalVariableService.hideErrorMessage$.next(hideErrorMessage.currentValue);
        }
        if (configs && this._globalVariablesInitialized) {
            this._buildForm();
        }
    }
    ngOnInit() {
        this._setupVariables();
        this._getControlDirective();
        this._buildForm();
    }
    ngOnDestroy() {
        this._reset$.next();
        this._reset$.complete();
        this._optionsDataService.onDestroy();
    }
    validate() {
        if (!this.form || this.form.valid) {
            return of(null);
        }
        return this.form.statusChanges.pipe(startWith(this.form.status), filter((x) => x !== 'PENDING'), take(1), map(() => this._formErrors));
    }
    registerOnValidatorChange(fn) { }
    writeValue(obj) {
        this._formValueService.patchForm(this.form, obj);
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    setDisabledState(isDisabled) {
        isDisabled ? this.form?.disable() : this.form?.enable();
    }
    _setupVariables() {
        const { errorComponent, labelComponent, loadingComponent, uiComponents, ...providerProps } = this._providerConfig ?? {};
        const errors = {
            errorComponents: this.errorComponents,
            errorTemplates: this.errorTemplates,
            errorComponentDefault: this.errorComponentDefault ?? errorComponent,
            errorTemplateDefault: this.errorTemplateDefault,
        };
        const labels = {
            labelComponents: this.labelComponents,
            labelTemplates: this.labelTemplates,
            labelComponentDefault: this.labelComponentDefault ?? labelComponent,
            labelTemplateDefault: this.labelTemplateDefault,
        };
        const loading = {
            loadingComponent: this.loadingComponent ?? loadingComponent,
            loadingTemplate: this.loadingTemplate,
        };
        this._globalVariableService.setup({
            ...errors,
            ...labels,
            ...loading,
            uiComponents: {
                ...UI_BASIC_COMPONENTS,
                ...uiComponents,
            },
            customComponents: this.customComponents,
            customTemplates: this.customTemplates,
            conditionsActionFunctions: this.conditionsActionFunctions,
            descriptionPosition: this.descriptionPosition,
            hostElement: this._el.nativeElement,
            optionsSources: this.optionsSources,
            customAsyncValidators: providerProps.customAsyncValidators,
            customValidators: providerProps.customValidators,
            hideErrorsForTypes: providerProps.hideErrorsForTypes,
            showErrorsOnTouched: providerProps.showErrorsOnTouched ?? true,
            validationMessages: providerProps.validationMessages,
        });
        this._globalVariablesInitialized = true;
    }
    _buildForm() {
        this._reset();
        if (!this.configs) {
            return;
        }
        const result = this._configValidationService.validateAndGetConfig(this.configs);
        this.configGet = result.configs ?? [];
        this.configValidationErrors = result.errors ?? [];
        this._allowFormDirty = false;
        if (this.configGet.length > 0 && !this.configValidationErrors.length) {
            this.form = this._formGeneratorService.generateFormGroup(this.configGet);
            this._globalVariableService.rootForm = this.form;
            this._globalVariableService.rootConfigs = this.configGet;
            this._cd.detectChanges();
            this._setupListeners();
            if (typeof window !== 'undefined') {
                // The form controls' state will be toggle immediately after conditions listeners are setup.
                // It will be a problem when user calling the `disable()` or `enable()` in the `formGet` callback (race condition).
                // Hence, we emit the event in the next tick to prevent this.
                window.setTimeout(() => {
                    this.formGet.emit(this.form);
                    this.updateStatusFunctions.emit({
                        setDirty: () => this._updateFormStatus('setDirty'),
                        setPristine: () => this._updateFormStatus('setPristine'),
                        setTouched: () => this._updateFormStatus('setTouched'),
                        setUntouched: () => this._updateFormStatus('setUntouched'),
                    });
                    this._checkOptionsLoaded();
                });
            }
        }
        if (!this._formReadyStateService.haveOptionsToWait(this.configGet)) {
            this._formReadyStateService.optionsLoading(false);
        }
    }
    _getControlDirective() {
        this._controlDirective = this._injector.get(NgControl, null, {
            optional: true,
            self: true,
        });
    }
    _setupListeners() {
        if (!this.form || typeof window === 'undefined') {
            return;
        }
        const host = this._el.nativeElement;
        const conditions$ = this._formConditionsService.listenConditions$();
        const event$ = (name) => fromEvent(host, name, { passive: true });
        const valueChanges$ = this._formValueChanges$();
        // Avoid using `debounceTime()` or `distinctUntilChanged()` here
        const statusChanges$ = this.form.statusChanges.pipe(startWith(this.form.status), tap(() => {
            // setErrors() again after statusChanges, to get the correct errors after
            // the re-validation if there are any async validators.
            this.form?.setErrors(this._formErrors, {
                emitEvent: false, // prevent maximum call stack exceeded
            });
        }));
        const onTouched$ = event$('focusout').pipe(take(1), tap(() => this._onTouched()));
        const allowDirtyState$ = merge(event$('pointerdown'), event$('keydown')).pipe(take(1), tap(() => (this._allowFormDirty = true)));
        this._reset$.next();
        merge(allowDirtyState$, conditions$, onTouched$, statusChanges$, valueChanges$)
            .pipe(takeUntil(this._reset$), takeUntilDestroyed(this._destroyRef))
            .subscribe();
    }
    _reset() {
        this._reset$.next();
        this._optionsDataService.cancelAllRequest();
        this._formReadyStateService.resetState();
        this._controlDirective?.control.markAsUntouched();
        this._controlDirective?.form.markAsUntouched();
        this.configValidationErrors = [];
    }
    _updateFormStatus(status) {
        switch (status) {
            case 'setDirty':
                this.formGroupRef?.updateStatus('dirty');
                break;
            case 'setPristine':
                this.formGroupRef?.updateStatus('pristine');
                break;
            case 'setTouched':
                this.formGroupRef?.updateStatus('touched');
                break;
            case 'setUntouched':
                this.formGroupRef?.updateStatus('untouched');
                break;
        }
    }
    _formValueChanges$() {
        const form = this.form;
        if (!form) {
            return EMPTY;
        }
        const updateValue = () => {
            const value = form.value;
            if (this._controlDirective) {
                this._onChange(value);
            }
            if (this._allowFormDirty) {
                this.onChange.emit(value);
            }
        };
        const updateDisplayValue = () => {
            const displayValue = this._formValueService.getFormDisplayValue(form.value, this.configGet);
            this.displayValue.emit(displayValue);
        };
        const keepFormPristine = () => {
            if (this._allowFormDirty)
                return;
            this._updateFormStatus('setPristine');
            this._controlDirective?.control.markAsPristine();
        };
        // Avoid using `debounceTime()` or `distinctUntilChanged()` here
        return form.valueChanges.pipe(startWith(form.value), tap(() => {
            //`setErrors()` must be called first, so that the form errors
            // is correctly set when `onChange` callback is called
            form.setErrors(this._formErrors);
            updateValue();
            updateDisplayValue();
            keepFormPristine();
        }));
    }
    _checkOptionsLoaded() {
        const ready$ = this._formReadyStateService.optionsReady$;
        if (ready$.value) {
            this.optionsLoaded.emit();
            return;
        }
        ready$
            .pipe(filter(Boolean), take(1), tap(() => this.optionsLoaded.emit()), takeUntilDestroyed(this._destroyRef))
            .subscribe();
    }
    get _formErrors() {
        if (!this.form)
            return null;
        const errors = getControlErrors(this.form);
        return errors;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NgDynamicJsonFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: NgDynamicJsonFormComponent, isStandalone: true, selector: "ng-dynamic-json-form", inputs: { configs: "configs", customComponents: "customComponents", customTemplates: "customTemplates", conditionsActionFunctions: "conditionsActionFunctions", collapsibleState: "collapsibleState", descriptionPosition: "descriptionPosition", rootClass: "rootClass", rootStyles: "rootStyles", hideErrorMessage: "hideErrorMessage", errorComponents: "errorComponents", errorComponentDefault: "errorComponentDefault", errorTemplates: "errorTemplates", errorTemplateDefault: "errorTemplateDefault", labelComponents: "labelComponents", labelComponentDefault: "labelComponentDefault", labelTemplates: "labelTemplates", labelTemplateDefault: "labelTemplateDefault", loadingComponent: "loadingComponent", loadingTemplate: "loadingTemplate", optionsSources: "optionsSources" }, outputs: { formGet: "formGet", onChange: "onChange", optionsLoaded: "optionsLoaded", displayValue: "displayValue", updateStatusFunctions: "updateStatusFunctions" }, host: { classAttribute: "ng-dynamic-json-form" }, providers: [
            ConfigValidationService,
            ConfigMappingService,
            FormGeneratorService,
            FormConditionsService,
            FormValidationService,
            FormValueService,
            FormReadyStateService,
            GlobalVariableService,
            HttpRequestCacheService,
            OptionsDataService,
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => NgDynamicJsonFormComponent),
                multi: true,
            },
            {
                provide: NG_ASYNC_VALIDATORS,
                useExisting: forwardRef(() => NgDynamicJsonFormComponent),
                multi: true,
            },
        ], viewQueries: [{ propertyName: "formGroupRef", first: true, predicate: FormGroupComponent, descendants: true }], usesOnChanges: true, ngImport: i0, template: "<ng-container *ngIf=\"!configs\">\n  <div class=\"no-configs-error\">\n    <span>No configs found.</span>\n  </div>\n</ng-container>\n\n<ng-container *ngIf=\"!!configValidationErrors?.length\">\n  <div class=\"config-validation-error\">\n    <div>NgDynamicJsonForm:</div>\n    <ng-container *ngFor=\"let item of configValidationErrors\">\n      <div style=\"color: var(--color-error)\">{{ item.errors }}</div>\n      <ng-container *ngIf=\"item.config\">\n        <code>{{ item.config | json }}</code>\n      </ng-container>\n    </ng-container>\n  </div>\n</ng-container>\n\n<ng-container *ngIf=\"form\">\n  <form-group\n    [configs]=\"configGet\"\n    [collapsibleState]=\"collapsibleState\"\n    [parentForm]=\"form\"\n    [rootClass]=\"rootClass\"\n    [rootStyles]=\"rootStyles\"\n  ></form-group>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i1.JsonPipe, name: "json" }, { kind: "component", type: FormGroupComponent, selector: "form-group", inputs: ["configs", "collapsibleState", "parentId", "parentForm", "rootClass", "rootStyles"] }] }); }
}
export { NgDynamicJsonFormComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NgDynamicJsonFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ng-dynamic-json-form', standalone: true, imports: [CommonModule, FormGroupComponent], host: {
                        class: 'ng-dynamic-json-form',
                    }, providers: [
                        ConfigValidationService,
                        ConfigMappingService,
                        FormGeneratorService,
                        FormConditionsService,
                        FormValidationService,
                        FormValueService,
                        FormReadyStateService,
                        GlobalVariableService,
                        HttpRequestCacheService,
                        OptionsDataService,
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NgDynamicJsonFormComponent),
                            multi: true,
                        },
                        {
                            provide: NG_ASYNC_VALIDATORS,
                            useExisting: forwardRef(() => NgDynamicJsonFormComponent),
                            multi: true,
                        },
                    ], template: "<ng-container *ngIf=\"!configs\">\n  <div class=\"no-configs-error\">\n    <span>No configs found.</span>\n  </div>\n</ng-container>\n\n<ng-container *ngIf=\"!!configValidationErrors?.length\">\n  <div class=\"config-validation-error\">\n    <div>NgDynamicJsonForm:</div>\n    <ng-container *ngFor=\"let item of configValidationErrors\">\n      <div style=\"color: var(--color-error)\">{{ item.errors }}</div>\n      <ng-container *ngIf=\"item.config\">\n        <code>{{ item.config | json }}</code>\n      </ng-container>\n    </ng-container>\n  </div>\n</ng-container>\n\n<ng-container *ngIf=\"form\">\n  <form-group\n    [configs]=\"configGet\"\n    [collapsibleState]=\"collapsibleState\"\n    [parentForm]=\"form\"\n    [rootClass]=\"rootClass\"\n    [rootStyles]=\"rootStyles\"\n  ></form-group>\n</ng-container>\n" }]
        }], propDecorators: { configs: [{
                type: Input
            }], customComponents: [{
                type: Input
            }], customTemplates: [{
                type: Input
            }], conditionsActionFunctions: [{
                type: Input
            }], collapsibleState: [{
                type: Input
            }], descriptionPosition: [{
                type: Input
            }], rootClass: [{
                type: Input
            }], rootStyles: [{
                type: Input
            }], hideErrorMessage: [{
                type: Input
            }], errorComponents: [{
                type: Input
            }], errorComponentDefault: [{
                type: Input
            }], errorTemplates: [{
                type: Input
            }], errorTemplateDefault: [{
                type: Input
            }], labelComponents: [{
                type: Input
            }], labelComponentDefault: [{
                type: Input
            }], labelTemplates: [{
                type: Input
            }], labelTemplateDefault: [{
                type: Input
            }], loadingComponent: [{
                type: Input
            }], loadingTemplate: [{
                type: Input
            }], optionsSources: [{
                type: Input
            }], formGet: [{
                type: Output
            }], onChange: [{
                type: Output
            }], optionsLoaded: [{
                type: Output
            }], displayValue: [{
                type: Output
            }], updateStatusFunctions: [{
                type: Output
            }], formGroupRef: [{
                type: ViewChild,
                args: [FormGroupComponent]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZHluYW1pYy1qc29uLWZvcm0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL2NvcmUvbmctZHluYW1pYy1qc29uLWZvcm0uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vbGliL2NvcmUvbmctZHluYW1pYy1qc29uLWZvcm0uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixVQUFVLEVBQ1YsWUFBWSxFQUNaLFFBQVEsRUFDUixLQUFLLEVBQ0wsTUFBTSxFQUlOLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2hFLE9BQU8sRUFHTCxtQkFBbUIsRUFDbkIsaUJBQWlCLEVBQ2pCLFNBQVMsR0FJVixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFDTCxLQUFLLEVBRUwsT0FBTyxFQUNQLE1BQU0sRUFDTixTQUFTLEVBQ1QsR0FBRyxFQUNILEtBQUssRUFDTCxFQUFFLEVBQ0YsU0FBUyxFQUNULElBQUksRUFDSixTQUFTLEVBQ1QsR0FBRyxHQUNKLE1BQU0sTUFBTSxDQUFDO0FBR2QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFVbEYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDeEYsT0FBTyxFQUNMLG9CQUFvQixFQUNwQix1QkFBdUIsRUFDdkIscUJBQXFCLEVBQ3JCLG9CQUFvQixFQUNwQixxQkFBcUIsRUFDckIsZ0JBQWdCLEVBQ2hCLHFCQUFxQixFQUNyQix1QkFBdUIsRUFDdkIsa0JBQWtCLEdBQ25CLE1BQU0sWUFBWSxDQUFD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QUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0csb0JBQW9CO3NCQUE1QixLQUFLO2dCQUdHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0cscUJBQXFCO3NCQUE3QixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0csb0JBQW9CO3NCQUE1QixLQUFLO2dCQUdHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQXFCRyxjQUFjO3NCQUF0QixLQUFLO2dCQUVJLE9BQU87c0JBQWhCLE1BQU07Z0JBS0csUUFBUTtzQkFBakIsTUFBTTtnQkFDRyxhQUFhO3NCQUF0QixNQUFNO2dCQUNHLFlBQVk7c0JBQXJCLE1BQU07Z0JBQ0cscUJBQXFCO3NCQUE5QixNQUFNO2dCQUV3QixZQUFZO3NCQUExQyxTQUFTO3VCQUFDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBEZXN0cm95UmVmLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVHlwZSxcbiAgVmlld0NoaWxkLFxuICBmb3J3YXJkUmVmLFxuICBpbmplY3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdGFrZVVudGlsRGVzdHJveWVkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZS9yeGpzLWludGVyb3AnO1xuaW1wb3J0IHtcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gIEZvcm1Db250cm9sRGlyZWN0aXZlLFxuICBOR19BU1lOQ19WQUxJREFUT1JTLFxuICBOR19WQUxVRV9BQ0NFU1NPUixcbiAgTmdDb250cm9sLFxuICBVbnR5cGVkRm9ybUdyb3VwLFxuICBWYWxpZGF0aW9uRXJyb3JzLFxuICBWYWxpZGF0b3IsXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIEVNUFRZLFxuICBPYnNlcnZhYmxlLFxuICBTdWJqZWN0LFxuICBmaWx0ZXIsXG4gIGZyb21FdmVudCxcbiAgbWFwLFxuICBtZXJnZSxcbiAgb2YsXG4gIHN0YXJ0V2l0aCxcbiAgdGFrZSxcbiAgdGFrZVVudGlsLFxuICB0YXAsXG59IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ3VzdG9tRXJyb3JNZXNzYWdlIH0gZnJvbSAnLi9jb21wb25lbnRzL2N1c3RvbS1lcnJvci1tZXNzYWdlL2N1c3RvbS1lcnJvci1tZXNzYWdlLmFic3RyYWN0JztcbmltcG9ydCB7IEN1c3RvbUZvcm1MYWJlbCB9IGZyb20gJy4vY29tcG9uZW50cy9jdXN0b20tZm9ybS1sYWJlbC9jdXN0b20tZm9ybS1sYWJlbC5hYnN0cmFjdCc7XG5pbXBvcnQgeyBGb3JtR3JvdXBDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZm9ybS1ncm91cC9mb3JtLWdyb3VwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDdXN0b21Db21wb25lbnRzLCBGb3JtQ29udHJvbENvbmZpZywgT3B0aW9uSXRlbSB9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IENvbmRpdGlvbnNBY3Rpb25GdW5jdGlvbnMgfSBmcm9tICcuL21vZGVscy9jb25kaXRpb25zLWFjdGlvbi1mdW5jdGlvbnMuaW50ZXJmYWNlJztcbmltcG9ydCB7IENvbmZpZ1ZhbGlkYXRpb25FcnJvcnMgfSBmcm9tICcuL21vZGVscy9jb25maWctdmFsaWRhdGlvbi1lcnJvcnMuaW50ZXJmYWNlJztcbmltcG9ydCB7IEN1c3RvbUVycm9yQ29tcG9uZW50cyB9IGZyb20gJy4vbW9kZWxzL2N1c3RvbS1lcnJvci1jb21wb25lbnRzLnR5cGUnO1xuaW1wb3J0IHsgQ3VzdG9tTGFiZWxDb21wb25lbnRzIH0gZnJvbSAnLi9tb2RlbHMvY3VzdG9tLWxhYmVsLWNvbXBvbmVudHMudHlwZSc7XG5pbXBvcnQgeyBDdXN0b21UZW1wbGF0ZXMgfSBmcm9tICcuL21vZGVscy9jdXN0b20tdGVtcGxhdGVzLnR5cGUnO1xuaW1wb3J0IHsgRm9ybURpc3BsYXlWYWx1ZSB9IGZyb20gJy4vbW9kZWxzL2Zvcm0tZGlzcGxheS12YWx1ZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRm9ybUxheW91dCB9IGZyb20gJy4vbW9kZWxzL2Zvcm0tbGF5b3V0LmludGVyZmFjZSc7XG5pbXBvcnQgeyBGb3JtU3RhdHVzRnVuY3Rpb25zIH0gZnJvbSAnLi9tb2RlbHMvZm9ybS1zdGF0dXMtZnVuY3Rpb25zLmludGVyZmFjZSc7XG5pbXBvcnQgeyBOR19EWU5BTUlDX0pTT05fRk9STV9DT05GSUcgfSBmcm9tICcuL3Byb3ZpZGVycy9uZy1keW5hbWljLWpzb24tZm9ybS5wcm92aWRlcic7XG5pbXBvcnQge1xuICBDb25maWdNYXBwaW5nU2VydmljZSxcbiAgQ29uZmlnVmFsaWRhdGlvblNlcnZpY2UsXG4gIEZvcm1Db25kaXRpb25zU2VydmljZSxcbiAgRm9ybUdlbmVyYXRvclNlcnZpY2UsXG4gIEZvcm1WYWxpZGF0aW9uU2VydmljZSxcbiAgRm9ybVZhbHVlU2VydmljZSxcbiAgR2xvYmFsVmFyaWFibGVTZXJ2aWNlLFxuICBIdHRwUmVxdWVzdENhY2hlU2VydmljZSxcbiAgT3B0aW9uc0RhdGFTZXJ2aWNlLFxufSBmcm9tICcuL3NlcnZpY2VzJztcbmltcG9ydCB7IEZvcm1SZWFkeVN0YXRlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZm9ybS1yZWFkeS1zdGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFVJX0JBU0lDX0NPTVBPTkVOVFMgfSBmcm9tICcuL3VpLWJhc2ljL3VpLWJhc2ljLWNvbXBvbmVudHMuY29uc3RhbnQnO1xuaW1wb3J0IHsgZ2V0Q29udHJvbEVycm9ycyB9IGZyb20gJy4vdXRpbGl0aWVzL2dldC1jb250cm9sLWVycm9ycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLWR5bmFtaWMtanNvbi1mb3JtJyxcbiAgdGVtcGxhdGVVcmw6ICcuL25nLWR5bmFtaWMtanNvbi1mb3JtLmNvbXBvbmVudC5odG1sJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybUdyb3VwQ29tcG9uZW50XSxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbmctZHluYW1pYy1qc29uLWZvcm0nLFxuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICBDb25maWdWYWxpZGF0aW9uU2VydmljZSxcbiAgICBDb25maWdNYXBwaW5nU2VydmljZSxcbiAgICBGb3JtR2VuZXJhdG9yU2VydmljZSxcbiAgICBGb3JtQ29uZGl0aW9uc1NlcnZpY2UsXG4gICAgRm9ybVZhbGlkYXRpb25TZXJ2aWNlLFxuICAgIEZvcm1WYWx1ZVNlcnZpY2UsXG4gICAgRm9ybVJlYWR5U3RhdGVTZXJ2aWNlLFxuICAgIEdsb2JhbFZhcmlhYmxlU2VydmljZSxcbiAgICBIdHRwUmVxdWVzdENhY2hlU2VydmljZSxcbiAgICBPcHRpb25zRGF0YVNlcnZpY2UsXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ0R5bmFtaWNKc29uRm9ybUNvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX0FTWU5DX1ZBTElEQVRPUlMsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ0R5bmFtaWNKc29uRm9ybUNvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0R5bmFtaWNKc29uRm9ybUNvbXBvbmVudFxuICBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBWYWxpZGF0b3JcbntcbiAgcHJpdmF0ZSBfcHJvdmlkZXJDb25maWcgPSBpbmplY3QoTkdfRFlOQU1JQ19KU09OX0ZPUk1fQ09ORklHLCB7XG4gICAgb3B0aW9uYWw6IHRydWUsXG4gIH0pO1xuICBwcml2YXRlIF9jZCA9IGluamVjdChDaGFuZ2VEZXRlY3RvclJlZik7XG4gIHByaXZhdGUgX2VsID0gaW5qZWN0KEVsZW1lbnRSZWYpO1xuICBwcml2YXRlIF9pbmplY3RvciA9IGluamVjdChJbmplY3Rvcik7XG4gIHByaXZhdGUgX2Rlc3Ryb3lSZWYgPSBpbmplY3QoRGVzdHJveVJlZik7XG4gIHByaXZhdGUgX2NvbmZpZ1ZhbGlkYXRpb25TZXJ2aWNlID0gaW5qZWN0KENvbmZpZ1ZhbGlkYXRpb25TZXJ2aWNlKTtcbiAgcHJpdmF0ZSBfZm9ybUdlbmVyYXRvclNlcnZpY2UgPSBpbmplY3QoRm9ybUdlbmVyYXRvclNlcnZpY2UpO1xuICBwcml2YXRlIF9mb3JtQ29uZGl0aW9uc1NlcnZpY2UgPSBpbmplY3QoRm9ybUNvbmRpdGlvbnNTZXJ2aWNlKTtcbiAgcHJpdmF0ZSBfZm9ybVZhbHVlU2VydmljZSA9IGluamVjdChGb3JtVmFsdWVTZXJ2aWNlKTtcbiAgcHJpdmF0ZSBfZm9ybVJlYWR5U3RhdGVTZXJ2aWNlID0gaW5qZWN0KEZvcm1SZWFkeVN0YXRlU2VydmljZSk7XG4gIHByaXZhdGUgX2dsb2JhbFZhcmlhYmxlU2VydmljZSA9IGluamVjdChHbG9iYWxWYXJpYWJsZVNlcnZpY2UpO1xuICBwcml2YXRlIF9vcHRpb25zRGF0YVNlcnZpY2UgPSBpbmplY3QoT3B0aW9uc0RhdGFTZXJ2aWNlKTtcblxuICBwcml2YXRlIF9jb250cm9sRGlyZWN0aXZlOiBGb3JtQ29udHJvbERpcmVjdGl2ZSB8IG51bGwgPSBudWxsO1xuICAvKipcbiAgICogV2hldGhlciB0byBhbGxvdyB0aGUgZm9ybSB0byBtYXJrIGFzIGRpcnR5XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBJZiBmYWxzZSwgdGhlbiBpdCB3aWxsIGF1dG9tYXRpY2FsbHkgc2V0IHRvIHByaXN0aW5lXG4gICAqIGFmdGVyIGVhY2ggdmFsdWUgY2hhbmdlcy5cbiAgICovXG4gIHByaXZhdGUgX2FsbG93Rm9ybURpcnR5ID0gZmFsc2U7XG4gIHByaXZhdGUgX2dsb2JhbFZhcmlhYmxlc0luaXRpYWxpemVkID0gZmFsc2U7XG4gIHByaXZhdGUgX3Jlc2V0JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgX3ZhbGlkYXRpb25Db3VudCA9IDA7XG5cbiAgcHJpdmF0ZSBfb25Ub3VjaGVkID0gKCkgPT4ge307XG4gIHByaXZhdGUgX29uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG5cbiAgY29uZmlnR2V0OiBGb3JtQ29udHJvbENvbmZpZ1tdID0gW107XG4gIGNvbmZpZ1ZhbGlkYXRpb25FcnJvcnM6IENvbmZpZ1ZhbGlkYXRpb25FcnJvcnNbXSA9IFtdO1xuICBmb3JtPzogVW50eXBlZEZvcm1Hcm91cDtcblxuICBASW5wdXQoKSBjb25maWdzPzogRm9ybUNvbnRyb2xDb25maWdbXSB8IHN0cmluZztcbiAgLyoqXG4gICAqIFVzZXIgZGVmaW5lZCBjdXN0b20gY29tcG9uZW50cy4gVXNlIGBmb3JtQ29udHJvbE5hbWVgIGFzIHRoZSBrZXkgdG8gbWFwIHRhcmdldCBjb21wb25lbnQuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIC8vIENvbmZpZ1xuICAgKiB7XG4gICAqICAgIC4uLlxuICAgKiAgICBcImZvcm1Db250cm9sTmFtZVwiOiBcImNvbXBBXCJcbiAgICogfVxuICAgKlxuICAgKiAvLyBUU1xuICAgKiBjb21wb25lbnRzID0ge1xuICAgKiAgICBjb21wQTogWW91ckNvbXBvbmVudEEsXG4gICAqICAgIGNvbXBCOiBZb3VyQ29tcG9uZW50QixcbiAgICogICAgLi4uXG4gICAqIH1cbiAgICovXG4gIEBJbnB1dCgpIGN1c3RvbUNvbXBvbmVudHM/OiBDdXN0b21Db21wb25lbnRzO1xuICAvKipcbiAgICogQ3VzdG9tIHRlbXBsYXRlcyBmb3IgaW5wdXQsIHVzaW5nIGBmb3JtQ29udHJvbE5hbWVgIGFzIHRoZSBrZXkuXG4gICAqIFVzZSB0aGlzIGlmIGNyZWF0aW5nIGEgY3VzdG9tIGNvbXBvbmVudCBpcyB3YXkgdG9vIG11Y2guXG4gICAqXG4gICAqIFRoZSB0ZW1wbGF0ZSB2YXJpYWJsZXMgYXZhaWxhYmxlOlxuICAgKiAtIGBjb250cm9sYCBUaGUgRm9ybUNvbnRyb2wgZm9yIHRoaXMgaW5wdXRcbiAgICogLSBgZGF0YWAgVGhlIGNvbmZpZyBmb3IgdGhpcyBpbnB1dFxuICAgKi9cbiAgQElucHV0KCkgY3VzdG9tVGVtcGxhdGVzPzogQ3VzdG9tVGVtcGxhdGVzO1xuICAvKipcbiAgICogRnVuY3Rpb25zIHRvIGV4ZWN1dGUgd2hlbiBjb25kaXRpb25zIGlzIG1ldC5cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIC0gV2hlbiB0aGVyZSdzIGNvbmRpdGlvbiBtZXQsIHRoZSBmdW5jdGlvbiB3aXRoIGtleSB0aGF0IG1hdGNoIHdpbGwgYmUgY2FsbGVkLlxuICAgKiAtIFRoZSBmdW5jdGlvbiBjb250YWlucyBhbiBvcHRpb25hbCBhcmd1bWVudCwgd2hpY2ggaXMgdGhlIGNvbnRyb2wgb2Ygd2hlcmUgdGhlIGNvbmRpdGlvbnMgd2lsbCBhZmZlY3QgdG8uXG4gICAqL1xuICBASW5wdXQoKSBjb25kaXRpb25zQWN0aW9uRnVuY3Rpb25zPzogQ29uZGl0aW9uc0FjdGlvbkZ1bmN0aW9ucztcblxuICBASW5wdXQoKSBjb2xsYXBzaWJsZVN0YXRlPzogRm9ybUxheW91dFsnY29udGVudENvbGxhcHNpYmxlJ107XG4gIEBJbnB1dCgpIGRlc2NyaXB0aW9uUG9zaXRpb24/OiBGb3JtTGF5b3V0WydkZXNjcmlwdGlvblBvc2l0aW9uJ107XG4gIEBJbnB1dCgpIHJvb3RDbGFzcz86IHN0cmluZztcbiAgQElucHV0KCkgcm9vdFN0eWxlcz86IHN0cmluZztcbiAgQElucHV0KCkgaGlkZUVycm9yTWVzc2FnZT86IGJvb2xlYW47XG5cbiAgLy8gQ3VzdG9tIGVycm9yIGNvbXBvbmVudHMvdGVtcGxhdGVzXG4gIEBJbnB1dCgpIGVycm9yQ29tcG9uZW50cz86IEN1c3RvbUVycm9yQ29tcG9uZW50cztcbiAgQElucHV0KCkgZXJyb3JDb21wb25lbnREZWZhdWx0PzogVHlwZTxDdXN0b21FcnJvck1lc3NhZ2U+O1xuICBASW5wdXQoKSBlcnJvclRlbXBsYXRlcz86IEN1c3RvbVRlbXBsYXRlcztcbiAgQElucHV0KCkgZXJyb3JUZW1wbGF0ZURlZmF1bHQ/OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8vIEN1c3RvbSBsYWJlbCBjb21wb25lbnRzL3RlbXBsYXRlc1xuICBASW5wdXQoKSBsYWJlbENvbXBvbmVudHM/OiBDdXN0b21MYWJlbENvbXBvbmVudHM7XG4gIEBJbnB1dCgpIGxhYmVsQ29tcG9uZW50RGVmYXVsdD86IFR5cGU8Q3VzdG9tRm9ybUxhYmVsPjtcbiAgQElucHV0KCkgbGFiZWxUZW1wbGF0ZXM/OiBDdXN0b21UZW1wbGF0ZXM7XG4gIEBJbnB1dCgpIGxhYmVsVGVtcGxhdGVEZWZhdWx0PzogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvLyBDdXN0b20gbG9hZGluZyBjb21wb25lbnRzL3RlbXBsYXRlc1xuICBASW5wdXQoKSBsb2FkaW5nQ29tcG9uZW50PzogVHlwZTxhbnk+O1xuICBASW5wdXQoKSBsb2FkaW5nVGVtcGxhdGU/OiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAvKipcbiAgICogQ3VzdG9tIG9ic2VydmFibGVzIGZvciB0aGUgb3B0aW9uc1xuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhlIG9ic2VydmFibGUgd2l0aCBrZXkgdGhhdCBtYXRjaCB3aXRoIHRoZSBgc3JjYCB3aWxsIGJlIHVzZWQuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYHRzXG4gICAqIG9wdGlvbnNTb3VyY2VzID0ge1xuICAgKiAgICAnZ2V0Q291bnRyaWVzJzogLi4uXG4gICAqIH1cbiAgICpcbiAgICogY29uZmlnID0ge1xuICAgKiAgLi4uXG4gICAqICBvcHRpb25zOiB7XG4gICAqICAgIC4uLlxuICAgKiAgICBzcmM6ICdnZXRDb3VudHJpZXMnXG4gICAqICB9XG4gICAqIH1cbiAgICogYGBgXG4gICAqL1xuICBASW5wdXQoKSBvcHRpb25zU291cmNlcz86IHsgW2tleTogc3RyaW5nXTogT2JzZXJ2YWJsZTxPcHRpb25JdGVtW10+IH07XG5cbiAgQE91dHB1dCgpIGZvcm1HZXQgPSBuZXcgRXZlbnRFbWl0dGVyPFVudHlwZWRGb3JtR3JvdXA+KCk7XG4gIC8qKlxuICAgKiBUaGUgdmFsdWUgY2hhbmdlIGV2ZW50IG9mIHRoZSBmb3JtLCB3aGljaCB0cmlnZ2VyIGJ5IHRoZSB1c2VyXG4gICAqIChieSBjaGVja2luZyBjbGljayBvciBrZXlkb3duIGV2ZW50KVxuICAgKi9cbiAgQE91dHB1dCgpIG9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBvcHRpb25zTG9hZGVkID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgZGlzcGxheVZhbHVlID0gbmV3IEV2ZW50RW1pdHRlcjxGb3JtRGlzcGxheVZhbHVlPigpO1xuICBAT3V0cHV0KCkgdXBkYXRlU3RhdHVzRnVuY3Rpb25zID0gbmV3IEV2ZW50RW1pdHRlcjxGb3JtU3RhdHVzRnVuY3Rpb25zPigpO1xuXG4gIEBWaWV3Q2hpbGQoRm9ybUdyb3VwQ29tcG9uZW50KSBmb3JtR3JvdXBSZWY/OiBGb3JtR3JvdXBDb21wb25lbnQ7XG5cbiAgbmdPbkNoYW5nZXMoc2ltcGxlQ2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgY29uZmlncywgaGlkZUVycm9yTWVzc2FnZSB9ID0gc2ltcGxlQ2hhbmdlcztcblxuICAgIGlmIChoaWRlRXJyb3JNZXNzYWdlKSB7XG4gICAgICB0aGlzLl9nbG9iYWxWYXJpYWJsZVNlcnZpY2UuaGlkZUVycm9yTWVzc2FnZSQubmV4dChcbiAgICAgICAgaGlkZUVycm9yTWVzc2FnZS5jdXJyZW50VmFsdWVcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZ3MgJiYgdGhpcy5fZ2xvYmFsVmFyaWFibGVzSW5pdGlhbGl6ZWQpIHtcbiAgICAgIHRoaXMuX2J1aWxkRm9ybSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3NldHVwVmFyaWFibGVzKCk7XG4gICAgdGhpcy5fZ2V0Q29udHJvbERpcmVjdGl2ZSgpO1xuICAgIHRoaXMuX2J1aWxkRm9ybSgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fcmVzZXQkLm5leHQoKTtcbiAgICB0aGlzLl9yZXNldCQuY29tcGxldGUoKTtcbiAgICB0aGlzLl9vcHRpb25zRGF0YVNlcnZpY2Uub25EZXN0cm95KCk7XG4gIH1cblxuICB2YWxpZGF0ZSgpOiBPYnNlcnZhYmxlPFZhbGlkYXRpb25FcnJvcnMgfCBudWxsPiB7XG4gICAgaWYgKCF0aGlzLmZvcm0gfHwgdGhpcy5mb3JtLnZhbGlkKSB7XG4gICAgICByZXR1cm4gb2YobnVsbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZm9ybS5zdGF0dXNDaGFuZ2VzLnBpcGUoXG4gICAgICBzdGFydFdpdGgodGhpcy5mb3JtLnN0YXR1cyksXG4gICAgICBmaWx0ZXIoKHgpID0+IHggIT09ICdQRU5ESU5HJyksXG4gICAgICB0YWtlKDEpLFxuICAgICAgbWFwKCgpID0+IHRoaXMuX2Zvcm1FcnJvcnMpXG4gICAgKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25WYWxpZGF0b3JDaGFuZ2U/KGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7fVxuXG4gIHdyaXRlVmFsdWUob2JqOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9mb3JtVmFsdWVTZXJ2aWNlLnBhdGNoRm9ybSh0aGlzLmZvcm0sIG9iaik7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX29uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZT8oaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIGlzRGlzYWJsZWQgPyB0aGlzLmZvcm0/LmRpc2FibGUoKSA6IHRoaXMuZm9ybT8uZW5hYmxlKCk7XG4gIH1cblxuICBwcml2YXRlIF9zZXR1cFZhcmlhYmxlcygpOiB2b2lkIHtcbiAgICBjb25zdCB7XG4gICAgICBlcnJvckNvbXBvbmVudCxcbiAgICAgIGxhYmVsQ29tcG9uZW50LFxuICAgICAgbG9hZGluZ0NvbXBvbmVudCxcbiAgICAgIHVpQ29tcG9uZW50cyxcbiAgICAgIC4uLnByb3ZpZGVyUHJvcHNcbiAgICB9ID0gdGhpcy5fcHJvdmlkZXJDb25maWcgPz8ge307XG5cbiAgICBjb25zdCBlcnJvcnMgPSB7XG4gICAgICBlcnJvckNvbXBvbmVudHM6IHRoaXMuZXJyb3JDb21wb25lbnRzLFxuICAgICAgZXJyb3JUZW1wbGF0ZXM6IHRoaXMuZXJyb3JUZW1wbGF0ZXMsXG4gICAgICBlcnJvckNvbXBvbmVudERlZmF1bHQ6IHRoaXMuZXJyb3JDb21wb25lbnREZWZhdWx0ID8/IGVycm9yQ29tcG9uZW50LFxuICAgICAgZXJyb3JUZW1wbGF0ZURlZmF1bHQ6IHRoaXMuZXJyb3JUZW1wbGF0ZURlZmF1bHQsXG4gICAgfTtcblxuICAgIGNvbnN0IGxhYmVscyA9IHtcbiAgICAgIGxhYmVsQ29tcG9uZW50czogdGhpcy5sYWJlbENvbXBvbmVudHMsXG4gICAgICBsYWJlbFRlbXBsYXRlczogdGhpcy5sYWJlbFRlbXBsYXRlcyxcbiAgICAgIGxhYmVsQ29tcG9uZW50RGVmYXVsdDogdGhpcy5sYWJlbENvbXBvbmVudERlZmF1bHQgPz8gbGFiZWxDb21wb25lbnQsXG4gICAgICBsYWJlbFRlbXBsYXRlRGVmYXVsdDogdGhpcy5sYWJlbFRlbXBsYXRlRGVmYXVsdCxcbiAgICB9O1xuXG4gICAgY29uc3QgbG9hZGluZyA9IHtcbiAgICAgIGxvYWRpbmdDb21wb25lbnQ6IHRoaXMubG9hZGluZ0NvbXBvbmVudCA/PyBsb2FkaW5nQ29tcG9uZW50LFxuICAgICAgbG9hZGluZ1RlbXBsYXRlOiB0aGlzLmxvYWRpbmdUZW1wbGF0ZSxcbiAgICB9O1xuXG4gICAgdGhpcy5fZ2xvYmFsVmFyaWFibGVTZXJ2aWNlLnNldHVwKHtcbiAgICAgIC4uLmVycm9ycyxcbiAgICAgIC4uLmxhYmVscyxcbiAgICAgIC4uLmxvYWRpbmcsXG4gICAgICB1aUNvbXBvbmVudHM6IHtcbiAgICAgICAgLi4uVUlfQkFTSUNfQ09NUE9ORU5UUyxcbiAgICAgICAgLi4udWlDb21wb25lbnRzLFxuICAgICAgfSxcbiAgICAgIGN1c3RvbUNvbXBvbmVudHM6IHRoaXMuY3VzdG9tQ29tcG9uZW50cyxcbiAgICAgIGN1c3RvbVRlbXBsYXRlczogdGhpcy5jdXN0b21UZW1wbGF0ZXMsXG4gICAgICBjb25kaXRpb25zQWN0aW9uRnVuY3Rpb25zOiB0aGlzLmNvbmRpdGlvbnNBY3Rpb25GdW5jdGlvbnMsXG4gICAgICBkZXNjcmlwdGlvblBvc2l0aW9uOiB0aGlzLmRlc2NyaXB0aW9uUG9zaXRpb24sXG4gICAgICBob3N0RWxlbWVudDogdGhpcy5fZWwubmF0aXZlRWxlbWVudCxcbiAgICAgIG9wdGlvbnNTb3VyY2VzOiB0aGlzLm9wdGlvbnNTb3VyY2VzLFxuICAgICAgY3VzdG9tQXN5bmNWYWxpZGF0b3JzOiBwcm92aWRlclByb3BzLmN1c3RvbUFzeW5jVmFsaWRhdG9ycyxcbiAgICAgIGN1c3RvbVZhbGlkYXRvcnM6IHByb3ZpZGVyUHJvcHMuY3VzdG9tVmFsaWRhdG9ycyxcbiAgICAgIGhpZGVFcnJvcnNGb3JUeXBlczogcHJvdmlkZXJQcm9wcy5oaWRlRXJyb3JzRm9yVHlwZXMsXG4gICAgICBzaG93RXJyb3JzT25Ub3VjaGVkOiBwcm92aWRlclByb3BzLnNob3dFcnJvcnNPblRvdWNoZWQgPz8gdHJ1ZSxcbiAgICAgIHZhbGlkYXRpb25NZXNzYWdlczogcHJvdmlkZXJQcm9wcy52YWxpZGF0aW9uTWVzc2FnZXMsXG4gICAgfSk7XG5cbiAgICB0aGlzLl9nbG9iYWxWYXJpYWJsZXNJbml0aWFsaXplZCA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZEZvcm0oKTogdm9pZCB7XG4gICAgdGhpcy5fcmVzZXQoKTtcblxuICAgIGlmICghdGhpcy5jb25maWdzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5fY29uZmlnVmFsaWRhdGlvblNlcnZpY2UudmFsaWRhdGVBbmRHZXRDb25maWcoXG4gICAgICB0aGlzLmNvbmZpZ3NcbiAgICApO1xuXG4gICAgdGhpcy5jb25maWdHZXQgPSByZXN1bHQuY29uZmlncyA/PyBbXTtcbiAgICB0aGlzLmNvbmZpZ1ZhbGlkYXRpb25FcnJvcnMgPSByZXN1bHQuZXJyb3JzID8/IFtdO1xuICAgIHRoaXMuX2FsbG93Rm9ybURpcnR5ID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy5jb25maWdHZXQubGVuZ3RoID4gMCAmJiAhdGhpcy5jb25maWdWYWxpZGF0aW9uRXJyb3JzLmxlbmd0aCkge1xuICAgICAgdGhpcy5mb3JtID0gdGhpcy5fZm9ybUdlbmVyYXRvclNlcnZpY2UuZ2VuZXJhdGVGb3JtR3JvdXAodGhpcy5jb25maWdHZXQpO1xuXG4gICAgICB0aGlzLl9nbG9iYWxWYXJpYWJsZVNlcnZpY2Uucm9vdEZvcm0gPSB0aGlzLmZvcm07XG4gICAgICB0aGlzLl9nbG9iYWxWYXJpYWJsZVNlcnZpY2Uucm9vdENvbmZpZ3MgPSB0aGlzLmNvbmZpZ0dldDtcblxuICAgICAgdGhpcy5fY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgdGhpcy5fc2V0dXBMaXN0ZW5lcnMoKTtcblxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vIFRoZSBmb3JtIGNvbnRyb2xzJyBzdGF0ZSB3aWxsIGJlIHRvZ2dsZSBpbW1lZGlhdGVseSBhZnRlciBjb25kaXRpb25zIGxpc3RlbmVycyBhcmUgc2V0dXAuXG4gICAgICAgIC8vIEl0IHdpbGwgYmUgYSBwcm9ibGVtIHdoZW4gdXNlciBjYWxsaW5nIHRoZSBgZGlzYWJsZSgpYCBvciBgZW5hYmxlKClgIGluIHRoZSBgZm9ybUdldGAgY2FsbGJhY2sgKHJhY2UgY29uZGl0aW9uKS5cbiAgICAgICAgLy8gSGVuY2UsIHdlIGVtaXQgdGhlIGV2ZW50IGluIHRoZSBuZXh0IHRpY2sgdG8gcHJldmVudCB0aGlzLlxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5mb3JtR2V0LmVtaXQodGhpcy5mb3JtKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXR1c0Z1bmN0aW9ucy5lbWl0KHtcbiAgICAgICAgICAgIHNldERpcnR5OiAoKSA9PiB0aGlzLl91cGRhdGVGb3JtU3RhdHVzKCdzZXREaXJ0eScpLFxuICAgICAgICAgICAgc2V0UHJpc3RpbmU6ICgpID0+IHRoaXMuX3VwZGF0ZUZvcm1TdGF0dXMoJ3NldFByaXN0aW5lJyksXG4gICAgICAgICAgICBzZXRUb3VjaGVkOiAoKSA9PiB0aGlzLl91cGRhdGVGb3JtU3RhdHVzKCdzZXRUb3VjaGVkJyksXG4gICAgICAgICAgICBzZXRVbnRvdWNoZWQ6ICgpID0+IHRoaXMuX3VwZGF0ZUZvcm1TdGF0dXMoJ3NldFVudG91Y2hlZCcpLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5fY2hlY2tPcHRpb25zTG9hZGVkKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghdGhpcy5fZm9ybVJlYWR5U3RhdGVTZXJ2aWNlLmhhdmVPcHRpb25zVG9XYWl0KHRoaXMuY29uZmlnR2V0KSkge1xuICAgICAgdGhpcy5fZm9ybVJlYWR5U3RhdGVTZXJ2aWNlLm9wdGlvbnNMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9nZXRDb250cm9sRGlyZWN0aXZlKCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnRyb2xEaXJlY3RpdmUgPSB0aGlzLl9pbmplY3Rvci5nZXQoTmdDb250cm9sLCBudWxsLCB7XG4gICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICAgIHNlbGY6IHRydWUsXG4gICAgfSkgYXMgRm9ybUNvbnRyb2xEaXJlY3RpdmU7XG4gIH1cblxuICBwcml2YXRlIF9zZXR1cExpc3RlbmVycygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZm9ybSB8fCB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGhvc3QgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IGNvbmRpdGlvbnMkID0gdGhpcy5fZm9ybUNvbmRpdGlvbnNTZXJ2aWNlLmxpc3RlbkNvbmRpdGlvbnMkKCk7XG4gICAgY29uc3QgZXZlbnQkID0gKG5hbWU6IHN0cmluZykgPT4gZnJvbUV2ZW50KGhvc3QsIG5hbWUsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcblxuICAgIGNvbnN0IHZhbHVlQ2hhbmdlcyQgPSB0aGlzLl9mb3JtVmFsdWVDaGFuZ2VzJCgpO1xuXG4gICAgLy8gQXZvaWQgdXNpbmcgYGRlYm91bmNlVGltZSgpYCBvciBgZGlzdGluY3RVbnRpbENoYW5nZWQoKWAgaGVyZVxuICAgIGNvbnN0IHN0YXR1c0NoYW5nZXMkID0gdGhpcy5mb3JtLnN0YXR1c0NoYW5nZXMucGlwZShcbiAgICAgIHN0YXJ0V2l0aCh0aGlzLmZvcm0uc3RhdHVzKSxcbiAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgIC8vIHNldEVycm9ycygpIGFnYWluIGFmdGVyIHN0YXR1c0NoYW5nZXMsIHRvIGdldCB0aGUgY29ycmVjdCBlcnJvcnMgYWZ0ZXJcbiAgICAgICAgLy8gdGhlIHJlLXZhbGlkYXRpb24gaWYgdGhlcmUgYXJlIGFueSBhc3luYyB2YWxpZGF0b3JzLlxuICAgICAgICB0aGlzLmZvcm0/LnNldEVycm9ycyh0aGlzLl9mb3JtRXJyb3JzLCB7XG4gICAgICAgICAgZW1pdEV2ZW50OiBmYWxzZSwgLy8gcHJldmVudCBtYXhpbXVtIGNhbGwgc3RhY2sgZXhjZWVkZWRcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBjb25zdCBvblRvdWNoZWQkID0gZXZlbnQkKCdmb2N1c291dCcpLnBpcGUoXG4gICAgICB0YWtlKDEpLFxuICAgICAgdGFwKCgpID0+IHRoaXMuX29uVG91Y2hlZCgpKVxuICAgICk7XG5cbiAgICBjb25zdCBhbGxvd0RpcnR5U3RhdGUkID0gbWVyZ2UoXG4gICAgICBldmVudCQoJ3BvaW50ZXJkb3duJyksXG4gICAgICBldmVudCQoJ2tleWRvd24nKVxuICAgICkucGlwZShcbiAgICAgIHRha2UoMSksXG4gICAgICB0YXAoKCkgPT4gKHRoaXMuX2FsbG93Rm9ybURpcnR5ID0gdHJ1ZSkpXG4gICAgKTtcblxuICAgIHRoaXMuX3Jlc2V0JC5uZXh0KCk7XG4gICAgbWVyZ2UoXG4gICAgICBhbGxvd0RpcnR5U3RhdGUkLFxuICAgICAgY29uZGl0aW9ucyQsXG4gICAgICBvblRvdWNoZWQkLFxuICAgICAgc3RhdHVzQ2hhbmdlcyQsXG4gICAgICB2YWx1ZUNoYW5nZXMkXG4gICAgKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX3Jlc2V0JCksIHRha2VVbnRpbERlc3Ryb3llZCh0aGlzLl9kZXN0cm95UmVmKSlcbiAgICAgIC5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Jlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuX3Jlc2V0JC5uZXh0KCk7XG4gICAgdGhpcy5fb3B0aW9uc0RhdGFTZXJ2aWNlLmNhbmNlbEFsbFJlcXVlc3QoKTtcbiAgICB0aGlzLl9mb3JtUmVhZHlTdGF0ZVNlcnZpY2UucmVzZXRTdGF0ZSgpO1xuICAgIHRoaXMuX2NvbnRyb2xEaXJlY3RpdmU/LmNvbnRyb2wubWFya0FzVW50b3VjaGVkKCk7XG4gICAgdGhpcy5fY29udHJvbERpcmVjdGl2ZT8uZm9ybS5tYXJrQXNVbnRvdWNoZWQoKTtcbiAgICB0aGlzLmNvbmZpZ1ZhbGlkYXRpb25FcnJvcnMgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUZvcm1TdGF0dXMoc3RhdHVzOiBrZXlvZiBGb3JtU3RhdHVzRnVuY3Rpb25zKTogdm9pZCB7XG4gICAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICAgIGNhc2UgJ3NldERpcnR5JzpcbiAgICAgICAgdGhpcy5mb3JtR3JvdXBSZWY/LnVwZGF0ZVN0YXR1cygnZGlydHknKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ3NldFByaXN0aW5lJzpcbiAgICAgICAgdGhpcy5mb3JtR3JvdXBSZWY/LnVwZGF0ZVN0YXR1cygncHJpc3RpbmUnKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ3NldFRvdWNoZWQnOlxuICAgICAgICB0aGlzLmZvcm1Hcm91cFJlZj8udXBkYXRlU3RhdHVzKCd0b3VjaGVkJyk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdzZXRVbnRvdWNoZWQnOlxuICAgICAgICB0aGlzLmZvcm1Hcm91cFJlZj8udXBkYXRlU3RhdHVzKCd1bnRvdWNoZWQnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZm9ybVZhbHVlQ2hhbmdlcyQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCBmb3JtID0gdGhpcy5mb3JtO1xuICAgIGlmICghZm9ybSkge1xuICAgICAgcmV0dXJuIEVNUFRZO1xuICAgIH1cblxuICAgIGNvbnN0IHVwZGF0ZVZhbHVlID0gKCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBmb3JtLnZhbHVlO1xuXG4gICAgICBpZiAodGhpcy5fY29udHJvbERpcmVjdGl2ZSkge1xuICAgICAgICB0aGlzLl9vbkNoYW5nZSh2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9hbGxvd0Zvcm1EaXJ0eSkge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCB1cGRhdGVEaXNwbGF5VmFsdWUgPSAoKSA9PiB7XG4gICAgICBjb25zdCBkaXNwbGF5VmFsdWUgPSB0aGlzLl9mb3JtVmFsdWVTZXJ2aWNlLmdldEZvcm1EaXNwbGF5VmFsdWUoXG4gICAgICAgIGZvcm0udmFsdWUsXG4gICAgICAgIHRoaXMuY29uZmlnR2V0XG4gICAgICApO1xuXG4gICAgICB0aGlzLmRpc3BsYXlWYWx1ZS5lbWl0KGRpc3BsYXlWYWx1ZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGtlZXBGb3JtUHJpc3RpbmUgPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5fYWxsb3dGb3JtRGlydHkpIHJldHVybjtcbiAgICAgIHRoaXMuX3VwZGF0ZUZvcm1TdGF0dXMoJ3NldFByaXN0aW5lJyk7XG4gICAgICB0aGlzLl9jb250cm9sRGlyZWN0aXZlPy5jb250cm9sLm1hcmtBc1ByaXN0aW5lKCk7XG4gICAgfTtcblxuICAgIC8vIEF2b2lkIHVzaW5nIGBkZWJvdW5jZVRpbWUoKWAgb3IgYGRpc3RpbmN0VW50aWxDaGFuZ2VkKClgIGhlcmVcbiAgICByZXR1cm4gZm9ybS52YWx1ZUNoYW5nZXMucGlwZShcbiAgICAgIHN0YXJ0V2l0aChmb3JtLnZhbHVlKSxcbiAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgIC8vYHNldEVycm9ycygpYCBtdXN0IGJlIGNhbGxlZCBmaXJzdCwgc28gdGhhdCB0aGUgZm9ybSBlcnJvcnNcbiAgICAgICAgLy8gaXMgY29ycmVjdGx5IHNldCB3aGVuIGBvbkNoYW5nZWAgY2FsbGJhY2sgaXMgY2FsbGVkXG4gICAgICAgIGZvcm0uc2V0RXJyb3JzKHRoaXMuX2Zvcm1FcnJvcnMpO1xuICAgICAgICB1cGRhdGVWYWx1ZSgpO1xuICAgICAgICB1cGRhdGVEaXNwbGF5VmFsdWUoKTtcbiAgICAgICAga2VlcEZvcm1QcmlzdGluZSgpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2hlY2tPcHRpb25zTG9hZGVkKCk6IHZvaWQge1xuICAgIGNvbnN0IHJlYWR5JCA9IHRoaXMuX2Zvcm1SZWFkeVN0YXRlU2VydmljZS5vcHRpb25zUmVhZHkkO1xuXG4gICAgaWYgKHJlYWR5JC52YWx1ZSkge1xuICAgICAgdGhpcy5vcHRpb25zTG9hZGVkLmVtaXQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZWFkeSRcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoQm9vbGVhbiksXG4gICAgICAgIHRha2UoMSksXG4gICAgICAgIHRhcCgoKSA9PiB0aGlzLm9wdGlvbnNMb2FkZWQuZW1pdCgpKSxcbiAgICAgICAgdGFrZVVudGlsRGVzdHJveWVkKHRoaXMuX2Rlc3Ryb3lSZWYpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIGdldCBfZm9ybUVycm9ycygpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7XG4gICAgaWYgKCF0aGlzLmZvcm0pIHJldHVybiBudWxsO1xuXG4gICAgY29uc3QgZXJyb3JzID0gZ2V0Q29udHJvbEVycm9ycyh0aGlzLmZvcm0pO1xuICAgIHJldHVybiBlcnJvcnM7XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgKm5nSWY9XCIhY29uZmlnc1wiPlxuICA8ZGl2IGNsYXNzPVwibm8tY29uZmlncy1lcnJvclwiPlxuICAgIDxzcGFuPk5vIGNvbmZpZ3MgZm91bmQuPC9zcGFuPlxuICA8L2Rpdj5cbjwvbmctY29udGFpbmVyPlxuXG48bmctY29udGFpbmVyICpuZ0lmPVwiISFjb25maWdWYWxpZGF0aW9uRXJyb3JzPy5sZW5ndGhcIj5cbiAgPGRpdiBjbGFzcz1cImNvbmZpZy12YWxpZGF0aW9uLWVycm9yXCI+XG4gICAgPGRpdj5OZ0R5bmFtaWNKc29uRm9ybTo8L2Rpdj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBpdGVtIG9mIGNvbmZpZ1ZhbGlkYXRpb25FcnJvcnNcIj5cbiAgICAgIDxkaXYgc3R5bGU9XCJjb2xvcjogdmFyKC0tY29sb3ItZXJyb3IpXCI+e3sgaXRlbS5lcnJvcnMgfX08L2Rpdj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpdGVtLmNvbmZpZ1wiPlxuICAgICAgICA8Y29kZT57eyBpdGVtLmNvbmZpZyB8IGpzb24gfX08L2NvZGU+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9kaXY+XG48L25nLWNvbnRhaW5lcj5cblxuPG5nLWNvbnRhaW5lciAqbmdJZj1cImZvcm1cIj5cbiAgPGZvcm0tZ3JvdXBcbiAgICBbY29uZmlnc109XCJjb25maWdHZXRcIlxuICAgIFtjb2xsYXBzaWJsZVN0YXRlXT1cImNvbGxhcHNpYmxlU3RhdGVcIlxuICAgIFtwYXJlbnRGb3JtXT1cImZvcm1cIlxuICAgIFtyb290Q2xhc3NdPVwicm9vdENsYXNzXCJcbiAgICBbcm9vdFN0eWxlc109XCJyb290U3R5bGVzXCJcbiAgPjwvZm9ybS1ncm91cD5cbjwvbmctY29udGFpbmVyPlxuIl19