import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Component } from '@angular/core';
import * as i2$1 from '@angular/forms';
import { FormArray, FormControl, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import * as i2 from '@angular/material/checkbox';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import * as i3 from '@angular/material/input';
import { MatInputModule, MatInput } from '@angular/material/input';
import { CustomControlComponent, providePropsBinding, PropsBindingDirective, ImaskValuePatchDirective } from 'ng-dynamic-json-form';
import * as i4$1 from '@angular/material/select';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import * as i4 from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as i5 from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { IMaskDirective } from 'angular-imask';
import { MatButtonModule } from '@angular/material/button';
import * as i3$1 from '@angular/material/radio';
import { MatRadioGroup, MatRadioModule } from '@angular/material/radio';
import * as i3$2 from '@angular/material/slider';
import { MatSlider, MatSliderModule } from '@angular/material/slider';
import * as i3$3 from '@angular/material/slide-toggle';
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';
import * as i5$1 from '@angular/cdk/text-field';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import * as i3$4 from '@angular/material/datepicker';
import { MatDatepickerInput, MatDatepickerModule } from '@angular/material/datepicker';

class UiMaterialCheckboxComponent extends CustomControlComponent {
    constructor() {
        super(...arguments);
        this.control = new FormArray([]);
    }
    writeValue(obj) {
        this.control.clear();
        if (Array.isArray(obj)) {
            obj.forEach((x) => this._addItem(x));
        }
        else {
            this._addItem(obj);
        }
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    toggle(e) {
        const checked = e.checked;
        this._onChange(checked);
    }
    onCheckboxChange(e, index) {
        const checked = e.checked;
        const value = this.data?.options?.data
            ?.map((x) => x.value)
            .filter((val, i) => (i === index ? checked : this.isChecked(val)));
        this.control.clear();
        value?.forEach((x) => this._addItem(x));
        this._onChange(this.control.value);
    }
    isChecked(val) {
        return this.control.value.some((x) => JSON.stringify(x) === JSON.stringify(val));
    }
    get groupButtonsStyles() {
        return `
      flex-direction: ${this.data?.options?.layout ?? 'row'};
      align-items: flex-start;
      ${this.data?.options?.containerStyles ?? ''}
    `.replace(/\s{2,}/g, '');
    }
    _addItem(val) {
        const control = new FormControl(val);
        this.control.push(control);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiMaterialCheckboxComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiMaterialCheckboxComponent, isStandalone: true, selector: "ui-material-checkbox", providers: [
            providePropsBinding([
                {
                    key: 'mat-checkbox',
                    token: MatCheckbox,
                },
            ]),
        ], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <div\n    class=\"group-buttons\"\n    [style]=\"groupButtonsStyles\"\n    [ngClass]=\"[data.options?.containerClass ?? '']\"\n  >\n    <!-- binary checkbox -->\n    <ng-container *ngIf=\"data.options && data.options.data?.length === 1\">\n      <mat-checkbox\n        [checked]=\"!control.value.length ? false : control.value[0]\"\n        [disabled]=\"control.disabled\"\n        [labelPosition]=\"data.options.labelPosition ?? 'after'\"\n        [propsBinding]=\"[\n          {\n            key: 'mat-checkbox',\n            props: data.props,\n            omit: ['labelPosition']\n          }\n        ]\"\n        (change)=\"toggle($event)\"\n        >{{ data.options.data?.[0]?.label }}</mat-checkbox\n      >\n    </ng-container>\n\n    <!-- muli-select checkbox -->\n    <ng-container\n      *ngIf=\"data.options && data.options.data && data.options.data.length > 1\"\n    >\n      <ng-container *ngFor=\"let item of data.options.data; index as i\">\n        <mat-checkbox\n          [labelPosition]=\"data.options.labelPosition ?? 'after'\"\n          [checked]=\"isChecked(item.value)\"\n          [disabled]=\"control.disabled\"\n          [propsBinding]=\"[\n            {\n              key: 'mat-checkbox',\n              props: data.props,\n              omit: ['labelPosition', 'checked', 'disabled', 'value']\n            }\n          ]\"\n          (change)=\"onCheckboxChange($event, i)\"\n          >{{ item.label }}</mat-checkbox\n        >\n      </ng-container>\n    </ng-container>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "ngmodule", type: MatCheckboxModule }, { kind: "component", type: i2.MatCheckbox, selector: "mat-checkbox", inputs: ["disableRipple", "color", "tabIndex"], exportAs: ["matCheckbox"] }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiMaterialCheckboxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-material-checkbox', standalone: true, imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        MatCheckboxModule,
                        MatInputModule,
                        PropsBindingDirective,
                    ], providers: [
                        providePropsBinding([
                            {
                                key: 'mat-checkbox',
                                token: MatCheckbox,
                            },
                        ]),
                    ], template: "<ng-container *ngIf=\"data\">\n  <div\n    class=\"group-buttons\"\n    [style]=\"groupButtonsStyles\"\n    [ngClass]=\"[data.options?.containerClass ?? '']\"\n  >\n    <!-- binary checkbox -->\n    <ng-container *ngIf=\"data.options && data.options.data?.length === 1\">\n      <mat-checkbox\n        [checked]=\"!control.value.length ? false : control.value[0]\"\n        [disabled]=\"control.disabled\"\n        [labelPosition]=\"data.options.labelPosition ?? 'after'\"\n        [propsBinding]=\"[\n          {\n            key: 'mat-checkbox',\n            props: data.props,\n            omit: ['labelPosition']\n          }\n        ]\"\n        (change)=\"toggle($event)\"\n        >{{ data.options.data?.[0]?.label }}</mat-checkbox\n      >\n    </ng-container>\n\n    <!-- muli-select checkbox -->\n    <ng-container\n      *ngIf=\"data.options && data.options.data && data.options.data.length > 1\"\n    >\n      <ng-container *ngFor=\"let item of data.options.data; index as i\">\n        <mat-checkbox\n          [labelPosition]=\"data.options.labelPosition ?? 'after'\"\n          [checked]=\"isChecked(item.value)\"\n          [disabled]=\"control.disabled\"\n          [propsBinding]=\"[\n            {\n              key: 'mat-checkbox',\n              props: data.props,\n              omit: ['labelPosition', 'checked', 'disabled', 'value']\n            }\n          ]\"\n          (change)=\"onCheckboxChange($event, i)\"\n          >{{ item.label }}</mat-checkbox\n        >\n      </ng-container>\n    </ng-container>\n  </div>\n</ng-container>\n" }]
        }] });

