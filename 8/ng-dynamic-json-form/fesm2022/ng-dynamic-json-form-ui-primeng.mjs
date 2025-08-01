import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import * as i2 from '@angular/forms';
import { FormControl, ReactiveFormsModule, UntypedFormControl, FormsModule } from '@angular/forms';
import { CustomControlComponent, providePropsBinding, PropsBindingDirective, ImaskValuePatchDirective } from 'ng-dynamic-json-form';
import * as i3 from 'primeng/checkbox';
import { Checkbox, CheckboxModule } from 'primeng/checkbox';
import * as i3$1 from 'primeng/dropdown';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import * as i3$2 from 'primeng/inputtext';
import { InputText, InputTextModule } from 'primeng/inputtext';
import * as i3$3 from 'primeng/radiobutton';
import { RadioButton, RadioButtonModule } from 'primeng/radiobutton';
import * as i3$4 from 'primeng/inputswitch';
import { InputSwitch, InputSwitchModule } from 'primeng/inputswitch';
import * as i3$5 from 'primeng/inputtextarea';
import { InputTextarea, InputTextareaModule } from 'primeng/inputtextarea';
import { IMaskDirective } from 'angular-imask';
import * as i3$6 from 'primeng/slider';
import { Slider, SliderModule } from 'primeng/slider';
import * as i3$7 from 'primeng/calendar';
import { Calendar, CalendarModule } from 'primeng/calendar';

