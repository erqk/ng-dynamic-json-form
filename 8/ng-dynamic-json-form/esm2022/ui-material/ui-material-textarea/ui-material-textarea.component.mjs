import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { CustomControlComponent, PropsBindingDirective, providePropsBinding, } from 'ng-dynamic-json-form';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/material/input";
import * as i4 from "@angular/material/form-field";
import * as i5 from "@angular/cdk/text-field";
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
        ], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <mat-form-field class=\"example-full-width\">\n    <mat-label>{{ data.label }}</mat-label>\n    <textarea\n      matInput\n      cdkTextareaAutosize\n      [formControl]=\"control\"\n      [propsBinding]=\"[\n        {\n          key: 'mat-input',\n          props: data.props\n        },\n        {\n          key: 'cdk-textarea-autosize',\n          props: data.props\n        }\n      ]\"\n      (input)=\"onInput($event)\"\n    ></textarea>\n  </mat-form-field>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: i3.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "component", type: i4.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i4.MatLabel, selector: "mat-label" }, { kind: "directive", type: i5.CdkTextareaAutosize, selector: "textarea[cdkTextareaAutosize]", inputs: ["cdkAutosizeMinRows", "cdkAutosizeMaxRows", "cdkTextareaAutosize", "placeholder"], exportAs: ["cdkTextareaAutosize"] }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
export { UiMaterialTextareaComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktbWF0ZXJpYWwtdGV4dGFyZWEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGliL3VpLW1hdGVyaWFsL3VpLW1hdGVyaWFsLXRleHRhcmVhL3VpLW1hdGVyaWFsLXRleHRhcmVhLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL2xpYi91aS1tYXRlcmlhbC91aS1tYXRlcmlhbC10ZXh0YXJlYS91aS1tYXRlcmlhbC10ZXh0YXJlYS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNuRSxPQUFPLEVBQ0wsc0JBQXNCLEVBQ3RCLHFCQUFxQixFQUNyQixtQkFBbUIsR0FDcEIsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7OztBQUU5QixNQXdCYSwyQkFBNEIsU0FBUSxzQkFBc0I7SUF4QnZFOztRQXlCVyxZQUFPLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7S0FheEM7SUFWVSxnQkFBZ0IsQ0FBQyxFQUFPO1FBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxPQUFPLENBQUMsQ0FBUTtRQUNkLE1BQU0sS0FBSyxHQUFJLENBQUMsQ0FBQyxNQUEyQixDQUFDLEtBQUssQ0FBQztRQUVuRCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7K0dBYlUsMkJBQTJCO21HQUEzQiwyQkFBMkIsbUVBZjNCO1lBQ1QsbUJBQW1CLENBQUM7Z0JBQ2xCO29CQUNFLEdBQUcsRUFBRSx1QkFBdUI7b0JBQzVCLEtBQUssRUFBRSxtQkFBbUI7aUJBQzNCO2dCQUNEO29CQUNFLEdBQUcsRUFBRSxXQUFXO29CQUNoQixLQUFLLEVBQUUsUUFBUTtpQkFDaEI7YUFDRixDQUFDO1NBQ0gsaURDL0JILHVnQkFxQkEsMkNETkksWUFBWSxrSUFDWixtQkFBbUIseWtCQUNuQixjQUFjLHMxQkFDZCxxQkFBcUI7O1NBaUJaLDJCQUEyQjs0RkFBM0IsMkJBQTJCO2tCQXhCdkMsU0FBUzsrQkFDRSxzQkFBc0IsY0FDcEIsSUFBSSxXQUNQO3dCQUNQLFlBQVk7d0JBQ1osbUJBQW1CO3dCQUNuQixjQUFjO3dCQUNkLHFCQUFxQjtxQkFDdEIsYUFDVTt3QkFDVCxtQkFBbUIsQ0FBQzs0QkFDbEI7Z0NBQ0UsR0FBRyxFQUFFLHVCQUF1QjtnQ0FDNUIsS0FBSyxFQUFFLG1CQUFtQjs2QkFDM0I7NEJBQ0Q7Z0NBQ0UsR0FBRyxFQUFFLFdBQVc7Z0NBQ2hCLEtBQUssRUFBRSxRQUFROzZCQUNoQjt5QkFDRixDQUFDO3FCQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2RrVGV4dGFyZWFBdXRvc2l6ZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXh0LWZpZWxkJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0SW5wdXQsIE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQnO1xuaW1wb3J0IHtcbiAgQ3VzdG9tQ29udHJvbENvbXBvbmVudCxcbiAgUHJvcHNCaW5kaW5nRGlyZWN0aXZlLFxuICBwcm92aWRlUHJvcHNCaW5kaW5nLFxufSBmcm9tICduZy1keW5hbWljLWpzb24tZm9ybSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3VpLW1hdGVyaWFsLXRleHRhcmVhJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIFByb3BzQmluZGluZ0RpcmVjdGl2ZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZVByb3BzQmluZGluZyhbXG4gICAgICB7XG4gICAgICAgIGtleTogJ2Nkay10ZXh0YXJlYS1hdXRvc2l6ZScsXG4gICAgICAgIHRva2VuOiBDZGtUZXh0YXJlYUF1dG9zaXplLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5OiAnbWF0LWlucHV0JyxcbiAgICAgICAgdG9rZW46IE1hdElucHV0LFxuICAgICAgfSxcbiAgICBdKSxcbiAgXSxcbiAgdGVtcGxhdGVVcmw6ICcuL3VpLW1hdGVyaWFsLXRleHRhcmVhLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVzOiBbXSxcbn0pXG5leHBvcnQgY2xhc3MgVWlNYXRlcmlhbFRleHRhcmVhQ29tcG9uZW50IGV4dGVuZHMgQ3VzdG9tQ29udHJvbENvbXBvbmVudCB7XG4gIG92ZXJyaWRlIGNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woJycpO1xuICBvbkNoYW5nZT86IGFueTtcblxuICBvdmVycmlkZSByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICBvbklucHV0KGU6IEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgdmFsdWUgPSAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG5cbiAgICB0aGlzLmNvbnRyb2wuc2V0VmFsdWUodmFsdWUpO1xuICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwiZGF0YVwiPlxuICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJleGFtcGxlLWZ1bGwtd2lkdGhcIj5cbiAgICA8bWF0LWxhYmVsPnt7IGRhdGEubGFiZWwgfX08L21hdC1sYWJlbD5cbiAgICA8dGV4dGFyZWFcbiAgICAgIG1hdElucHV0XG4gICAgICBjZGtUZXh0YXJlYUF1dG9zaXplXG4gICAgICBbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiXG4gICAgICBbcHJvcHNCaW5kaW5nXT1cIltcbiAgICAgICAge1xuICAgICAgICAgIGtleTogJ21hdC1pbnB1dCcsXG4gICAgICAgICAgcHJvcHM6IGRhdGEucHJvcHNcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGtleTogJ2Nkay10ZXh0YXJlYS1hdXRvc2l6ZScsXG4gICAgICAgICAgcHJvcHM6IGRhdGEucHJvcHNcbiAgICAgICAgfVxuICAgICAgXVwiXG4gICAgICAoaW5wdXQpPVwib25JbnB1dCgkZXZlbnQpXCJcbiAgICA+PC90ZXh0YXJlYT5cbiAgPC9tYXQtZm9ybS1maWVsZD5cbjwvbmctY29udGFpbmVyPlxuIl19