class UiMaterialSelectComponent extends CustomControlComponent {
    constructor() {
        super(...arguments);
        this.control = new FormControl(-1);
        this.onTouched = () => { };
    }
    writeValue(obj) {
        const index = this.data?.options?.data
            ?.map((x) => x.value)
            .findIndex((x) => JSON.stringify(x) === JSON.stringify(obj)) ?? -1;
        this.control.setValue(index);
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    updateControl() {
        const index = this.control.value ?? -1;
        if (index > -1) {
            const value = this.data?.options?.data?.map((x) => x.value)?.[index];
            this._onChange(value);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiMaterialSelectComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiMaterialSelectComponent, isStandalone: true, selector: "ui-material-select", providers: [
            providePropsBinding([
                {
                    key: 'mat-select',
                    token: MatSelect,
                },
            ]),
        ], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <mat-form-field>\n    <mat-label>{{ data.label }}</mat-label>\n    <mat-select\n      [formControl]=\"control\"\n      [propsBinding]=\"[\n        {\n          key: 'mat-select',\n          props: data.props,\n        }\n      ]\"\n      (openedChange)=\"onTouched()\"\n      (selectionChange)=\"updateControl()\"\n    >\n      <ng-container *ngFor=\"let item of data.options?.data; index as i\">\n        <mat-option [value]=\"i\">{{ item.label }}</mat-option>\n      </ng-container>\n    </mat-select>\n  </mat-form-field>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2$1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: MatSelectModule }, { kind: "component", type: i4.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i4.MatLabel, selector: "mat-label" }, { kind: "component", type: i4$1.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex", "panelWidth", "hideSingleSelectionIndicator"], exportAs: ["matSelect"] }, { kind: "component", type: i5.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiMaterialSelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-material-select', standalone: true, imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        MatSelectModule,
                        PropsBindingDirective,
                    ], providers: [
                        providePropsBinding([
                            {
                                key: 'mat-select',
                                token: MatSelect,
                            },
                        ]),
                    ], template: "<ng-container *ngIf=\"data\">\n  <mat-form-field>\n    <mat-label>{{ data.label }}</mat-label>\n    <mat-select\n      [formControl]=\"control\"\n      [propsBinding]=\"[\n        {\n          key: 'mat-select',\n          props: data.props,\n        }\n      ]\"\n      (openedChange)=\"onTouched()\"\n      (selectionChange)=\"updateControl()\"\n    >\n      <ng-container *ngFor=\"let item of data.options?.data; index as i\">\n        <mat-option [value]=\"i\">{{ item.label }}</mat-option>\n      </ng-container>\n    </mat-select>\n  </mat-form-field>\n</ng-container>\n" }]
        }] });

