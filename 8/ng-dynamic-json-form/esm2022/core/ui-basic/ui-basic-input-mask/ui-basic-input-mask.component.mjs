import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IMaskDirective } from 'angular-imask';
import { CustomControlComponent } from '../../components/custom-control/custom-control.component';
import { ImaskValuePatchDirective, PropsBindingDirective, } from '../../directives';
import { providePropsBinding } from '../../providers/props-binding.provider';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
class UiBasicInputMaskComponent extends CustomControlComponent {
    constructor() {
        super(...arguments);
        this.control = new FormControl('');
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiBasicInputMaskComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiBasicInputMaskComponent, isStandalone: true, selector: "ui-basic-input-mask", host: { classAttribute: "ui-basic" }, providers: [
            providePropsBinding([
                {
                    key: 'imask',
                    token: IMaskDirective,
                },
            ]),
        ], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <input\n    type=\"text\"\n    imaskValuePatch\n    [ngClass]=\"{ disabled: control.disabled }\"\n    [imask]=\"data.inputMask\"\n    [propsBinding]=\"[\n      {\n        props: data.props,\n        omit: ['type']\n      },\n      {\n        key: 'imask',\n        props: data.props\n      }\n    ]\"\n    [formControl]=\"control\"\n    (complete)=\"onChange(control.value)\"\n  />\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: IMaskDirective, selector: "[imask]", inputs: ["imask", "unmask", "imaskElement"], outputs: ["accept", "complete"], exportAs: ["imask"] }, { kind: "directive", type: ImaskValuePatchDirective, selector: "[imaskValuePatch]" }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
export { UiBasicInputMaskComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiBasicInputMaskComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-basic-input-mask', standalone: true, imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        IMaskDirective,
                        ImaskValuePatchDirective,
                        PropsBindingDirective,
                    ], providers: [
                        providePropsBinding([
                            {
                                key: 'imask',
                                token: IMaskDirective,
                            },
                        ]),
                    ], host: {
                        class: 'ui-basic',
                    }, template: "<ng-container *ngIf=\"data\">\n  <input\n    type=\"text\"\n    imaskValuePatch\n    [ngClass]=\"{ disabled: control.disabled }\"\n    [imask]=\"data.inputMask\"\n    [propsBinding]=\"[\n      {\n        props: data.props,\n        omit: ['type']\n      },\n      {\n        key: 'imask',\n        props: data.props\n      }\n    ]\"\n    [formControl]=\"control\"\n    (complete)=\"onChange(control.value)\"\n  />\n</ng-container>\n" }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktYmFzaWMtaW5wdXQtbWFzay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWIvY29yZS91aS1iYXNpYy91aS1iYXNpYy1pbnB1dC1tYXNrL3VpLWJhc2ljLWlucHV0LW1hc2suY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbGliL2NvcmUvdWktYmFzaWMvdWktYmFzaWMtaW5wdXQtbWFzay91aS1iYXNpYy1pbnB1dC1tYXNrLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBEQUEwRCxDQUFDO0FBQ2xHLE9BQU8sRUFDTCx3QkFBd0IsRUFDeEIscUJBQXFCLEdBQ3RCLE1BQU0sa0JBQWtCLENBQUM7QUFDMUIsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7Ozs7QUFDN0UsTUF3QmEseUJBQTBCLFNBQVEsc0JBQXNCO0lBeEJyRTs7UUF5QlcsWUFBTyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBT3hDO0lBSFUsZ0JBQWdCLENBQUMsRUFBTztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDOytHQVBVLHlCQUF5QjttR0FBekIseUJBQXlCLHdHQWR6QjtZQUNULG1CQUFtQixDQUFDO2dCQUNsQjtvQkFDRSxHQUFHLEVBQUUsT0FBTztvQkFDWixLQUFLLEVBQUUsY0FBYztpQkFDdEI7YUFDRixDQUFDO1NBQ0gsaURDM0JILG1iQW9CQSwyQ0ROSSxZQUFZLGdPQUNaLG1CQUFtQiwwa0JBQ25CLGNBQWMsdUpBQ2Qsd0JBQXdCLDhEQUN4QixxQkFBcUI7O1NBZ0JaLHlCQUF5Qjs0RkFBekIseUJBQXlCO2tCQXhCckMsU0FBUzsrQkFDRSxxQkFBcUIsY0FDbkIsSUFBSSxXQUNQO3dCQUNQLFlBQVk7d0JBQ1osbUJBQW1CO3dCQUNuQixjQUFjO3dCQUNkLHdCQUF3Qjt3QkFDeEIscUJBQXFCO3FCQUN0QixhQUNVO3dCQUNULG1CQUFtQixDQUFDOzRCQUNsQjtnQ0FDRSxHQUFHLEVBQUUsT0FBTztnQ0FDWixLQUFLLEVBQUUsY0FBYzs2QkFDdEI7eUJBQ0YsQ0FBQztxQkFDSCxRQUdLO3dCQUNKLEtBQUssRUFBRSxVQUFVO3FCQUNsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSU1hc2tEaXJlY3RpdmUgfSBmcm9tICdhbmd1bGFyLWltYXNrJztcbmltcG9ydCB7IEN1c3RvbUNvbnRyb2xDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2N1c3RvbS1jb250cm9sL2N1c3RvbS1jb250cm9sLmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICBJbWFza1ZhbHVlUGF0Y2hEaXJlY3RpdmUsXG4gIFByb3BzQmluZGluZ0RpcmVjdGl2ZSxcbn0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcyc7XG5pbXBvcnQgeyBwcm92aWRlUHJvcHNCaW5kaW5nIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL3Byb3BzLWJpbmRpbmcucHJvdmlkZXInO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndWktYmFzaWMtaW5wdXQtbWFzaycsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBJTWFza0RpcmVjdGl2ZSxcbiAgICBJbWFza1ZhbHVlUGF0Y2hEaXJlY3RpdmUsXG4gICAgUHJvcHNCaW5kaW5nRGlyZWN0aXZlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlUHJvcHNCaW5kaW5nKFtcbiAgICAgIHtcbiAgICAgICAga2V5OiAnaW1hc2snLFxuICAgICAgICB0b2tlbjogSU1hc2tEaXJlY3RpdmUsXG4gICAgICB9LFxuICAgIF0pLFxuICBdLFxuICB0ZW1wbGF0ZVVybDogJy4vdWktYmFzaWMtaW5wdXQtbWFzay5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlczogW10sXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ3VpLWJhc2ljJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgVWlCYXNpY0lucHV0TWFza0NvbXBvbmVudCBleHRlbmRzIEN1c3RvbUNvbnRyb2xDb21wb25lbnQge1xuICBvdmVycmlkZSBjb250cm9sID0gbmV3IEZvcm1Db250cm9sKCcnKTtcblxuICBvbkNoYW5nZT86IGFueTtcblxuICBvdmVycmlkZSByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgKm5nSWY9XCJkYXRhXCI+XG4gIDxpbnB1dFxuICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICBpbWFza1ZhbHVlUGF0Y2hcbiAgICBbbmdDbGFzc109XCJ7IGRpc2FibGVkOiBjb250cm9sLmRpc2FibGVkIH1cIlxuICAgIFtpbWFza109XCJkYXRhLmlucHV0TWFza1wiXG4gICAgW3Byb3BzQmluZGluZ109XCJbXG4gICAgICB7XG4gICAgICAgIHByb3BzOiBkYXRhLnByb3BzLFxuICAgICAgICBvbWl0OiBbJ3R5cGUnXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5OiAnaW1hc2snLFxuICAgICAgICBwcm9wczogZGF0YS5wcm9wc1xuICAgICAgfVxuICAgIF1cIlxuICAgIFtmb3JtQ29udHJvbF09XCJjb250cm9sXCJcbiAgICAoY29tcGxldGUpPVwib25DaGFuZ2UoY29udHJvbC52YWx1ZSlcIlxuICAvPlxuPC9uZy1jb250YWluZXI+XG4iXX0=