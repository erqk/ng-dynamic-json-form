import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { CustomControlComponent, PropsBindingDirective, providePropsBinding, } from 'ng-dynamic-json-form';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/dropdown";
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
        ], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <p-dropdown\n    [options]=\"data.options?.data\"\n    [formControl]=\"control\"\n    [propsBinding]=\"[\n      {\n        key: 'p-dropdown',\n        props: data.props,\n        omit: ['options']\n      }\n    ]\"\n    (onChange)=\"onChange(control.value)\"\n    (onBlur)=\"onTouched()\"\n  ></p-dropdown>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: DropdownModule }, { kind: "component", type: i3.Dropdown, selector: "p-dropdown", inputs: ["id", "scrollHeight", "filter", "name", "style", "panelStyle", "styleClass", "panelStyleClass", "readonly", "required", "editable", "appendTo", "tabindex", "placeholder", "filterPlaceholder", "filterLocale", "inputId", "dataKey", "filterBy", "filterFields", "autofocus", "resetFilterOnHide", "dropdownIcon", "optionLabel", "optionValue", "optionDisabled", "optionGroupLabel", "optionGroupChildren", "autoDisplayFirst", "group", "showClear", "emptyFilterMessage", "emptyMessage", "lazy", "virtualScroll", "virtualScrollItemSize", "virtualScrollOptions", "overlayOptions", "ariaFilterLabel", "ariaLabel", "ariaLabelledBy", "filterMatchMode", "maxlength", "tooltip", "tooltipPosition", "tooltipPositionStyle", "tooltipStyleClass", "focusOnHover", "selectOnFocus", "autoOptionFocus", "autofocusFilter", "disabled", "itemSize", "autoZIndex", "baseZIndex", "showTransitionOptions", "hideTransitionOptions", "filterValue", "options"], outputs: ["onChange", "onFilter", "onFocus", "onBlur", "onClick", "onShow", "onHide", "onClear", "onLazyLoad"] }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
export { UiPrimengSelectComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktcHJpbWVuZy1zZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGliL3VpLXByaW1lbmcvdWktcHJpbWVuZy1zZWxlY3QvdWktcHJpbWVuZy1zZWxlY3QuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vbGliL3VpLXByaW1lbmcvdWktcHJpbWVuZy1zZWxlY3QvdWktcHJpbWVuZy1zZWxlY3QuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUNMLHNCQUFzQixFQUN0QixxQkFBcUIsRUFDckIsbUJBQW1CLEdBQ3BCLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7QUFFNUQsTUFvQmEsd0JBQXlCLFNBQVEsc0JBQXNCO0lBcEJwRTs7UUFxQlcsWUFBTyxHQUFHLElBQUksa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFOUMsY0FBUyxHQUFHLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUNyQixhQUFRLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFFLENBQUMsQ0FBQztLQVMzQjtJQVBVLGdCQUFnQixDQUFDLEVBQU87UUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVRLGlCQUFpQixDQUFDLEVBQU87UUFDaEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQzsrR0FaVSx3QkFBd0I7bUdBQXhCLHdCQUF3QixnRUFYeEI7WUFDVCxtQkFBbUIsQ0FBQztnQkFDbEI7b0JBQ0UsR0FBRyxFQUFFLFlBQVk7b0JBQ2pCLEtBQUssRUFBRSxRQUFRO2lCQUNoQjthQUNGLENBQUM7U0FDSCxpREMxQkgsd1dBZUEsMkNEREksWUFBWSxrSUFDWixtQkFBbUIseVRBQ25CLGNBQWMsMG5DQUNkLHFCQUFxQjs7U0FhWix3QkFBd0I7NEZBQXhCLHdCQUF3QjtrQkFwQnBDLFNBQVM7K0JBQ0UsbUJBQW1CLGNBQ2pCLElBQUksV0FDUDt3QkFDUCxZQUFZO3dCQUNaLG1CQUFtQjt3QkFDbkIsY0FBYzt3QkFDZCxxQkFBcUI7cUJBQ3RCLGFBQ1U7d0JBQ1QsbUJBQW1CLENBQUM7NEJBQ2xCO2dDQUNFLEdBQUcsRUFBRSxZQUFZO2dDQUNqQixLQUFLLEVBQUUsUUFBUTs2QkFDaEI7eUJBQ0YsQ0FBQztxQkFDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUsIFVudHlwZWRGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIEN1c3RvbUNvbnRyb2xDb21wb25lbnQsXG4gIFByb3BzQmluZGluZ0RpcmVjdGl2ZSxcbiAgcHJvdmlkZVByb3BzQmluZGluZyxcbn0gZnJvbSAnbmctZHluYW1pYy1qc29uLWZvcm0nO1xuaW1wb3J0IHsgRHJvcGRvd24sIERyb3Bkb3duTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9kcm9wZG93bic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3VpLXByaW1lbmctc2VsZWN0JyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIERyb3Bkb3duTW9kdWxlLFxuICAgIFByb3BzQmluZGluZ0RpcmVjdGl2ZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZVByb3BzQmluZGluZyhbXG4gICAgICB7XG4gICAgICAgIGtleTogJ3AtZHJvcGRvd24nLFxuICAgICAgICB0b2tlbjogRHJvcGRvd24sXG4gICAgICB9LFxuICAgIF0pLFxuICBdLFxuICB0ZW1wbGF0ZVVybDogJy4vdWktcHJpbWVuZy1zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZXM6IFtdLFxufSlcbmV4cG9ydCBjbGFzcyBVaVByaW1lbmdTZWxlY3RDb21wb25lbnQgZXh0ZW5kcyBDdXN0b21Db250cm9sQ29tcG9uZW50IHtcbiAgb3ZlcnJpZGUgY29udHJvbCA9IG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woJycpO1xuXG4gIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuICBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xuXG4gIG92ZXJyaWRlIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuICBcbiAgb3ZlcnJpZGUgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgKm5nSWY9XCJkYXRhXCI+XG4gIDxwLWRyb3Bkb3duXG4gICAgW29wdGlvbnNdPVwiZGF0YS5vcHRpb25zPy5kYXRhXCJcbiAgICBbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiXG4gICAgW3Byb3BzQmluZGluZ109XCJbXG4gICAgICB7XG4gICAgICAgIGtleTogJ3AtZHJvcGRvd24nLFxuICAgICAgICBwcm9wczogZGF0YS5wcm9wcyxcbiAgICAgICAgb21pdDogWydvcHRpb25zJ11cbiAgICAgIH1cbiAgICBdXCJcbiAgICAob25DaGFuZ2UpPVwib25DaGFuZ2UoY29udHJvbC52YWx1ZSlcIlxuICAgIChvbkJsdXIpPVwib25Ub3VjaGVkKClcIlxuICA+PC9wLWRyb3Bkb3duPlxuPC9uZy1jb250YWluZXI+XG4iXX0=