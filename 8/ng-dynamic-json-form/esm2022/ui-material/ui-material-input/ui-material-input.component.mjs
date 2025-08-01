import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';
import { CustomControlComponent, PropsBindingDirective, providePropsBinding, } from 'ng-dynamic-json-form';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/material/input";
import * as i4 from "@angular/material/form-field";
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
        ], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <mat-form-field>\n    <mat-label>{{ data.label }}</mat-label>\n\n    <input\n      matInput\n      [formControl]=\"control\"\n      [attr.type]=\"data.type ?? 'text'\"\n      [propsBinding]=\"[\n        {\n          key: 'mat-input',\n          props: data.props,\n          omit: ['type']\n        }\n      ]\"\n      (input)=\"onInput($event)\"\n    />\n  </mat-form-field>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: i3.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "component", type: i4.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i4.MatLabel, selector: "mat-label" }, { kind: "ngmodule", type: MatButtonModule }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
export { UiMaterialInputComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktbWF0ZXJpYWwtaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGliL3VpLW1hdGVyaWFsL3VpLW1hdGVyaWFsLWlucHV0L3VpLW1hdGVyaWFsLWlucHV0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL2xpYi91aS1tYXRlcmlhbC91aS1tYXRlcmlhbC1pbnB1dC91aS1tYXRlcmlhbC1pbnB1dC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNuRSxPQUFPLEVBQ0wsc0JBQXNCLEVBQ3RCLHFCQUFxQixFQUNyQixtQkFBbUIsR0FDcEIsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7O0FBRTlCLE1BcUJhLHdCQUF5QixTQUFRLHNCQUFzQjtJQXJCcEU7O1FBc0JXLFlBQU8sR0FBRyxJQUFJLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBYS9DO0lBVlUsZ0JBQWdCLENBQUMsRUFBTztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsT0FBTyxDQUFDLENBQVE7UUFDZCxNQUFNLEtBQUssR0FBSSxDQUFDLENBQUMsTUFBMkIsQ0FBQyxLQUFLLENBQUM7UUFFbkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QixDQUFDOytHQWJVLHdCQUF3QjttR0FBeEIsd0JBQXdCLGdFQVh4QjtZQUNULG1CQUFtQixDQUFDO2dCQUNsQjtvQkFDRSxHQUFHLEVBQUUsV0FBVztvQkFDaEIsS0FBSyxFQUFFLFFBQVE7aUJBQ2hCO2FBQ0YsQ0FBQztTQUNILGlEQzVCSCw2YUFtQkEsMkNESkksWUFBWSxrSUFDWixtQkFBbUIseWtCQUNuQixjQUFjLHNuQkFDZCxlQUFlLCtCQUNmLHFCQUFxQjs7U0FhWix3QkFBd0I7NEZBQXhCLHdCQUF3QjtrQkFyQnBDLFNBQVM7K0JBQ0UsbUJBQW1CLGNBQ2pCLElBQUksV0FDUDt3QkFDUCxZQUFZO3dCQUNaLG1CQUFtQjt3QkFDbkIsY0FBYzt3QkFDZCxlQUFlO3dCQUNmLHFCQUFxQjtxQkFDdEIsYUFDVTt3QkFDVCxtQkFBbUIsQ0FBQzs0QkFDbEI7Z0NBQ0UsR0FBRyxFQUFFLFdBQVc7Z0NBQ2hCLEtBQUssRUFBRSxRQUFROzZCQUNoQjt5QkFDRixDQUFDO3FCQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSwgVW50eXBlZEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcbmltcG9ydCB7IE1hdElucHV0LCBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2lucHV0JztcbmltcG9ydCB7XG4gIEN1c3RvbUNvbnRyb2xDb21wb25lbnQsXG4gIFByb3BzQmluZGluZ0RpcmVjdGl2ZSxcbiAgcHJvdmlkZVByb3BzQmluZGluZyxcbn0gZnJvbSAnbmctZHluYW1pYy1qc29uLWZvcm0nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd1aS1tYXRlcmlhbC1pbnB1dCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgUHJvcHNCaW5kaW5nRGlyZWN0aXZlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlUHJvcHNCaW5kaW5nKFtcbiAgICAgIHtcbiAgICAgICAga2V5OiAnbWF0LWlucHV0JyxcbiAgICAgICAgdG9rZW46IE1hdElucHV0LFxuICAgICAgfSxcbiAgICBdKSxcbiAgXSxcbiAgdGVtcGxhdGVVcmw6ICcuL3VpLW1hdGVyaWFsLWlucHV0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVzOiBbXSxcbn0pXG5leHBvcnQgY2xhc3MgVWlNYXRlcmlhbElucHV0Q29tcG9uZW50IGV4dGVuZHMgQ3VzdG9tQ29udHJvbENvbXBvbmVudCB7XG4gIG92ZXJyaWRlIGNvbnRyb2wgPSBuZXcgVW50eXBlZEZvcm1Db250cm9sKCcnKTtcbiAgb25DaGFuZ2U/OiBhbnk7XG5cbiAgb3ZlcnJpZGUgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgb25JbnB1dChlOiBFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHZhbHVlID0gKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuXG4gICAgdGhpcy5jb250cm9sLnNldFZhbHVlKHZhbHVlKTtcbiAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlKTtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cImRhdGFcIj5cbiAgPG1hdC1mb3JtLWZpZWxkPlxuICAgIDxtYXQtbGFiZWw+e3sgZGF0YS5sYWJlbCB9fTwvbWF0LWxhYmVsPlxuXG4gICAgPGlucHV0XG4gICAgICBtYXRJbnB1dFxuICAgICAgW2Zvcm1Db250cm9sXT1cImNvbnRyb2xcIlxuICAgICAgW2F0dHIudHlwZV09XCJkYXRhLnR5cGUgPz8gJ3RleHQnXCJcbiAgICAgIFtwcm9wc0JpbmRpbmddPVwiW1xuICAgICAgICB7XG4gICAgICAgICAga2V5OiAnbWF0LWlucHV0JyxcbiAgICAgICAgICBwcm9wczogZGF0YS5wcm9wcyxcbiAgICAgICAgICBvbWl0OiBbJ3R5cGUnXVxuICAgICAgICB9XG4gICAgICBdXCJcbiAgICAgIChpbnB1dCk9XCJvbklucHV0KCRldmVudClcIlxuICAgIC8+XG4gIDwvbWF0LWZvcm0tZmllbGQ+XG48L25nLWNvbnRhaW5lcj5cbiJdfQ==