class UiPrimengCheckboxComponent extends CustomControlComponent {
    constructor() {
        super(...arguments);
        this.control = new FormControl('');
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    get groupButtonsStyles() {
        return `
      flex-direction: ${this.data?.options?.layout ?? 'row'};
      align-items: flex-start;
      ${this.data?.options?.containerStyles ?? ''}
    `.replace(/\s{2,}/g, '');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiPrimengCheckboxComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiPrimengCheckboxComponent, isStandalone: true, selector: "ui-primeng-checkbox", providers: [
            providePropsBinding([
                {
                    key: 'p-checkbox',
                    token: Checkbox,
                },
            ]),
        ], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <div\n    class=\"group-buttons\"\n    [style]=\"groupButtonsStyles\"\n    [ngClass]=\"[data.options?.containerClass ?? '']\"\n  >\n    <ng-container *ngFor=\"let item of data.options?.data\">\n      <label\n        class=\"option-button\"\n        [ngStyle]=\"{\n          'justify-content':\n            data.options?.labelPosition === 'before' ? 'space-between' : null\n        }\"\n      >\n        <ng-container\n          *ngTemplateOutlet=\"\n            labelTemplate;\n            context: {\n              label: item.label,\n              isBefore: true\n            }\n          \"\n        ></ng-container>\n\n        <ng-container *ngIf=\"data.options && data.options.data\">\n          <!-- binary checkbox -->\n          <ng-container *ngIf=\"data.options.data.length === 1\">\n            <p-checkbox\n              #pCheckbox\n              [binary]=\"true\"\n              [formControl]=\"control\"\n              [propsBinding]=\"[\n                {\n                  key: 'p-checkbox',\n                  props: data.props,\n                  omit: ['binary']\n                }\n              ]\"\n              (onChange)=\"onChange(control.value)\"\n            ></p-checkbox>\n          </ng-container>\n\n          <!-- multi-select checkbox -->\n          <ng-container *ngIf=\"data.options.data.length > 1\">\n            <p-checkbox\n              [name]=\"'group'\"\n              [value]=\"item.value\"\n              [formControl]=\"control\"\n              [propsBinding]=\"[\n                {\n                  key: 'p-checkbox',\n                  props: data.props,\n                  omit: ['binary']\n                }\n              ]\"\n              (onChange)=\"onChange(control.value)\"\n            ></p-checkbox>\n          </ng-container>\n        </ng-container>\n\n        <ng-container\n          *ngTemplateOutlet=\"\n            labelTemplate;\n            context: {\n              label: item.label,\n              isBefore: false,\n            }\n          \"\n        ></ng-container>\n      </label>\n    </ng-container>\n  </div>\n\n  <ng-template #labelTemplate let-label=\"label\" let-isBefore=\"isBefore\">\n    <ng-container\n      *ngIf=\"(data.options?.labelPosition === 'before') === isBefore\"\n    >\n      <span>{{ label }}</span>\n    </ng-container>\n  </ng-template>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: CheckboxModule }, { kind: "component", type: i3.Checkbox, selector: "p-checkbox", inputs: ["value", "name", "disabled", "binary", "label", "ariaLabelledBy", "ariaLabel", "tabindex", "inputId", "style", "styleClass", "labelStyleClass", "formControl", "checkboxIcon", "readonly", "required", "trueValue", "falseValue"], outputs: ["onChange"] }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiPrimengCheckboxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-primeng-checkbox', standalone: true, encapsulation: ViewEncapsulation.None, imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        CheckboxModule,
                        PropsBindingDirective,
                    ], providers: [
                        providePropsBinding([
                            {
                                key: 'p-checkbox',
                                token: Checkbox,
                            },
                        ]),
                    ], template: "<ng-container *ngIf=\"data\">\n  <div\n    class=\"group-buttons\"\n    [style]=\"groupButtonsStyles\"\n    [ngClass]=\"[data.options?.containerClass ?? '']\"\n  >\n    <ng-container *ngFor=\"let item of data.options?.data\">\n      <label\n        class=\"option-button\"\n        [ngStyle]=\"{\n          'justify-content':\n            data.options?.labelPosition === 'before' ? 'space-between' : null\n        }\"\n      >\n        <ng-container\n          *ngTemplateOutlet=\"\n            labelTemplate;\n            context: {\n              label: item.label,\n              isBefore: true\n            }\n          \"\n        ></ng-container>\n\n        <ng-container *ngIf=\"data.options && data.options.data\">\n          <!-- binary checkbox -->\n          <ng-container *ngIf=\"data.options.data.length === 1\">\n            <p-checkbox\n              #pCheckbox\n              [binary]=\"true\"\n              [formControl]=\"control\"\n              [propsBinding]=\"[\n                {\n                  key: 'p-checkbox',\n                  props: data.props,\n                  omit: ['binary']\n                }\n              ]\"\n              (onChange)=\"onChange(control.value)\"\n            ></p-checkbox>\n          </ng-container>\n\n          <!-- multi-select checkbox -->\n          <ng-container *ngIf=\"data.options.data.length > 1\">\n            <p-checkbox\n              [name]=\"'group'\"\n              [value]=\"item.value\"\n              [formControl]=\"control\"\n              [propsBinding]=\"[\n                {\n                  key: 'p-checkbox',\n                  props: data.props,\n                  omit: ['binary']\n                }\n              ]\"\n              (onChange)=\"onChange(control.value)\"\n            ></p-checkbox>\n          </ng-container>\n        </ng-container>\n\n        <ng-container\n          *ngTemplateOutlet=\"\n            labelTemplate;\n            context: {\n              label: item.label,\n              isBefore: false,\n            }\n          \"\n        ></ng-container>\n      </label>\n    </ng-container>\n  </div>\n\n  <ng-template #labelTemplate let-label=\"label\" let-isBefore=\"isBefore\">\n    <ng-container\n      *ngIf=\"(data.options?.labelPosition === 'before') === isBefore\"\n    >\n      <span>{{ label }}</span>\n    </ng-container>\n  </ng-template>\n</ng-container>\n" }]
        }] });