class UiMaterialInputMaskComponent extends CustomControlComponent {
    constructor() {
        super(...arguments);
        this.control = new FormControl('');
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiMaterialInputMaskComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiMaterialInputMaskComponent, isStandalone: true, selector: "ui-material-input-mask", providers: [
            providePropsBinding([
                {
                    key: 'mat-input',
                    token: MatInput,
                },
                {
                    key: 'imask',
                    token: IMaskDirective,
                },
            ]),
        ], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <mat-form-field>\n    <mat-label>{{ data.label }}</mat-label>\n\n    <input\n      matInput\n      type=\"text\"\n      imaskValuePatch\n      [formControl]=\"control\"\n      [imask]=\"data.inputMask\"\n      [propsBinding]=\"[\n        {\n          key: 'mat-input',\n          props: data.props,\n          omit: ['type']\n        },\n        {\n          key: 'imask',\n          props: data.props,\n        }\n      ]\"\n      (complete)=\"onChange(control.value)\"\n    />\n  </mat-form-field>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2$1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: i3.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "component", type: i4.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i4.MatLabel, selector: "mat-label" }, { kind: "directive", type: IMaskDirective, selector: "[imask]", inputs: ["imask", "unmask", "imaskElement"], outputs: ["accept", "complete"], exportAs: ["imask"] }, { kind: "directive", type: ImaskValuePatchDirective, selector: "[imaskValuePatch]" }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiMaterialInputMaskComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-material-input-mask', standalone: true, imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        MatInputModule,
                        IMaskDirective,
                        ImaskValuePatchDirective,
                        PropsBindingDirective,
                    ], providers: [
                        providePropsBinding([
                            {
                                key: 'mat-input',
                                token: MatInput,
                            },
                            {
                                key: 'imask',
                                token: IMaskDirective,
                            },
                        ]),
                    ], template: "<ng-container *ngIf=\"data\">\n  <mat-form-field>\n    <mat-label>{{ data.label }}</mat-label>\n\n    <input\n      matInput\n      type=\"text\"\n      imaskValuePatch\n      [formControl]=\"control\"\n      [imask]=\"data.inputMask\"\n      [propsBinding]=\"[\n        {\n          key: 'mat-input',\n          props: data.props,\n          omit: ['type']\n        },\n        {\n          key: 'imask',\n          props: data.props,\n        }\n      ]\"\n      (complete)=\"onChange(control.value)\"\n    />\n  </mat-form-field>\n</ng-container>\n" }]
        }] });

