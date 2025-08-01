import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { IMaskDirective } from 'angular-imask';
import { CustomControlComponent, ImaskValuePatchDirective, PropsBindingDirective, providePropsBinding, } from 'ng-dynamic-json-form';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/material/input";
import * as i4 from "@angular/material/form-field";
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
        ], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <mat-form-field>\n    <mat-label>{{ data.label }}</mat-label>\n\n    <input\n      matInput\n      type=\"text\"\n      imaskValuePatch\n      [formControl]=\"control\"\n      [imask]=\"data.inputMask\"\n      [propsBinding]=\"[\n        {\n          key: 'mat-input',\n          props: data.props,\n          omit: ['type']\n        },\n        {\n          key: 'imask',\n          props: data.props,\n        }\n      ]\"\n      (complete)=\"onChange(control.value)\"\n    />\n  </mat-form-field>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: i3.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "component", type: i4.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i4.MatLabel, selector: "mat-label" }, { kind: "directive", type: IMaskDirective, selector: "[imask]", inputs: ["imask", "unmask", "imaskElement"], outputs: ["accept", "complete"], exportAs: ["imask"] }, { kind: "directive", type: ImaskValuePatchDirective, selector: "[imaskValuePatch]" }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
export { UiMaterialInputMaskComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktbWF0ZXJpYWwtaW5wdXQtbWFzay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvdWktbWF0ZXJpYWwvdWktbWF0ZXJpYWwtaW5wdXQtbWFzay91aS1tYXRlcmlhbC1pbnB1dC1tYXNrLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL2xpYi91aS1tYXRlcmlhbC91aS1tYXRlcmlhbC1pbnB1dC1tYXNrL3VpLW1hdGVyaWFsLWlucHV0LW1hc2suY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDbkUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQ0wsc0JBQXNCLEVBQ3RCLHdCQUF3QixFQUN4QixxQkFBcUIsRUFDckIsbUJBQW1CLEdBQ3BCLE1BQU0sc0JBQXNCLENBQUM7Ozs7OztBQUU5QixNQTBCYSw0QkFBNkIsU0FBUSxzQkFBc0I7SUExQnhFOztRQTJCVyxZQUFPLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7S0FNeEM7SUFIVSxnQkFBZ0IsQ0FBQyxFQUFPO1FBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7K0dBTlUsNEJBQTRCO21HQUE1Qiw0QkFBNEIscUVBZDVCO1lBQ1QsbUJBQW1CLENBQUM7Z0JBQ2xCO29CQUNFLEdBQUcsRUFBRSxXQUFXO29CQUNoQixLQUFLLEVBQUUsUUFBUTtpQkFDaEI7Z0JBQ0Q7b0JBQ0UsR0FBRyxFQUFFLE9BQU87b0JBQ1osS0FBSyxFQUFFLGNBQWM7aUJBQ3RCO2FBQ0YsQ0FBQztTQUNILGlEQ25DSCx5aUJBeUJBLDJDRFRJLFlBQVksa0lBQ1osbUJBQW1CLHlrQkFDbkIsY0FBYyx1bkJBQ2QsY0FBYyx1SkFDZCx3QkFBd0IsOERBQ3hCLHFCQUFxQjs7U0FpQlosNEJBQTRCOzRGQUE1Qiw0QkFBNEI7a0JBMUJ4QyxTQUFTOytCQUNFLHdCQUF3QixjQUN0QixJQUFJLFdBQ1A7d0JBQ1AsWUFBWTt3QkFDWixtQkFBbUI7d0JBQ25CLGNBQWM7d0JBQ2QsY0FBYzt3QkFDZCx3QkFBd0I7d0JBQ3hCLHFCQUFxQjtxQkFDdEIsYUFFVTt3QkFDVCxtQkFBbUIsQ0FBQzs0QkFDbEI7Z0NBQ0UsR0FBRyxFQUFFLFdBQVc7Z0NBQ2hCLEtBQUssRUFBRSxRQUFROzZCQUNoQjs0QkFDRDtnQ0FDRSxHQUFHLEVBQUUsT0FBTztnQ0FDWixLQUFLLEVBQUUsY0FBYzs2QkFDdEI7eUJBQ0YsQ0FBQztxQkFDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0SW5wdXQsIE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQnO1xuaW1wb3J0IHsgSU1hc2tEaXJlY3RpdmUgfSBmcm9tICdhbmd1bGFyLWltYXNrJztcbmltcG9ydCB7XG4gIEN1c3RvbUNvbnRyb2xDb21wb25lbnQsXG4gIEltYXNrVmFsdWVQYXRjaERpcmVjdGl2ZSxcbiAgUHJvcHNCaW5kaW5nRGlyZWN0aXZlLFxuICBwcm92aWRlUHJvcHNCaW5kaW5nLFxufSBmcm9tICduZy1keW5hbWljLWpzb24tZm9ybSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3VpLW1hdGVyaWFsLWlucHV0LW1hc2snLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgSU1hc2tEaXJlY3RpdmUsXG4gICAgSW1hc2tWYWx1ZVBhdGNoRGlyZWN0aXZlLFxuICAgIFByb3BzQmluZGluZ0RpcmVjdGl2ZSxcbiAgXSxcbiAgdGVtcGxhdGVVcmw6ICcuL3VpLW1hdGVyaWFsLWlucHV0LW1hc2suY29tcG9uZW50Lmh0bWwnLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlUHJvcHNCaW5kaW5nKFtcbiAgICAgIHtcbiAgICAgICAga2V5OiAnbWF0LWlucHV0JyxcbiAgICAgICAgdG9rZW46IE1hdElucHV0LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5OiAnaW1hc2snLFxuICAgICAgICB0b2tlbjogSU1hc2tEaXJlY3RpdmUsXG4gICAgICB9LFxuICAgIF0pLFxuICBdLFxuICBzdHlsZXM6IFtdLFxufSlcbmV4cG9ydCBjbGFzcyBVaU1hdGVyaWFsSW5wdXRNYXNrQ29tcG9uZW50IGV4dGVuZHMgQ3VzdG9tQ29udHJvbENvbXBvbmVudCB7XG4gIG92ZXJyaWRlIGNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woJycpO1xuICBvbkNoYW5nZT86IGFueTtcblxuICBvdmVycmlkZSByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgKm5nSWY9XCJkYXRhXCI+XG4gIDxtYXQtZm9ybS1maWVsZD5cbiAgICA8bWF0LWxhYmVsPnt7IGRhdGEubGFiZWwgfX08L21hdC1sYWJlbD5cblxuICAgIDxpbnB1dFxuICAgICAgbWF0SW5wdXRcbiAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgIGltYXNrVmFsdWVQYXRjaFxuICAgICAgW2Zvcm1Db250cm9sXT1cImNvbnRyb2xcIlxuICAgICAgW2ltYXNrXT1cImRhdGEuaW5wdXRNYXNrXCJcbiAgICAgIFtwcm9wc0JpbmRpbmddPVwiW1xuICAgICAgICB7XG4gICAgICAgICAga2V5OiAnbWF0LWlucHV0JyxcbiAgICAgICAgICBwcm9wczogZGF0YS5wcm9wcyxcbiAgICAgICAgICBvbWl0OiBbJ3R5cGUnXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAga2V5OiAnaW1hc2snLFxuICAgICAgICAgIHByb3BzOiBkYXRhLnByb3BzLFxuICAgICAgICB9XG4gICAgICBdXCJcbiAgICAgIChjb21wbGV0ZSk9XCJvbkNoYW5nZShjb250cm9sLnZhbHVlKVwiXG4gICAgLz5cbiAgPC9tYXQtZm9ybS1maWVsZD5cbjwvbmctY29udGFpbmVyPlxuIl19