class UiPrimengSelectComponent extends CustomControlComponent {
    constructor() {
        super(...arguments);
        this.control = new UntypedFormControl('');
        this.onTouched = () => { };
        this.onChange = (_) => { };
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiPrimengSelectComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiPrimengSelectComponent, isStandalone: true, selector: "ui-primeng-select", providers: [
            providePropsBinding([
                {
                    key: 'p-dropdown',
                    token: Dropdown,
                },
            ]),
        ], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <p-dropdown\n    [options]=\"data.options?.data\"\n    [formControl]=\"control\"\n    [propsBinding]=\"[\n      {\n        key: 'p-dropdown',\n        props: data.props,\n        omit: ['options']\n      }\n    ]\"\n    (onChange)=\"onChange(control.value)\"\n    (onBlur)=\"onTouched()\"\n  ></p-dropdown>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: DropdownModule }, { kind: "component", type: i3$1.Dropdown, selector: "p-dropdown", inputs: ["id", "scrollHeight", "filter", "name", "style", "panelStyle", "styleClass", "panelStyleClass", "readonly", "required", "editable", "appendTo", "tabindex", "placeholder", "filterPlaceholder", "filterLocale", "inputId", "dataKey", "filterBy", "filterFields", "autofocus", "resetFilterOnHide", "dropdownIcon", "optionLabel", "optionValue", "optionDisabled", "optionGroupLabel", "optionGroupChildren", "autoDisplayFirst", "group", "showClear", "emptyFilterMessage", "emptyMessage", "lazy", "virtualScroll", "virtualScrollItemSize", "virtualScrollOptions", "overlayOptions", "ariaFilterLabel", "ariaLabel", "ariaLabelledBy", "filterMatchMode", "maxlength", "tooltip", "tooltipPosition", "tooltipPositionStyle", "tooltipStyleClass", "focusOnHover", "selectOnFocus", "autoOptionFocus", "autofocusFilter", "disabled", "itemSize", "autoZIndex", "baseZIndex", "showTransitionOptions", "hideTransitionOptions", "filterValue", "options"], outputs: ["onChange", "onFilter", "onFocus", "onBlur", "onClick", "onShow", "onHide", "onClear", "onLazyLoad"] }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiPrimengSelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-primeng-select', standalone: true, imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        DropdownModule,
                        PropsBindingDirective,
                    ], providers: [
                        providePropsBinding([
                            {
                                key: 'p-dropdown',
                                token: Dropdown,
                            },
                        ]),
                    ], template: "<ng-container *ngIf=\"data\">\n  <p-dropdown\n    [options]=\"data.options?.data\"\n    [formControl]=\"control\"\n    [propsBinding]=\"[\n      {\n        key: 'p-dropdown',\n        props: data.props,\n        omit: ['options']\n      }\n    ]\"\n    (onChange)=\"onChange(control.value)\"\n    (onBlur)=\"onTouched()\"\n  ></p-dropdown>\n</ng-container>\n" }]
        }] });

class UiPrimengInputComponent extends CustomControlComponent {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiPrimengInputComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiPrimengInputComponent, isStandalone: true, selector: "ui-primeng-input", providers: [
            providePropsBinding([
                {
                    key: 'p-input-text',
                    token: InputText,
                },
            ]),
        ], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"control && data\">\n  <input\n    pInputText\n    [type]=\"data.type ?? 'text'\"\n    [formControl]=\"control\"\n    [propsBinding]=\"[\n      {\n        key: 'p-input-text',\n        props: data.props,\n        omit: ['type']\n      }\n    ]\"\n    (input)=\"onInput($event)\"\n  />\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: InputTextModule }, { kind: "directive", type: i3$2.InputText, selector: "[pInputText]" }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiPrimengInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-primeng-input', standalone: true, imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        InputTextModule,
                        PropsBindingDirective,
                    ], providers: [
                        providePropsBinding([
                            {
                                key: 'p-input-text',
                                token: InputText,
                            },
                        ]),
                    ], template: "<ng-container *ngIf=\"control && data\">\n  <input\n    pInputText\n    [type]=\"data.type ?? 'text'\"\n    [formControl]=\"control\"\n    [propsBinding]=\"[\n      {\n        key: 'p-input-text',\n        props: data.props,\n        omit: ['type']\n      }\n    ]\"\n    (input)=\"onInput($event)\"\n  />\n</ng-container>\n" }]
        }] });