class UiMaterialInputComponent extends CustomControlComponent {
    constructor() {
        super(...arguments);
        this.control = new UntypedFormControl('');
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    onInput(e) {
        const value = e.target.value;
        this.control.setValue(value);
        this.onChange(value);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiMaterialInputComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiMaterialInputComponent, isStandalone: true, selector: "ui-material-input", providers: [
            providePropsBinding([
                {
                    key: 'mat-input',
                    token: MatInput,
                },
            ]),
        ], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <mat-form-field>\n    <mat-label>{{ data.label }}</mat-label>\n\n    <input\n      matInput\n      [formControl]=\"control\"\n      [attr.type]=\"data.type ?? 'text'\"\n      [propsBinding]=\"[\n        {\n          key: 'mat-input',\n          props: data.props,\n          omit: ['type']\n        }\n      ]\"\n      (input)=\"onInput($event)\"\n    />\n  </mat-form-field>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2$1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: i3.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "component", type: i4.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i4.MatLabel, selector: "mat-label" }, { kind: "ngmodule", type: MatButtonModule }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiMaterialInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-material-input', standalone: true, imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        MatInputModule,
                        MatButtonModule,
                        PropsBindingDirective,
                    ], providers: [
                        providePropsBinding([
                            {
                                key: 'mat-input',
                                token: MatInput,
                            },
                        ]),
                    ], template: "<ng-container *ngIf=\"data\">\n  <mat-form-field>\n    <mat-label>{{ data.label }}</mat-label>\n\n    <input\n      matInput\n      [formControl]=\"control\"\n      [attr.type]=\"data.type ?? 'text'\"\n      [propsBinding]=\"[\n        {\n          key: 'mat-input',\n          props: data.props,\n          omit: ['type']\n        }\n      ]\"\n      (input)=\"onInput($event)\"\n    />\n  </mat-form-field>\n</ng-container>\n" }]
        }] });

class UiMaterialRadioComponent extends CustomControlComponent {
    constructor() {
        super(...arguments);
        this.control = new UntypedFormControl('');
        this.selectedIndex = -1;
    }
    writeValue(obj) {
        this.selectedIndex =
            this.data?.options?.data
                ?.map((x) => x.value)
                .findIndex((x) => JSON.stringify(x) === JSON.stringify(obj)) ?? -1;
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    onChange(i) {
        const value = this.data?.options?.data?.[i].value;
        this._onChange(value);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiMaterialRadioComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiMaterialRadioComponent, isStandalone: true, selector: "ui-material-radio", providers: [
            providePropsBinding([
                {
                    key: 'mat-radio-group',
                    token: MatRadioGroup,
                },
            ]),
        ], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <mat-radio-group\n    [labelPosition]=\"data.options?.labelPosition ?? 'after'\"\n    [formControl]=\"control\"\n    [propsBinding]=\"[\n      {\n        key: 'mat-radio-group',\n        props: data.props,\n        omit: ['labelPosition']\n      }\n    ]\"\n  >\n    <div\n      class=\"group-buttons\"\n      [style]=\"data.options?.containerStyles\"\n      [ngClass]=\"[data.options?.containerClass ?? '']\"\n      [ngStyle]=\"{\n        'flex-direction': data.options?.layout\n      }\"\n    >\n      <ng-container *ngFor=\"let item of data.options?.data; index as i\">\n        <mat-radio-button\n          [value]=\"i\"\n          [checked]=\"selectedIndex === i\"\n          (change)=\"onChange(i)\"\n          >{{ item.label }}</mat-radio-button\n        >\n      </ng-container>\n    </div>\n  </mat-radio-group>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2$1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: MatRadioModule }, { kind: "directive", type: i3$1.MatRadioGroup, selector: "mat-radio-group", exportAs: ["matRadioGroup"] }, { kind: "component", type: i3$1.MatRadioButton, selector: "mat-radio-button", inputs: ["disableRipple", "tabIndex"], exportAs: ["matRadioButton"] }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiMaterialRadioComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-material-radio', standalone: true, imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        MatRadioModule,
                        MatInputModule,
                        PropsBindingDirective,
                    ], providers: [
                        providePropsBinding([
                            {
                                key: 'mat-radio-group',
                                token: MatRadioGroup,
                            },
                        ]),
                    ], template: "<ng-container *ngIf=\"data\">\n  <mat-radio-group\n    [labelPosition]=\"data.options?.labelPosition ?? 'after'\"\n    [formControl]=\"control\"\n    [propsBinding]=\"[\n      {\n        key: 'mat-radio-group',\n        props: data.props,\n        omit: ['labelPosition']\n      }\n    ]\"\n  >\n    <div\n      class=\"group-buttons\"\n      [style]=\"data.options?.containerStyles\"\n      [ngClass]=\"[data.options?.containerClass ?? '']\"\n      [ngStyle]=\"{\n        'flex-direction': data.options?.layout\n      }\"\n    >\n      <ng-container *ngFor=\"let item of data.options?.data; index as i\">\n        <mat-radio-button\n          [value]=\"i\"\n          [checked]=\"selectedIndex === i\"\n          (change)=\"onChange(i)\"\n          >{{ item.label }}</mat-radio-button\n        >\n      </ng-container>\n    </div>\n  </mat-radio-group>\n</ng-container>\n" }]
        }] });

