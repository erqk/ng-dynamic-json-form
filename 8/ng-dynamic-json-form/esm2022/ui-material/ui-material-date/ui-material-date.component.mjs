import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerInput, MatDatepickerModule, } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CustomControlComponent, PropsBindingDirective, providePropsBinding, } from 'ng-dynamic-json-form';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/material/datepicker";
import * as i4 from "@angular/material/form-field";
import * as i5 from "@angular/material/input";
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
        ], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <mat-form-field>\n    <mat-label>{{ data.label }}</mat-label>\n    <input\n      matInput\n      [matDatepicker]=\"picker\"\n      [formControl]=\"control\"\n      [propsBinding]=\"[\n        {\n          key: 'mat-input',\n          props: data.props,\n          omit: ['matDatepicker']\n        }\n      ]\"\n      (dateInput)=\"onChange(control.value)\"\n    />\n    <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n    <mat-datepicker #picker></mat-datepicker>\n  </mat-form-field>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: MatDatepickerModule }, { kind: "component", type: i3.MatDatepicker, selector: "mat-datepicker", exportAs: ["matDatepicker"] }, { kind: "directive", type: i3.MatDatepickerInput, selector: "input[matDatepicker]", inputs: ["matDatepicker", "min", "max", "matDatepickerFilter"], exportAs: ["matDatepickerInput"] }, { kind: "component", type: i3.MatDatepickerToggle, selector: "mat-datepicker-toggle", inputs: ["for", "tabIndex", "aria-label", "disabled", "disableRipple"], exportAs: ["matDatepickerToggle"] }, { kind: "ngmodule", type: MatFormFieldModule }, { kind: "component", type: i4.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i4.MatLabel, selector: "mat-label" }, { kind: "directive", type: i4.MatSuffix, selector: "[matSuffix], [matIconSuffix], [matTextSuffix]", inputs: ["matTextSuffix"] }, { kind: "ngmodule", type: MatNativeDateModule }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: i5.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
export { UiMaterialDateComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktbWF0ZXJpYWwtZGF0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvdWktbWF0ZXJpYWwvdWktbWF0ZXJpYWwtZGF0ZS91aS1tYXRlcmlhbC1kYXRlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL2xpYi91aS1tYXRlcmlhbC91aS1tYXRlcmlhbC1kYXRlL3VpLW1hdGVyaWFsLWRhdGUuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFDTCxrQkFBa0IsRUFDbEIsbUJBQW1CLEdBQ3BCLE1BQU0sOEJBQThCLENBQUM7QUFDdEMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFDTCxzQkFBc0IsRUFDdEIscUJBQXFCLEVBQ3JCLG1CQUFtQixHQUNwQixNQUFNLHNCQUFzQixDQUFDOzs7Ozs7O0FBRTlCLE1BdUJhLHVCQUF3QixTQUFRLHNCQUFzQjtJQXZCbkU7O1FBd0JXLFlBQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7S0FNaEQ7SUFIVSxnQkFBZ0IsQ0FBQyxFQUFPO1FBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7K0dBTlUsdUJBQXVCO21HQUF2Qix1QkFBdUIsK0RBWHZCO1lBQ1QsbUJBQW1CLENBQUM7Z0JBQ2xCO29CQUNFLEdBQUcsRUFBRSxXQUFXO29CQUNoQixLQUFLLEVBQUUsa0JBQWtCO2lCQUMxQjthQUNGLENBQUM7U0FDSCxpRENuQ0gsc2pCQW9CQSwyQ0RBSSxZQUFZLGtJQUNaLG1CQUFtQix5a0JBQ25CLG1CQUFtQixpZ0JBQ25CLGtCQUFrQiwyYUFDbEIsbUJBQW1CLDhCQUNuQixjQUFjLDJXQUNkLHFCQUFxQjs7U0FhWix1QkFBdUI7NEZBQXZCLHVCQUF1QjtrQkF2Qm5DLFNBQVM7K0JBQ0Usa0JBQWtCLGNBQ2hCLElBQUksV0FDUDt3QkFDUCxZQUFZO3dCQUNaLG1CQUFtQjt3QkFDbkIsbUJBQW1CO3dCQUNuQixrQkFBa0I7d0JBQ2xCLG1CQUFtQjt3QkFDbkIsY0FBYzt3QkFDZCxxQkFBcUI7cUJBQ3RCLGFBQ1U7d0JBQ1QsbUJBQW1CLENBQUM7NEJBQ2xCO2dDQUNFLEdBQUcsRUFBRSxXQUFXO2dDQUNoQixLQUFLLEVBQUUsa0JBQWtCOzZCQUMxQjt5QkFDRixDQUFDO3FCQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXROYXRpdmVEYXRlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge1xuICBNYXREYXRlcGlja2VySW5wdXQsXG4gIE1hdERhdGVwaWNrZXJNb2R1bGUsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RhdGVwaWNrZXInO1xuaW1wb3J0IHsgTWF0Rm9ybUZpZWxkTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2lucHV0JztcbmltcG9ydCB7XG4gIEN1c3RvbUNvbnRyb2xDb21wb25lbnQsXG4gIFByb3BzQmluZGluZ0RpcmVjdGl2ZSxcbiAgcHJvdmlkZVByb3BzQmluZGluZyxcbn0gZnJvbSAnbmctZHluYW1pYy1qc29uLWZvcm0nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd1aS1tYXRlcmlhbC1kYXRlJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgUHJvcHNCaW5kaW5nRGlyZWN0aXZlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlUHJvcHNCaW5kaW5nKFtcbiAgICAgIHtcbiAgICAgICAga2V5OiAnbWF0LWlucHV0JyxcbiAgICAgICAgdG9rZW46IE1hdERhdGVwaWNrZXJJbnB1dCxcbiAgICAgIH0sXG4gICAgXSksXG4gIF0sXG4gIHRlbXBsYXRlVXJsOiAnLi91aS1tYXRlcmlhbC1kYXRlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVzOiBbXSxcbn0pXG5leHBvcnQgY2xhc3MgVWlNYXRlcmlhbERhdGVDb21wb25lbnQgZXh0ZW5kcyBDdXN0b21Db250cm9sQ29tcG9uZW50IHtcbiAgb3ZlcnJpZGUgY29udHJvbCA9IG5ldyBGb3JtQ29udHJvbChuZXcgRGF0ZSgpKTtcbiAgb25DaGFuZ2U/OiBhbnk7XG5cbiAgb3ZlcnJpZGUgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwiZGF0YVwiPlxuICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgPG1hdC1sYWJlbD57eyBkYXRhLmxhYmVsIH19PC9tYXQtbGFiZWw+XG4gICAgPGlucHV0XG4gICAgICBtYXRJbnB1dFxuICAgICAgW21hdERhdGVwaWNrZXJdPVwicGlja2VyXCJcbiAgICAgIFtmb3JtQ29udHJvbF09XCJjb250cm9sXCJcbiAgICAgIFtwcm9wc0JpbmRpbmddPVwiW1xuICAgICAgICB7XG4gICAgICAgICAga2V5OiAnbWF0LWlucHV0JyxcbiAgICAgICAgICBwcm9wczogZGF0YS5wcm9wcyxcbiAgICAgICAgICBvbWl0OiBbJ21hdERhdGVwaWNrZXInXVxuICAgICAgICB9XG4gICAgICBdXCJcbiAgICAgIChkYXRlSW5wdXQpPVwib25DaGFuZ2UoY29udHJvbC52YWx1ZSlcIlxuICAgIC8+XG4gICAgPG1hdC1kYXRlcGlja2VyLXRvZ2dsZSBtYXRTdWZmaXggW2Zvcl09XCJwaWNrZXJcIj48L21hdC1kYXRlcGlja2VyLXRvZ2dsZT5cbiAgICA8bWF0LWRhdGVwaWNrZXIgI3BpY2tlcj48L21hdC1kYXRlcGlja2VyPlxuICA8L21hdC1mb3JtLWZpZWxkPlxuPC9uZy1jb250YWluZXI+XG4iXX0=