class UiPrimengRadioComponent extends CustomControlComponent {
    constructor() {
        super(...arguments);
        this.control = new FormControl(-1);
    }
    writeValue(obj) {
        const index = this.data?.options?.data?.findIndex((x) => JSON.stringify(x.value) === JSON.stringify(obj));
        if (index !== undefined) {
            this.control.setValue(index);
        }
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    updateControl() {
        const index = this.control.value ?? -1;
        if (index > -1) {
            const value = this.data?.options?.data?.[index].value;
            this._onChange(value);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiPrimengRadioComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiPrimengRadioComponent, isStandalone: true, selector: "ui-primeng-radio", providers: [
            providePropsBinding([
                {
                    key: 'p-radio-button',
                    token: RadioButton,
                },
            ]),
        ], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <div\n    class=\"group-buttons\"\n    [style]=\"data.options?.containerStyles\"\n    [ngClass]=\"[data.options?.containerClass ?? '']\"\n    [ngStyle]=\"{\n      'flex-direction': data.options?.layout\n    }\"\n  >\n    <ng-container *ngFor=\"let item of data.options?.data; index as i\">\n      <label\n        class=\"option-button\"\n        [ngStyle]=\"{\n          'justify-content':\n            data.options?.labelPosition === 'before' ? 'space-between' : null\n        }\"\n      >\n        <ng-container\n          *ngTemplateOutlet=\"\n            labelTemplate;\n            context: {\n              label: item.label,\n              isBefore: true\n            }\n          \"\n        ></ng-container>\n\n        <p-radioButton\n          [value]=\"i\"\n          [formControl]=\"control\"\n          [propsBinding]=\"[\n            {\n              key: 'p-radio-button',\n              props: data.props,\n              omit: ['value']\n            }\n          ]\"\n          (onClick)=\"updateControl()\"\n        ></p-radioButton>\n\n        <ng-container\n          *ngTemplateOutlet=\"\n            labelTemplate;\n            context: {\n              label: item.label,\n              isBefore: false\n            }\n          \"\n        ></ng-container>\n      </label>\n    </ng-container>\n  </div>\n\n  <ng-template #labelTemplate let-label=\"label\" let-isBefore=\"isBefore\">\n    <ng-container\n      *ngIf=\"(data.options?.labelPosition === 'before') === isBefore\"\n    >\n      <span>{{ label }}</span>\n    </ng-container>\n  </ng-template>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: RadioButtonModule }, { kind: "component", type: i3$3.RadioButton, selector: "p-radioButton", inputs: ["value", "formControlName", "name", "disabled", "label", "tabindex", "inputId", "ariaLabelledBy", "ariaLabel", "style", "styleClass", "labelStyleClass"], outputs: ["onClick", "onFocus", "onBlur"] }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiPrimengRadioComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-primeng-radio', standalone: true, imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        RadioButtonModule,
                        PropsBindingDirective,
                    ], providers: [
                        providePropsBinding([
                            {
                                key: 'p-radio-button',
                                token: RadioButton,
                            },
                        ]),
                    ], template: "<ng-container *ngIf=\"data\">\n  <div\n    class=\"group-buttons\"\n    [style]=\"data.options?.containerStyles\"\n    [ngClass]=\"[data.options?.containerClass ?? '']\"\n    [ngStyle]=\"{\n      'flex-direction': data.options?.layout\n    }\"\n  >\n    <ng-container *ngFor=\"let item of data.options?.data; index as i\">\n      <label\n        class=\"option-button\"\n        [ngStyle]=\"{\n          'justify-content':\n            data.options?.labelPosition === 'before' ? 'space-between' : null\n        }\"\n      >\n        <ng-container\n          *ngTemplateOutlet=\"\n            labelTemplate;\n            context: {\n              label: item.label,\n              isBefore: true\n            }\n          \"\n        ></ng-container>\n\n        <p-radioButton\n          [value]=\"i\"\n          [formControl]=\"control\"\n          [propsBinding]=\"[\n            {\n              key: 'p-radio-button',\n              props: data.props,\n              omit: ['value']\n            }\n          ]\"\n          (onClick)=\"updateControl()\"\n        ></p-radioButton>\n\n        <ng-container\n          *ngTemplateOutlet=\"\n            labelTemplate;\n            context: {\n              label: item.label,\n              isBefore: false\n            }\n          \"\n        ></ng-container>\n      </label>\n    </ng-container>\n  </div>\n\n  <ng-template #labelTemplate let-label=\"label\" let-isBefore=\"isBefore\">\n    <ng-container\n      *ngIf=\"(data.options?.labelPosition === 'before') === isBefore\"\n    >\n      <span>{{ label }}</span>\n    </ng-container>\n  </ng-template>\n</ng-container>\n" }]
        }] });

