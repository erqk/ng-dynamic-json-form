import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, DestroyRef, HostListener, Input, ViewChild, ViewContainerRef, forwardRef, inject, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, } from '@angular/forms';
import { combineLatest, debounceTime, finalize, startWith, tap } from 'rxjs';
import { FormReadyStateService, GlobalVariableService, OptionsDataService, } from '../../services';
import { UI_BASIC_COMPONENTS } from '../../ui-basic/ui-basic-components.constant';
import { UiBasicInputComponent } from '../../ui-basic/ui-basic-input/ui-basic-input.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
class FormControlComponent {
    constructor() {
        this._cd = inject(ChangeDetectorRef);
        this._destroyRef = inject(DestroyRef);
        this._globalVariableService = inject(GlobalVariableService);
        this._formReadyStateService = inject(FormReadyStateService);
        this._optionsDataService = inject(OptionsDataService);
        this._uiComponents = this._globalVariableService.uiComponents;
        this._pendingValue = null;
        this._onChange = (_) => { };
        this._onTouched = () => { };
        this.customTemplates = this._globalVariableService.customTemplates;
        this.loadingComponent = this._globalVariableService.loadingComponent;
        this.loadingTemplate = this._globalVariableService.loadingTemplate;
        this.loading = false;
        this.useCustomLoading = false;
        this.hostForm = this._globalVariableService.rootForm;
        this.hideErrorMessage$ = this._globalVariableService.hideErrorMessage$;
    }
    onFocusOut() {
        if (this.data?.type === 'select') {
            // For select component, trigger when it's blurred.
            // It's implemented on the corresponding component.
            return;
        }
        this._onTouched();
    }
    writeValue(obj) {
        this._pendingValue = obj;
        this._controlComponent?.writeValue(obj);
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this._controlComponent?.setDisabledState(isDisabled);
    }
    validate(control) {
        return this._controlComponent?.validate(control) ?? null;
    }
    ngOnInit() {
        this.useCustomLoading =
            Boolean(this.loadingComponent) || Boolean(this.loadingTemplate);
    }
    ngAfterViewInit() {
        this._injectInputComponent();
        this._fetchOptions();
        this._errorMessageEvent();
        this._cd.detectChanges();
    }
    ngOnDestroy() {
        this.control = undefined;
        this.data = undefined;
    }
    updateControlStatus(status, updateSelf = false) {
        const control = this.control;
        const controlComponent = this._controlComponent;
        const markAsDirty = () => {
            controlComponent?.control?.markAsDirty();
            controlComponent?.markAsDirty();
            if (updateSelf) {
                control?.markAsDirty();
            }
        };
        const markAsPristine = () => {
            controlComponent?.control?.markAsPristine();
            controlComponent?.markAsPristine();
            if (updateSelf) {
                control?.markAsPristine();
            }
        };
        const markAsTouched = () => {
            controlComponent?.control?.markAsTouched();
            controlComponent?.markAsTouched();
            if (updateSelf) {
                control?.markAsTouched();
            }
        };
        const markAsUntouched = () => {
            controlComponent?.control?.markAsUntouched();
            controlComponent?.markAsUntouched();
            if (updateSelf) {
                control?.markAsUntouched();
            }
        };
        switch (status) {
            case 'dirty':
                markAsDirty();
                break;
            case 'pristine':
                markAsPristine();
                break;
            case 'touched':
                markAsTouched();
                break;
            case 'untouched':
                markAsUntouched();
                break;
        }
    }
    get showErrors() {
        const controlTouched = this.control?.touched ?? false;
        const controlDirty = this.control?.dirty ?? false;
        const hasErrors = !!this.control?.errors;
        if (this.hideErrorMessage$) {
            return false;
        }
        return (controlDirty || controlTouched) && hasErrors;
    }
    _injectComponent(vcr, component) {
        if (!vcr || !component)
            return null;
        vcr.clear();
        const componentRef = vcr.createComponent(component);
        return componentRef;
    }
    _injectInputComponent() {
        if (this.customTemplates?.[this.data?.formControlName ?? '']) {
            return;
        }
        const inputComponent = this.customComponent ||
            this._uiComponents?.[this._inputType] ||
            UI_BASIC_COMPONENTS[this._inputType] ||
            UiBasicInputComponent;
        const componentRef = this._injectComponent(this.inputComponentAnchor, inputComponent);
        if (!componentRef)
            return;
        componentRef.instance.data = this.data;
        componentRef.instance.hostForm = this._globalVariableService.rootForm;
        componentRef.instance.writeValue(this._pendingValue);
        componentRef.instance.registerOnChange(this._onChange);
        componentRef.instance.registerOnTouched(this._onTouched);
        this._controlComponent = componentRef.instance;
    }
    _fetchOptions() {
        if (!this.data || !this.data.options) {
            this._pendingValue = null;
            return;
        }
        const { src, srcAppendPosition, autoSelectFirst, data: staticOptions = [], } = this.data.options;
        const updateControlValue = (value) => {
            this.control?.setValue(value);
            this._controlComponent?.writeValue(value);
        };
        const selectFirst = (options) => {
            if (!autoSelectFirst || !options.length)
                return;
            updateControlValue(options[0].value);
        };
        const setLoading = (val) => {
            this.loading = val;
            this._formReadyStateService.optionsLoading(val);
        };
        if (!src) {
            selectFirst(staticOptions);
            return;
        }
        const source$ = typeof src === 'string'
            ? this._globalVariableService.optionsSources?.[src]
            : this._optionsDataService.getOptions$(src, () => {
                setLoading(true);
                updateControlValue(null);
            });
        setLoading(true);
        source$
            ?.pipe(tap((x) => {
            const options = srcAppendPosition === 'before'
                ? x.concat(staticOptions)
                : staticOptions.concat(x);
            if (this._pendingValue) {
                updateControlValue(this._pendingValue);
                this._pendingValue = null;
            }
            else {
                selectFirst(options);
            }
            setLoading(false);
            this._controlComponent?.onOptionsGet(options);
        }), finalize(() => setLoading(false)))
            .subscribe();
    }
    _errorMessageEvent() {
        if (!this.control)
            return;
        const control = this.control;
        const controlComponent = this._controlComponent;
        combineLatest([
            this.hideErrorMessage$,
            control.statusChanges.pipe(startWith(control.status)),
        ])
            .pipe(debounceTime(0), tap(() => {
            const hideErrors = this.hideErrorMessage$.value;
            const controlErrors = control.errors;
            const componentErrors = controlComponent?.control?.errors;
            const errors = hideErrors || (!controlErrors && !componentErrors)
                ? null
                : control.errors;
            if (controlComponent) {
                controlComponent.control?.setErrors(errors);
                controlComponent.setErrors(errors);
                controlComponent.hideErrorMessage = hideErrors;
            }
            if (hideErrors === false) {
                this.updateControlStatus('dirty', true);
                this.updateControlStatus('touched', true);
            }
        }), takeUntilDestroyed(this._destroyRef))
            .subscribe();
    }
    get _inputType() {
        if (this.data?.inputMask) {
            return 'textMask';
        }
        // Fallback to text input if `type` is not specified.
        if (!this.data?.type) {
            return 'text';
        }
        switch (this.data.type) {
            case 'number':
            case 'text':
                return 'text';
            default:
                return this.data.type;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormControlComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: FormControlComponent, isStandalone: true, selector: "form-control", inputs: { data: "data", control: "control", customComponent: "customComponent" }, host: { listeners: { "focusout": "onFocusOut($event)" }, classAttribute: "form-control" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => FormControlComponent),
                multi: true,
            },
            {
                provide: NG_VALIDATORS,
                useExisting: forwardRef(() => FormControlComponent),
                multi: true,
            },
        ], viewQueries: [{ propertyName: "inputComponentAnchor", first: true, predicate: ["inputComponentAnchor"], descendants: true, read: ViewContainerRef }], ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <div\n    class=\"input-container\"\n    [ngClass]=\"{\n      disabled: !useCustomLoading && loading,\n      hidden: useCustomLoading && loading\n    }\"\n  >\n    <!-- Input template -->\n    <ng-container\n      [ngTemplateOutlet]=\"customTemplates?.[data.formControlName] ?? null\"\n      [ngTemplateOutletContext]=\"{\n        control,\n        data,\n        hostForm,\n        hideErrorMessage: hideErrorMessage$.value\n      }\"\n    ></ng-container>\n\n    <!-- Input component -->\n    <ng-container #inputComponentAnchor></ng-container>\n  </div>\n\n  <div class=\"loading-container\" [ngClass]=\"{ hidden: !loading }\">\n    <!-- Loading component -->\n    <ng-container *ngComponentOutlet=\"loadingComponent ?? null\"></ng-container>\n\n    <!-- Loading template -->\n    <ng-container [ngTemplateOutlet]=\"loadingTemplate ?? null\"> </ng-container>\n  </div>\n</ng-container>\n", styles: [":host{display:block}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgComponentOutlet, selector: "[ngComponentOutlet]", inputs: ["ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector", "ngComponentOutletContent", "ngComponentOutletNgModule", "ngComponentOutletNgModuleFactory"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }] }); }
}
export { FormControlComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormControlComponent, decorators: [{
            type: Component,
            args: [{ selector: 'form-control', standalone: true, imports: [CommonModule], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => FormControlComponent),
                            multi: true,
                        },
                        {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef(() => FormControlComponent),
                            multi: true,
                        },
                    ], host: {
                        class: 'form-control',
                    }, template: "<ng-container *ngIf=\"data\">\n  <div\n    class=\"input-container\"\n    [ngClass]=\"{\n      disabled: !useCustomLoading && loading,\n      hidden: useCustomLoading && loading\n    }\"\n  >\n    <!-- Input template -->\n    <ng-container\n      [ngTemplateOutlet]=\"customTemplates?.[data.formControlName] ?? null\"\n      [ngTemplateOutletContext]=\"{\n        control,\n        data,\n        hostForm,\n        hideErrorMessage: hideErrorMessage$.value\n      }\"\n    ></ng-container>\n\n    <!-- Input component -->\n    <ng-container #inputComponentAnchor></ng-container>\n  </div>\n\n  <div class=\"loading-container\" [ngClass]=\"{ hidden: !loading }\">\n    <!-- Loading component -->\n    <ng-container *ngComponentOutlet=\"loadingComponent ?? null\"></ng-container>\n\n    <!-- Loading template -->\n    <ng-container [ngTemplateOutlet]=\"loadingTemplate ?? null\"> </ng-container>\n  </div>\n</ng-container>\n", styles: [":host{display:block}\n"] }]
        }], propDecorators: { data: [{
                type: Input
            }], control: [{
                type: Input
            }], customComponent: [{
                type: Input
            }], inputComponentAnchor: [{
                type: ViewChild,
                args: ['inputComponentAnchor', { read: ViewContainerRef }]
            }], onFocusOut: [{
                type: HostListener,
                args: ['focusout', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1jb250cm9sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYi9jb3JlL2NvbXBvbmVudHMvZm9ybS1jb250cm9sL2Zvcm0tY29udHJvbC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9saWIvY29yZS9jb21wb25lbnRzL2Zvcm0tY29udHJvbC9mb3JtLWNvbnRyb2wuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFFTCxpQkFBaUIsRUFDakIsU0FBUyxFQUVULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUlMLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsVUFBVSxFQUNWLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNoRSxPQUFPLEVBR0wsYUFBYSxFQUNiLGlCQUFpQixHQUdsQixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTdFLE9BQU8sRUFDTCxxQkFBcUIsRUFDckIscUJBQXFCLEVBQ3JCLGtCQUFrQixHQUNuQixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDOzs7QUFHL0YsTUFzQmEsb0JBQW9CO0lBdEJqQztRQXlCVSxRQUFHLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDaEMsZ0JBQVcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakMsMkJBQXNCLEdB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LGNBQ1osSUFBSSxXQUNQLENBQUMsWUFBWSxDQUFDLGFBRVo7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUscUJBQXFCLENBQUM7NEJBQ25ELEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSxhQUFhOzRCQUN0QixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxxQkFBcUIsQ0FBQzs0QkFDbkQsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0YsUUFFSzt3QkFDSixLQUFLLEVBQUUsY0FBYztxQkFDdEI7OEJBbUJRLElBQUk7c0JBQVosS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFHTixvQkFBb0I7c0JBRG5CLFNBQVM7dUJBQUMsc0JBQXNCLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7Z0JBSTdELFVBQVU7c0JBRFQsWUFBWTt1QkFBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29tcG9uZW50UmVmLFxuICBEZXN0cm95UmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgVHlwZSxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBmb3J3YXJkUmVmLFxuICBpbmplY3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdGFrZVVudGlsRGVzdHJveWVkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZS9yeGpzLWludGVyb3AnO1xuaW1wb3J0IHtcbiAgQWJzdHJhY3RDb250cm9sLFxuICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgTkdfVkFMSURBVE9SUyxcbiAgTkdfVkFMVUVfQUNDRVNTT1IsXG4gIFZhbGlkYXRpb25FcnJvcnMsXG4gIFZhbGlkYXRvcixcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgZGVib3VuY2VUaW1lLCBmaW5hbGl6ZSwgc3RhcnRXaXRoLCB0YXAgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEZvcm1Db250cm9sQ29uZmlnLCBGb3JtQ29udHJvbFR5cGUsIE9wdGlvbkl0ZW0gfSBmcm9tICcuLi8uLi9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgRm9ybVJlYWR5U3RhdGVTZXJ2aWNlLFxuICBHbG9iYWxWYXJpYWJsZVNlcnZpY2UsXG4gIE9wdGlvbnNEYXRhU2VydmljZSxcbn0gZnJvbSAnLi4vLi4vc2VydmljZXMnO1xuaW1wb3J0IHsgVUlfQkFTSUNfQ09NUE9ORU5UUyB9IGZyb20gJy4uLy4uL3VpLWJhc2ljL3VpLWJhc2ljLWNvbXBvbmVudHMuY29uc3RhbnQnO1xuaW1wb3J0IHsgVWlCYXNpY0lucHV0Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdWktYmFzaWMvdWktYmFzaWMtaW5wdXQvdWktYmFzaWMtaW5wdXQuY29tcG9uZW50JztcbmltcG9ydCB7IEN1c3RvbUNvbnRyb2xDb21wb25lbnQgfSBmcm9tICcuLi9jdXN0b20tY29udHJvbC9jdXN0b20tY29udHJvbC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmb3JtLWNvbnRyb2wnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgdGVtcGxhdGVVcmw6ICcuL2Zvcm0tY29udHJvbC5jb21wb25lbnQuaHRtbCcsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRm9ybUNvbnRyb2xDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRm9ybUNvbnRyb2xDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbiAgc3R5bGVzOiBbJzpob3N0IHsgZGlzcGxheTogYmxvY2sgfSddLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdmb3JtLWNvbnRyb2wnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtQ29udHJvbENvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgVmFsaWRhdG9yXG57XG4gIHByaXZhdGUgX2NkID0gaW5qZWN0KENoYW5nZURldGVjdG9yUmVmKTtcbiAgcHJpdmF0ZSBfZGVzdHJveVJlZiA9IGluamVjdChEZXN0cm95UmVmKTtcbiAgcHJpdmF0ZSBfZ2xvYmFsVmFyaWFibGVTZXJ2aWNlID0gaW5qZWN0KEdsb2JhbFZhcmlhYmxlU2VydmljZSk7XG4gIHByaXZhdGUgX2Zvcm1SZWFkeVN0YXRlU2VydmljZSA9IGluamVjdChGb3JtUmVhZHlTdGF0ZVNlcnZpY2UpO1xuICBwcml2YXRlIF9vcHRpb25zRGF0YVNlcnZpY2UgPSBpbmplY3QoT3B0aW9uc0RhdGFTZXJ2aWNlKTtcblxuICBwcml2YXRlIF91aUNvbXBvbmVudHMgPSB0aGlzLl9nbG9iYWxWYXJpYWJsZVNlcnZpY2UudWlDb21wb25lbnRzO1xuXG4gIHByaXZhdGUgX2NvbnRyb2xDb21wb25lbnQ/OiBDdXN0b21Db250cm9sQ29tcG9uZW50O1xuICBwcml2YXRlIF9wZW5kaW5nVmFsdWU6IGFueSA9IG51bGw7XG5cbiAgcHJpdmF0ZSBfb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcbiAgcHJpdmF0ZSBfb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgQElucHV0KCkgZGF0YT86IEZvcm1Db250cm9sQ29uZmlnO1xuICBASW5wdXQoKSBjb250cm9sPzogQWJzdHJhY3RDb250cm9sO1xuICBASW5wdXQoKSBjdXN0b21Db21wb25lbnQ/OiBUeXBlPEN1c3RvbUNvbnRyb2xDb21wb25lbnQ+O1xuXG4gIEBWaWV3Q2hpbGQoJ2lucHV0Q29tcG9uZW50QW5jaG9yJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pXG4gIGlucHV0Q29tcG9uZW50QW5jaG9yITogVmlld0NvbnRhaW5lclJlZjtcblxuICBASG9zdExpc3RlbmVyKCdmb2N1c291dCcsIFsnJGV2ZW50J10pXG4gIG9uRm9jdXNPdXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGF0YT8udHlwZSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgIC8vIEZvciBzZWxlY3QgY29tcG9uZW50LCB0cmlnZ2VyIHdoZW4gaXQncyBibHVycmVkLlxuICAgICAgLy8gSXQncyBpbXBsZW1lbnRlZCBvbiB0aGUgY29ycmVzcG9uZGluZyBjb21wb25lbnQuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fb25Ub3VjaGVkKCk7XG4gIH1cblxuICBjdXN0b21UZW1wbGF0ZXMgPSB0aGlzLl9nbG9iYWxWYXJpYWJsZVNlcnZpY2UuY3VzdG9tVGVtcGxhdGVzO1xuICBsb2FkaW5nQ29tcG9uZW50ID0gdGhpcy5fZ2xvYmFsVmFyaWFibGVTZXJ2aWNlLmxvYWRpbmdDb21wb25lbnQ7XG4gIGxvYWRpbmdUZW1wbGF0ZSA9IHRoaXMuX2dsb2JhbFZhcmlhYmxlU2VydmljZS5sb2FkaW5nVGVtcGxhdGU7XG5cbiAgbG9hZGluZyA9IGZhbHNlO1xuICB1c2VDdXN0b21Mb2FkaW5nID0gZmFsc2U7XG4gIGhvc3RGb3JtID0gdGhpcy5fZ2xvYmFsVmFyaWFibGVTZXJ2aWNlLnJvb3RGb3JtO1xuICBoaWRlRXJyb3JNZXNzYWdlJCA9IHRoaXMuX2dsb2JhbFZhcmlhYmxlU2VydmljZS5oaWRlRXJyb3JNZXNzYWdlJDtcblxuICB3cml0ZVZhbHVlKG9iajogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fcGVuZGluZ1ZhbHVlID0gb2JqO1xuICAgIHRoaXMuX2NvbnRyb2xDb21wb25lbnQ/LndyaXRlVmFsdWUob2JqKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGU/KGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl9jb250cm9sQ29tcG9uZW50Py5zZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQpO1xuICB9XG5cbiAgdmFsaWRhdGUoY29udHJvbDogQWJzdHJhY3RDb250cm9sPGFueSwgYW55Pik6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fY29udHJvbENvbXBvbmVudD8udmFsaWRhdGUoY29udHJvbCkgPz8gbnVsbDtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMudXNlQ3VzdG9tTG9hZGluZyA9XG4gICAgICBCb29sZWFuKHRoaXMubG9hZGluZ0NvbXBvbmVudCkgfHwgQm9vbGVhbih0aGlzLmxvYWRpbmdUZW1wbGF0ZSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5faW5qZWN0SW5wdXRDb21wb25lbnQoKTtcbiAgICB0aGlzLl9mZXRjaE9wdGlvbnMoKTtcbiAgICB0aGlzLl9lcnJvck1lc3NhZ2VFdmVudCgpO1xuICAgIHRoaXMuX2NkLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuY29udHJvbCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmRhdGEgPSB1bmRlZmluZWQ7XG4gIH1cblxuICB1cGRhdGVDb250cm9sU3RhdHVzKFxuICAgIHN0YXR1czogJ2RpcnR5JyB8ICdwcmlzdGluZScgfCAndG91Y2hlZCcgfCAndW50b3VjaGVkJyxcbiAgICB1cGRhdGVTZWxmID0gZmFsc2UsXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmNvbnRyb2w7XG4gICAgY29uc3QgY29udHJvbENvbXBvbmVudCA9IHRoaXMuX2NvbnRyb2xDb21wb25lbnQ7XG5cbiAgICBjb25zdCBtYXJrQXNEaXJ0eSA9ICgpID0+IHtcbiAgICAgIGNvbnRyb2xDb21wb25lbnQ/LmNvbnRyb2w/Lm1hcmtBc0RpcnR5KCk7XG4gICAgICBjb250cm9sQ29tcG9uZW50Py5tYXJrQXNEaXJ0eSgpO1xuXG4gICAgICBpZiAodXBkYXRlU2VsZikge1xuICAgICAgICBjb250cm9sPy5tYXJrQXNEaXJ0eSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBtYXJrQXNQcmlzdGluZSA9ICgpID0+IHtcbiAgICAgIGNvbnRyb2xDb21wb25lbnQ/LmNvbnRyb2w/Lm1hcmtBc1ByaXN0aW5lKCk7XG4gICAgICBjb250cm9sQ29tcG9uZW50Py5tYXJrQXNQcmlzdGluZSgpO1xuXG4gICAgICBpZiAodXBkYXRlU2VsZikge1xuICAgICAgICBjb250cm9sPy5tYXJrQXNQcmlzdGluZSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBtYXJrQXNUb3VjaGVkID0gKCkgPT4ge1xuICAgICAgY29udHJvbENvbXBvbmVudD8uY29udHJvbD8ubWFya0FzVG91Y2hlZCgpO1xuICAgICAgY29udHJvbENvbXBvbmVudD8ubWFya0FzVG91Y2hlZCgpO1xuXG4gICAgICBpZiAodXBkYXRlU2VsZikge1xuICAgICAgICBjb250cm9sPy5tYXJrQXNUb3VjaGVkKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG1hcmtBc1VudG91Y2hlZCA9ICgpID0+IHtcbiAgICAgIGNvbnRyb2xDb21wb25lbnQ/LmNvbnRyb2w/Lm1hcmtBc1VudG91Y2hlZCgpO1xuICAgICAgY29udHJvbENvbXBvbmVudD8ubWFya0FzVW50b3VjaGVkKCk7XG5cbiAgICAgIGlmICh1cGRhdGVTZWxmKSB7XG4gICAgICAgIGNvbnRyb2w/Lm1hcmtBc1VudG91Y2hlZCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBzd2l0Y2ggKHN0YXR1cykge1xuICAgICAgY2FzZSAnZGlydHknOlxuICAgICAgICBtYXJrQXNEaXJ0eSgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAncHJpc3RpbmUnOlxuICAgICAgICBtYXJrQXNQcmlzdGluZSgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAndG91Y2hlZCc6XG4gICAgICAgIG1hcmtBc1RvdWNoZWQoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ3VudG91Y2hlZCc6XG4gICAgICAgIG1hcmtBc1VudG91Y2hlZCgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBnZXQgc2hvd0Vycm9ycygpOiBib29sZWFuIHtcbiAgICBjb25zdCBjb250cm9sVG91Y2hlZCA9IHRoaXMuY29udHJvbD8udG91Y2hlZCA/PyBmYWxzZTtcbiAgICBjb25zdCBjb250cm9sRGlydHkgPSB0aGlzLmNvbnRyb2w/LmRpcnR5ID8/IGZhbHNlO1xuICAgIGNvbnN0IGhhc0Vycm9ycyA9ICEhdGhpcy5jb250cm9sPy5lcnJvcnM7XG5cbiAgICBpZiAodGhpcy5oaWRlRXJyb3JNZXNzYWdlJCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiAoY29udHJvbERpcnR5IHx8IGNvbnRyb2xUb3VjaGVkKSAmJiBoYXNFcnJvcnM7XG4gIH1cblxuICBwcml2YXRlIF9pbmplY3RDb21wb25lbnQ8VD4oXG4gICAgdmNyPzogVmlld0NvbnRhaW5lclJlZixcbiAgICBjb21wb25lbnQ/OiBUeXBlPFQ+LFxuICApOiBDb21wb25lbnRSZWY8VD4gfCBudWxsIHtcbiAgICBpZiAoIXZjciB8fCAhY29tcG9uZW50KSByZXR1cm4gbnVsbDtcblxuICAgIHZjci5jbGVhcigpO1xuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHZjci5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50KTtcbiAgICByZXR1cm4gY29tcG9uZW50UmVmO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5qZWN0SW5wdXRDb21wb25lbnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY3VzdG9tVGVtcGxhdGVzPy5bdGhpcy5kYXRhPy5mb3JtQ29udHJvbE5hbWUgPz8gJyddKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaW5wdXRDb21wb25lbnQgPVxuICAgICAgdGhpcy5jdXN0b21Db21wb25lbnQgfHxcbiAgICAgIHRoaXMuX3VpQ29tcG9uZW50cz8uW3RoaXMuX2lucHV0VHlwZV0gfHxcbiAgICAgIFVJX0JBU0lDX0NPTVBPTkVOVFNbdGhpcy5faW5wdXRUeXBlXSB8fFxuICAgICAgVWlCYXNpY0lucHV0Q29tcG9uZW50O1xuXG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gdGhpcy5faW5qZWN0Q29tcG9uZW50KFxuICAgICAgdGhpcy5pbnB1dENvbXBvbmVudEFuY2hvcixcbiAgICAgIGlucHV0Q29tcG9uZW50LFxuICAgICk7XG5cbiAgICBpZiAoIWNvbXBvbmVudFJlZikgcmV0dXJuO1xuXG4gICAgY29tcG9uZW50UmVmLmluc3RhbmNlLmRhdGEgPSB0aGlzLmRhdGE7XG4gICAgY29tcG9uZW50UmVmLmluc3RhbmNlLmhvc3RGb3JtID0gdGhpcy5fZ2xvYmFsVmFyaWFibGVTZXJ2aWNlLnJvb3RGb3JtO1xuICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZS53cml0ZVZhbHVlKHRoaXMuX3BlbmRpbmdWYWx1ZSk7XG4gICAgY29tcG9uZW50UmVmLmluc3RhbmNlLnJlZ2lzdGVyT25DaGFuZ2UodGhpcy5fb25DaGFuZ2UpO1xuICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZS5yZWdpc3Rlck9uVG91Y2hlZCh0aGlzLl9vblRvdWNoZWQpO1xuXG4gICAgdGhpcy5fY29udHJvbENvbXBvbmVudCA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZldGNoT3B0aW9ucygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZGF0YSB8fCAhdGhpcy5kYXRhLm9wdGlvbnMpIHtcbiAgICAgIHRoaXMuX3BlbmRpbmdWYWx1ZSA9IG51bGw7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qge1xuICAgICAgc3JjLFxuICAgICAgc3JjQXBwZW5kUG9zaXRpb24sXG4gICAgICBhdXRvU2VsZWN0Rmlyc3QsXG4gICAgICBkYXRhOiBzdGF0aWNPcHRpb25zID0gW10sXG4gICAgfSA9IHRoaXMuZGF0YS5vcHRpb25zO1xuXG4gICAgY29uc3QgdXBkYXRlQ29udHJvbFZhbHVlID0gKHZhbHVlOiBhbnkpID0+IHtcbiAgICAgIHRoaXMuY29udHJvbD8uc2V0VmFsdWUodmFsdWUpO1xuICAgICAgdGhpcy5fY29udHJvbENvbXBvbmVudD8ud3JpdGVWYWx1ZSh2YWx1ZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IHNlbGVjdEZpcnN0ID0gKG9wdGlvbnM6IE9wdGlvbkl0ZW1bXSkgPT4ge1xuICAgICAgaWYgKCFhdXRvU2VsZWN0Rmlyc3QgfHwgIW9wdGlvbnMubGVuZ3RoKSByZXR1cm47XG4gICAgICB1cGRhdGVDb250cm9sVmFsdWUob3B0aW9uc1swXS52YWx1ZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IHNldExvYWRpbmcgPSAodmFsOiBib29sZWFuKSA9PiB7XG4gICAgICB0aGlzLmxvYWRpbmcgPSB2YWw7XG4gICAgICB0aGlzLl9mb3JtUmVhZHlTdGF0ZVNlcnZpY2Uub3B0aW9uc0xvYWRpbmcodmFsKTtcbiAgICB9O1xuXG4gICAgaWYgKCFzcmMpIHtcbiAgICAgIHNlbGVjdEZpcnN0KHN0YXRpY09wdGlvbnMpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNvdXJjZSQgPVxuICAgICAgdHlwZW9mIHNyYyA9PT0gJ3N0cmluZydcbiAgICAgICAgPyB0aGlzLl9nbG9iYWxWYXJpYWJsZVNlcnZpY2Uub3B0aW9uc1NvdXJjZXM/LltzcmNdXG4gICAgICAgIDogdGhpcy5fb3B0aW9uc0RhdGFTZXJ2aWNlLmdldE9wdGlvbnMkKHNyYywgKCkgPT4ge1xuICAgICAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgICAgICAgIHVwZGF0ZUNvbnRyb2xWYWx1ZShudWxsKTtcbiAgICAgICAgICB9KTtcblxuICAgIHNldExvYWRpbmcodHJ1ZSk7XG5cbiAgICBzb3VyY2UkXG4gICAgICA/LnBpcGUoXG4gICAgICAgIHRhcCgoeCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPVxuICAgICAgICAgICAgc3JjQXBwZW5kUG9zaXRpb24gPT09ICdiZWZvcmUnXG4gICAgICAgICAgICAgID8geC5jb25jYXQoc3RhdGljT3B0aW9ucylcbiAgICAgICAgICAgICAgOiBzdGF0aWNPcHRpb25zLmNvbmNhdCh4KTtcblxuICAgICAgICAgIGlmICh0aGlzLl9wZW5kaW5nVmFsdWUpIHtcbiAgICAgICAgICAgIHVwZGF0ZUNvbnRyb2xWYWx1ZSh0aGlzLl9wZW5kaW5nVmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5fcGVuZGluZ1ZhbHVlID0gbnVsbDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZWN0Rmlyc3Qob3B0aW9ucyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgdGhpcy5fY29udHJvbENvbXBvbmVudD8ub25PcHRpb25zR2V0KG9wdGlvbnMpO1xuICAgICAgICB9KSxcbiAgICAgICAgZmluYWxpemUoKCkgPT4gc2V0TG9hZGluZyhmYWxzZSkpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZXJyb3JNZXNzYWdlRXZlbnQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNvbnRyb2wpIHJldHVybjtcblxuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmNvbnRyb2w7XG4gICAgY29uc3QgY29udHJvbENvbXBvbmVudCA9IHRoaXMuX2NvbnRyb2xDb21wb25lbnQ7XG5cbiAgICBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMuaGlkZUVycm9yTWVzc2FnZSQsXG4gICAgICBjb250cm9sLnN0YXR1c0NoYW5nZXMucGlwZShzdGFydFdpdGgoY29udHJvbC5zdGF0dXMpKSxcbiAgICBdKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGRlYm91bmNlVGltZSgwKSxcbiAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICBjb25zdCBoaWRlRXJyb3JzID0gdGhpcy5oaWRlRXJyb3JNZXNzYWdlJC52YWx1ZTtcbiAgICAgICAgICBjb25zdCBjb250cm9sRXJyb3JzID0gY29udHJvbC5lcnJvcnM7XG4gICAgICAgICAgY29uc3QgY29tcG9uZW50RXJyb3JzID0gY29udHJvbENvbXBvbmVudD8uY29udHJvbD8uZXJyb3JzO1xuICAgICAgICAgIGNvbnN0IGVycm9ycyA9XG4gICAgICAgICAgICBoaWRlRXJyb3JzIHx8ICghY29udHJvbEVycm9ycyAmJiAhY29tcG9uZW50RXJyb3JzKVxuICAgICAgICAgICAgICA/IG51bGxcbiAgICAgICAgICAgICAgOiBjb250cm9sLmVycm9ycztcblxuICAgICAgICAgIGlmIChjb250cm9sQ29tcG9uZW50KSB7XG4gICAgICAgICAgICBjb250cm9sQ29tcG9uZW50LmNvbnRyb2w/LnNldEVycm9ycyhlcnJvcnMpO1xuICAgICAgICAgICAgY29udHJvbENvbXBvbmVudC5zZXRFcnJvcnMoZXJyb3JzKTtcbiAgICAgICAgICAgIGNvbnRyb2xDb21wb25lbnQuaGlkZUVycm9yTWVzc2FnZSA9IGhpZGVFcnJvcnM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGhpZGVFcnJvcnMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbnRyb2xTdGF0dXMoJ2RpcnR5JywgdHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbnRyb2xTdGF0dXMoJ3RvdWNoZWQnLCB0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICB0YWtlVW50aWxEZXN0cm95ZWQodGhpcy5fZGVzdHJveVJlZiksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIGdldCBfaW5wdXRUeXBlKCk6IEZvcm1Db250cm9sVHlwZSB7XG4gICAgaWYgKHRoaXMuZGF0YT8uaW5wdXRNYXNrKSB7XG4gICAgICByZXR1cm4gJ3RleHRNYXNrJztcbiAgICB9XG5cbiAgICAvLyBGYWxsYmFjayB0byB0ZXh0IGlucHV0IGlmIGB0eXBlYCBpcyBub3Qgc3BlY2lmaWVkLlxuICAgIGlmICghdGhpcy5kYXRhPy50eXBlKSB7XG4gICAgICByZXR1cm4gJ3RleHQnO1xuICAgIH1cblxuICAgIHN3aXRjaCAodGhpcy5kYXRhLnR5cGUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICd0ZXh0JzpcbiAgICAgICAgcmV0dXJuICd0ZXh0JztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS50eXBlO1xuICAgIH1cbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cImRhdGFcIj5cbiAgPGRpdlxuICAgIGNsYXNzPVwiaW5wdXQtY29udGFpbmVyXCJcbiAgICBbbmdDbGFzc109XCJ7XG4gICAgICBkaXNhYmxlZDogIXVzZUN1c3RvbUxvYWRpbmcgJiYgbG9hZGluZyxcbiAgICAgIGhpZGRlbjogdXNlQ3VzdG9tTG9hZGluZyAmJiBsb2FkaW5nXG4gICAgfVwiXG4gID5cbiAgICA8IS0tIElucHV0IHRlbXBsYXRlIC0tPlxuICAgIDxuZy1jb250YWluZXJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1c3RvbVRlbXBsYXRlcz8uW2RhdGEuZm9ybUNvbnRyb2xOYW1lXSA/PyBudWxsXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XG4gICAgICAgIGNvbnRyb2wsXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGhvc3RGb3JtLFxuICAgICAgICBoaWRlRXJyb3JNZXNzYWdlOiBoaWRlRXJyb3JNZXNzYWdlJC52YWx1ZVxuICAgICAgfVwiXG4gICAgPjwvbmctY29udGFpbmVyPlxuXG4gICAgPCEtLSBJbnB1dCBjb21wb25lbnQgLS0+XG4gICAgPG5nLWNvbnRhaW5lciAjaW5wdXRDb21wb25lbnRBbmNob3I+PC9uZy1jb250YWluZXI+XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJsb2FkaW5nLWNvbnRhaW5lclwiIFtuZ0NsYXNzXT1cInsgaGlkZGVuOiAhbG9hZGluZyB9XCI+XG4gICAgPCEtLSBMb2FkaW5nIGNvbXBvbmVudCAtLT5cbiAgICA8bmctY29udGFpbmVyICpuZ0NvbXBvbmVudE91dGxldD1cImxvYWRpbmdDb21wb25lbnQgPz8gbnVsbFwiPjwvbmctY29udGFpbmVyPlxuXG4gICAgPCEtLSBMb2FkaW5nIHRlbXBsYXRlIC0tPlxuICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwibG9hZGluZ1RlbXBsYXRlID8/IG51bGxcIj4gPC9uZy1jb250YWluZXI+XG4gIDwvZGl2PlxuPC9uZy1jb250YWluZXI+XG4iXX0=