class UiMaterialRangeComponent extends CustomControlComponent {
    constructor() {
        super(...arguments);
        this.control = new FormControl(0);
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiMaterialRangeComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiMaterialRangeComponent, isStandalone: true, selector: "ui-material-range", providers: [
            providePropsBinding([
                {
                    key: 'mat-slider',
                    token: MatSlider,
                },
            ]),
        ], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <mat-slider\n    [propsBinding]=\"[\n      {\n        key: 'mat-slider',\n        props: data.props\n      }\n    ]\"\n  >\n    <input\n      matSliderThumb\n      [formControl]=\"control\"\n      (input)=\"onChange(control.value)\"\n    />\n  </mat-slider>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2$1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: MatSliderModule }, { kind: "component", type: i3$2.MatSlider, selector: "mat-slider", inputs: ["color", "disableRipple", "disabled", "discrete", "showTickMarks", "min", "max", "step", "displayWith"], exportAs: ["matSlider"] }, { kind: "directive", type: i3$2.MatSliderThumb, selector: "input[matSliderThumb]", inputs: ["value"], outputs: ["valueChange", "dragStart", "dragEnd"], exportAs: ["matSliderThumb"] }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiMaterialRangeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-material-range', standalone: true, imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        MatSliderModule,
                        MatInputModule,
                        PropsBindingDirective,
                    ], providers: [
                        providePropsBinding([
                            {
                                key: 'mat-slider',
                                token: MatSlider,
                            },
                        ]),
                    ], template: "<ng-container *ngIf=\"data\">\n  <mat-slider\n    [propsBinding]=\"[\n      {\n        key: 'mat-slider',\n        props: data.props\n      }\n    ]\"\n  >\n    <input\n      matSliderThumb\n      [formControl]=\"control\"\n      (input)=\"onChange(control.value)\"\n    />\n  </mat-slider>\n</ng-container>\n" }]
        }] });