class UiPrimengSwitchComponent extends CustomControlComponent {
    constructor() {
        super(...arguments);
        this.control = new FormControl(false);
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiPrimengSwitchComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiPrimengSwitchComponent, isStandalone: true, selector: "ui-primeng-switch", providers: [
            providePropsBinding([
                {
                    key: 'p-input-switch',
                    token: InputSwitch,
                },
            ]),
        ], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <div class=\"option-button-wrapper\">\n    <label class=\"option-button\">\n      <ng-container\n        *ngIf=\"data.options?.labelPosition === 'before'\"\n        [ngTemplateOutlet]=\"labelTemplate\"\n      ></ng-container>\n\n      <p-inputSwitch\n        [formControl]=\"control\"\n        [propsBinding]=\"[\n          {\n            key: 'p-input-switch',\n            props: data.props\n          }\n        ]\"\n        (onChange)=\"onChange(control.value)\"\n      ></p-inputSwitch>\n\n      <ng-container\n        *ngIf=\"data.options?.labelPosition !== 'before'\"\n        [ngTemplateOutlet]=\"labelTemplate\"\n      ></ng-container>\n    </label>\n  </div>\n\n  <ng-template #labelTemplate>\n    <span *ngIf=\"data.options?.data?.[0]?.label\">{{\n      data.options?.data?.[0]?.label\n    }}</span>\n  </ng-template>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: InputSwitchModule }, { kind: "component", type: i3$4.InputSwitch, selector: "p-inputSwitch", inputs: ["style", "styleClass", "tabindex", "inputId", "name", "disabled", "readonly", "trueValue", "falseValue", "ariaLabel", "ariaLabelledBy"], outputs: ["onChange"] }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiPrimengSwitchComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-primeng-switch', standalone: true, imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        InputSwitchModule,
                        PropsBindingDirective,
                    ], providers: [
                        providePropsBinding([
                            {
                                key: 'p-input-switch',
                                token: InputSwitch,
                            },
                        ]),
                    ], template: "<ng-container *ngIf=\"data\">\n  <div class=\"option-button-wrapper\">\n    <label class=\"option-button\">\n      <ng-container\n        *ngIf=\"data.options?.labelPosition === 'before'\"\n        [ngTemplateOutlet]=\"labelTemplate\"\n      ></ng-container>\n\n      <p-inputSwitch\n        [formControl]=\"control\"\n        [propsBinding]=\"[\n          {\n            key: 'p-input-switch',\n            props: data.props\n          }\n        ]\"\n        (onChange)=\"onChange(control.value)\"\n      ></p-inputSwitch>\n\n      <ng-container\n        *ngIf=\"data.options?.labelPosition !== 'before'\"\n        [ngTemplateOutlet]=\"labelTemplate\"\n      ></ng-container>\n    </label>\n  </div>\n\n  <ng-template #labelTemplate>\n    <span *ngIf=\"data.options?.data?.[0]?.label\">{{\n      data.options?.data?.[0]?.label\n    }}</span>\n  </ng-template>\n</ng-container>\n" }]
        }] });

class UiPrimengTextareaComponent extends CustomControlComponent {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiPrimengTextareaComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiPrimengTextareaComponent, isStandalone: true, selector: "ui-primeng-textarea", providers: [
            providePropsBinding([
                {
                    key: 'p-input-textarea',
                    token: InputTextarea,
                },
            ]),
        ], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <textarea\n    pInputTextarea\n    [formControl]=\"control\"\n    [propsBinding]=\"[\n      {\n        key: 'p-input-textarea',\n        props: data.props\n      }\n    ]\"\n    (input)=\"onInput($event)\"\n  ></textarea>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: InputTextareaModule }, { kind: "directive", type: i3$5.InputTextarea, selector: "[pInputTextarea]", inputs: ["autoResize"], outputs: ["onResize"] }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiPrimengTextareaComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-primeng-textarea', standalone: true, imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        InputTextareaModule,
                        PropsBindingDirective,
                    ], providers: [
                        providePropsBinding([
                            {
                                key: 'p-input-textarea',
                                token: InputTextarea,
                            },
                        ]),
                    ], template: "<ng-container *ngIf=\"data\">\n  <textarea\n    pInputTextarea\n    [formControl]=\"control\"\n    [propsBinding]=\"[\n      {\n        key: 'p-input-textarea',\n        props: data.props\n      }\n    ]\"\n    (input)=\"onInput($event)\"\n  ></textarea>\n</ng-container>\n" }]
        }] });

class UiPrimengInputMaskComponent extends CustomControlComponent {
    constructor() {
        super(...arguments);
        this.control = new FormControl('');
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiPrimengInputMaskComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiPrimengInputMaskComponent, isStandalone: true, selector: "ui-primeng-input-mask", providers: [
            providePropsBinding([
                {
                    key: 'p-input-text',
                    token: InputText,
                },
                {
                    key: 'imask',
                    token: IMaskDirective,
                },
            ]),
        ], viewQueries: [{ propertyName: "target", first: true, predicate: InputText, descendants: true }], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <input\n    type=\"text\"\n    pInputText\n    imaskValuePatch\n    [formControl]=\"control\"\n    [imask]=\"data.inputMask\"\n    [propsBinding]=\"[\n      {\n        key: 'p-input-text',\n        props: data.props,\n        omit: ['type']\n      },\n      {\n        key: 'imask',\n        props: data.props,\n      }\n    ]\"\n    (complete)=\"onChange(control.value)\"\n  />\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: InputTextModule }, { kind: "directive", type: i3$2.InputText, selector: "[pInputText]" }, { kind: "directive", type: IMaskDirective, selector: "[imask]", inputs: ["imask", "unmask", "imaskElement"], outputs: ["accept", "complete"], exportAs: ["imask"] }, { kind: "directive", type: ImaskValuePatchDirective, selector: "[imaskValuePatch]" }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiPrimengInputMaskComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-primeng-input-mask', standalone: true, imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        InputTextModule,
                        IMaskDirective,
                        ImaskValuePatchDirective,
                        PropsBindingDirective,
                    ], providers: [
                        providePropsBinding([
                            {
                                key: 'p-input-text',
                                token: InputText,
                            },
                            {
                                key: 'imask',
                                token: IMaskDirective,
                            },
                        ]),
                    ], template: "<ng-container *ngIf=\"data\">\n  <input\n    type=\"text\"\n    pInputText\n    imaskValuePatch\n    [formControl]=\"control\"\n    [imask]=\"data.inputMask\"\n    [propsBinding]=\"[\n      {\n        key: 'p-input-text',\n        props: data.props,\n        omit: ['type']\n      },\n      {\n        key: 'imask',\n        props: data.props,\n      }\n    ]\"\n    (complete)=\"onChange(control.value)\"\n  />\n</ng-container>\n" }]
        }], propDecorators: { target: [{
                type: ViewChild,
                args: [InputText]
            }] } });

class UiPrimengRangeComponent extends CustomControlComponent {
    constructor() {
        super(...arguments);
        this._pendingValue = 0;
        this.control = new FormControl(0);
    }
    writeValue(obj) {
        super.writeValue(obj);
        this._pendingValue = obj;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    ngAfterViewInit() {
        this.sliderRef?.updateValue(this._pendingValue);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiPrimengRangeComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiPrimengRangeComponent, isStandalone: true, selector: "ui-primeng-range", providers: [
            providePropsBinding([
                {
                    key: 'p-slider',
                    token: Slider,
                },
            ]),
        ], viewQueries: [{ propertyName: "sliderRef", first: true, predicate: Slider, descendants: true }], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <div class=\"range-input\">\n    <p-slider\n      [formControl]=\"control\"\n      [propsBinding]=\"[\n        {\n          key: 'p-slider',\n          props: data.props\n        }\n      ]\"\n      (onChange)=\"onChange(control.value)\"\n    ></p-slider>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: SliderModule }, { kind: "component", type: i3$6.Slider, selector: "p-slider", inputs: ["animate", "disabled", "min", "max", "orientation", "step", "range", "style", "styleClass", "ariaLabel", "ariaLabelledBy", "tabindex"], outputs: ["onChange", "onSlideEnd"] }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiPrimengRangeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-primeng-range', standalone: true, imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        SliderModule,
                        PropsBindingDirective,
                    ], providers: [
                        providePropsBinding([
                            {
                                key: 'p-slider',
                                token: Slider,
                            },
                        ]),
                    ], template: "<ng-container *ngIf=\"data\">\n  <div class=\"range-input\">\n    <p-slider\n      [formControl]=\"control\"\n      [propsBinding]=\"[\n        {\n          key: 'p-slider',\n          props: data.props\n        }\n      ]\"\n      (onChange)=\"onChange(control.value)\"\n    ></p-slider>\n  </div>\n</ng-container>\n" }]
        }], propDecorators: { sliderRef: [{
                type: ViewChild,
                args: [Slider]
            }] } });