class UiMaterialSwitchComponent extends CustomControlComponent {
    constructor() {
        super(...arguments);
        this.control = new FormControl(false);
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiMaterialSwitchComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiMaterialSwitchComponent, isStandalone: true, selector: "ui-material-switch", providers: [
            providePropsBinding([
                {
                    key: 'mat-slide-toggle',
                    token: MatSlideToggle,
                },
            ]),
        ], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <mat-slide-toggle\n    [labelPosition]=\"data.options?.labelPosition ?? 'after'\"\n    [formControl]=\"control\"\n    [propsBinding]=\"[\n      {\n        key: 'mat-slide-toggle',\n        props: data.props,\n        omit: ['labelPosition']\n      }\n    ]\"\n    (change)=\"onChange(control.value)\"\n    >{{ data.options?.data?.[0]?.label }}</mat-slide-toggle\n  >\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2$1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: MatSlideToggleModule }, { kind: "component", type: i3$3.MatSlideToggle, selector: "mat-slide-toggle", inputs: ["disabled", "disableRipple", "color", "tabIndex"], exportAs: ["matSlideToggle"] }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiMaterialSwitchComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-material-switch', standalone: true, imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        MatSlideToggleModule,
                        MatInputModule,
                        PropsBindingDirective,
                    ], providers: [
                        providePropsBinding([
                            {
                                key: 'mat-slide-toggle',
                                token: MatSlideToggle,
                            },
                        ]),
                    ], template: "<ng-container *ngIf=\"data\">\n  <mat-slide-toggle\n    [labelPosition]=\"data.options?.labelPosition ?? 'after'\"\n    [formControl]=\"control\"\n    [propsBinding]=\"[\n      {\n        key: 'mat-slide-toggle',\n        props: data.props,\n        omit: ['labelPosition']\n      }\n    ]\"\n    (change)=\"onChange(control.value)\"\n    >{{ data.options?.data?.[0]?.label }}</mat-slide-toggle\n  >\n</ng-container>\n" }]
        }] });

class UiMaterialTextareaComponent extends CustomControlComponent {
    constructor() {
        super(...arguments);
        this.control = new FormControl('');
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    onInput(e) {
        const value = e.target.value;
        this.control.setValue(value);
        this.onChange(value);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiMaterialTextareaComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiMaterialTextareaComponent, isStandalone: true, selector: "ui-material-textarea", providers: [
            providePropsBinding([
                {
                    key: 'cdk-textarea-autosize',
                    token: CdkTextareaAutosize,
                },
                {
                    key: 'mat-input',
                    token: MatInput,
                },
            ]),
        ], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <mat-form-field class=\"example-full-width\">\n    <mat-label>{{ data.label }}</mat-label>\n    <textarea\n      matInput\n      cdkTextareaAutosize\n      [formControl]=\"control\"\n      [propsBinding]=\"[\n        {\n          key: 'mat-input',\n          props: data.props\n        },\n        {\n          key: 'cdk-textarea-autosize',\n          props: data.props\n        }\n      ]\"\n      (input)=\"onInput($event)\"\n    ></textarea>\n  </mat-form-field>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2$1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: i3.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "component", type: i4.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i4.MatLabel, selector: "mat-label" }, { kind: "directive", type: i5$1.CdkTextareaAutosize, selector: "textarea[cdkTextareaAutosize]", inputs: ["cdkAutosizeMinRows", "cdkAutosizeMaxRows", "cdkTextareaAutosize", "placeholder"], exportAs: ["cdkTextareaAutosize"] }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiMaterialTextareaComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-material-textarea', standalone: true, imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        MatInputModule,
                        PropsBindingDirective,
                    ], providers: [
                        providePropsBinding([
                            {
                                key: 'cdk-textarea-autosize',
                                token: CdkTextareaAutosize,
                            },
                            {
                                key: 'mat-input',
                                token: MatInput,
                            },
                        ]),
                    ], template: "<ng-container *ngIf=\"data\">\n  <mat-form-field class=\"example-full-width\">\n    <mat-label>{{ data.label }}</mat-label>\n    <textarea\n      matInput\n      cdkTextareaAutosize\n      [formControl]=\"control\"\n      [propsBinding]=\"[\n        {\n          key: 'mat-input',\n          props: data.props\n        },\n        {\n          key: 'cdk-textarea-autosize',\n          props: data.props\n        }\n      ]\"\n      (input)=\"onInput($event)\"\n    ></textarea>\n  </mat-form-field>\n</ng-container>\n" }]
        }] });