class UiPrimengDateComponent extends CustomControlComponent {
    constructor() {
        super(...arguments);
        this.control = new FormControl(new Date());
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    updateControl() {
        this._onChange(this.control.value);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiPrimengDateComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiPrimengDateComponent, isStandalone: true, selector: "ui-primeng-date", providers: [
            providePropsBinding([
                {
                    key: 'p-calendar',
                    token: Calendar,
                },
            ]),
        ], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <p-calendar\n    [formControl]=\"control\"\n    [propsBinding]=\"[\n      {\n        key: 'p-calendar',\n        props: data.props,\n      }\n    ]\"\n    (onClose)=\"updateControl()\"\n  ></p-calendar>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: CalendarModule }, { kind: "component", type: i3$7.Calendar, selector: "p-calendar", inputs: ["style", "styleClass", "inputStyle", "inputId", "name", "inputStyleClass", "placeholder", "ariaLabelledBy", "ariaLabel", "iconAriaLabel", "disabled", "dateFormat", "multipleSeparator", "rangeSeparator", "inline", "showOtherMonths", "selectOtherMonths", "showIcon", "icon", "appendTo", "readonlyInput", "shortYearCutoff", "monthNavigator", "yearNavigator", "hourFormat", "timeOnly", "stepHour", "stepMinute", "stepSecond", "showSeconds", "required", "showOnFocus", "showWeek", "showClear", "dataType", "selectionMode", "maxDateCount", "showButtonBar", "todayButtonStyleClass", "clearButtonStyleClass", "autoZIndex", "baseZIndex", "panelStyleClass", "panelStyle", "keepInvalid", "hideOnDateTimeSelect", "touchUI", "timeSeparator", "focusTrap", "showTransitionOptions", "hideTransitionOptions", "tabindex", "minDate", "maxDate", "disabledDates", "disabledDays", "yearRange", "showTime", "responsiveOptions", "numberOfMonths", "firstDayOfWeek", "locale", "view", "defaultDate"], outputs: ["onFocus", "onBlur", "onClose", "onSelect", "onClear", "onInput", "onTodayClick", "onClearClick", "onMonthChange", "onYearChange", "onClickOutside", "onShow"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiPrimengDateComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-primeng-date', standalone: true, imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        CalendarModule,
                        FormsModule,
                        PropsBindingDirective,
                    ], providers: [
                        providePropsBinding([
                            {
                                key: 'p-calendar',
                                token: Calendar,
                            },
                        ]),
                    ], template: "<ng-container *ngIf=\"data\">\n  <p-calendar\n    [formControl]=\"control\"\n    [propsBinding]=\"[\n      {\n        key: 'p-calendar',\n        props: data.props,\n      }\n    ]\"\n    (onClose)=\"updateControl()\"\n  ></p-calendar>\n</ng-container>\n" }]
        }] });

const UI_PRIMENG_COMPONENTS = {
    checkbox: UiPrimengCheckboxComponent,
    date: UiPrimengDateComponent,
    password: UiPrimengInputComponent,
    number: UiPrimengInputComponent,
    email: UiPrimengInputComponent,
    radio: UiPrimengRadioComponent,
    range: UiPrimengRangeComponent,
    select: UiPrimengSelectComponent,
    switch: UiPrimengSwitchComponent,
    text: UiPrimengInputComponent,
    textMask: UiPrimengInputMaskComponent,
    textarea: UiPrimengTextareaComponent,
};

/**
 * Generated bundle index. Do not edit.
 */

export { UI_PRIMENG_COMPONENTS };
//# sourceMappingURL=ng-dynamic-json-form-ui-primeng.mjs.map