class UiMaterialDateComponent extends CustomControlComponent {
    constructor() {
        super(...arguments);
        this.control = new FormControl(new Date());
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiMaterialDateComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiMaterialDateComponent, isStandalone: true, selector: "ui-material-date", providers: [
            providePropsBinding([
                {
                    key: 'mat-input',
                    token: MatDatepickerInput,
                },
            ]),
        ], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <mat-form-field>\n    <mat-label>{{ data.label }}</mat-label>\n    <input\n      matInput\n      [matDatepicker]=\"picker\"\n      [formControl]=\"control\"\n      [propsBinding]=\"[\n        {\n          key: 'mat-input',\n          props: data.props,\n          omit: ['matDatepicker']\n        }\n      ]\"\n      (dateInput)=\"onChange(control.value)\"\n    />\n    <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n    <mat-datepicker #picker></mat-datepicker>\n  </mat-form-field>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2$1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: MatDatepickerModule }, { kind: "component", type: i3$4.MatDatepicker, selector: "mat-datepicker", exportAs: ["matDatepicker"] }, { kind: "directive", type: i3$4.MatDatepickerInput, selector: "input[matDatepicker]", inputs: ["matDatepicker", "min", "max", "matDatepickerFilter"], exportAs: ["matDatepickerInput"] }, { kind: "component", type: i3$4.MatDatepickerToggle, selector: "mat-datepicker-toggle", inputs: ["for", "tabIndex", "aria-label", "disabled", "disableRipple"], exportAs: ["matDatepickerToggle"] }, { kind: "ngmodule", type: MatFormFieldModule }, { kind: "component", type: i4.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i4.MatLabel, selector: "mat-label" }, { kind: "directive", type: i4.MatSuffix, selector: "[matSuffix], [matIconSuffix], [matTextSuffix]", inputs: ["matTextSuffix"] }, { kind: "ngmodule", type: MatNativeDateModule }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: i3.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiMaterialDateComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-material-date', standalone: true, imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        MatDatepickerModule,
                        MatFormFieldModule,
                        MatNativeDateModule,
                        MatInputModule,
                        PropsBindingDirective,
                    ], providers: [
                        providePropsBinding([
                            {
                                key: 'mat-input',
                                token: MatDatepickerInput,
                            },
                        ]),
                    ], template: "<ng-container *ngIf=\"data\">\n  <mat-form-field>\n    <mat-label>{{ data.label }}</mat-label>\n    <input\n      matInput\n      [matDatepicker]=\"picker\"\n      [formControl]=\"control\"\n      [propsBinding]=\"[\n        {\n          key: 'mat-input',\n          props: data.props,\n          omit: ['matDatepicker']\n        }\n      ]\"\n      (dateInput)=\"onChange(control.value)\"\n    />\n    <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n    <mat-datepicker #picker></mat-datepicker>\n  </mat-form-field>\n</ng-container>\n" }]
        }] });

const UI_MATERIAL_COMPONENTS = {
    checkbox: UiMaterialCheckboxComponent,
    date: UiMaterialDateComponent,
    password: UiMaterialInputComponent,
    number: UiMaterialInputComponent,
    email: UiMaterialInputComponent,
    radio: UiMaterialRadioComponent,
    range: UiMaterialRangeComponent,
    select: UiMaterialSelectComponent,
    switch: UiMaterialSwitchComponent,
    text: UiMaterialInputComponent,
    textMask: UiMaterialInputMaskComponent,
    textarea: UiMaterialTextareaComponent,
};

/**
 * Generated bundle index. Do not edit.
 */

export { UI_MATERIAL_COMPONENTS };
//# sourceMappingURL=ng-dynamic-json-form-ui-material.mjs.map
