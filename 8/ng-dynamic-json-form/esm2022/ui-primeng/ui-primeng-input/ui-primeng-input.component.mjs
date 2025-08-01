import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { CustomControlComponent, PropsBindingDirective, providePropsBinding, } from 'ng-dynamic-json-form';
import { InputText, InputTextModule } from 'primeng/inputtext';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/inputtext";
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
        ], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"control && data\">\n  <input\n    pInputText\n    [type]=\"data.type ?? 'text'\"\n    [formControl]=\"control\"\n    [propsBinding]=\"[\n      {\n        key: 'p-input-text',\n        props: data.props,\n        omit: ['type']\n      }\n    ]\"\n    (input)=\"onInput($event)\"\n  />\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: InputTextModule }, { kind: "directive", type: i3.InputText, selector: "[pInputText]" }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
export { UiPrimengInputComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktcHJpbWVuZy1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvdWktcHJpbWVuZy91aS1wcmltZW5nLWlucHV0L3VpLXByaW1lbmctaW5wdXQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vbGliL3VpLXByaW1lbmcvdWktcHJpbWVuZy1pbnB1dC91aS1wcmltZW5nLWlucHV0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFDTCxzQkFBc0IsRUFDdEIscUJBQXFCLEVBQ3JCLG1CQUFtQixHQUNwQixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7Ozs7O0FBRS9ELE1Bb0JhLHVCQUF3QixTQUFRLHNCQUFzQjtJQXBCbkU7O1FBcUJXLFlBQU8sR0FBRyxJQUFJLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBYS9DO0lBVlUsZ0JBQWdCLENBQUMsRUFBTztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsT0FBTyxDQUFDLENBQVE7UUFDZCxNQUFNLEtBQUssR0FBSSxDQUFDLENBQUMsTUFBMkIsQ0FBQyxLQUFLLENBQUM7UUFFbkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QixDQUFDOytHQWJVLHVCQUF1QjttR0FBdkIsdUJBQXVCLCtEQVh2QjtZQUNULG1CQUFtQixDQUFDO2dCQUNsQjtvQkFDRSxHQUFHLEVBQUUsY0FBYztvQkFDbkIsS0FBSyxFQUFFLFNBQVM7aUJBQ2pCO2FBQ0YsQ0FBQztTQUNILGlEQzFCSCxzVUFlQSwyQ0RESSxZQUFZLGtJQUNaLG1CQUFtQix5a0JBQ25CLGVBQWUsb0dBQ2YscUJBQXFCOztTQWFaLHVCQUF1Qjs0RkFBdkIsdUJBQXVCO2tCQXBCbkMsU0FBUzsrQkFDRSxrQkFBa0IsY0FDaEIsSUFBSSxXQUNQO3dCQUNQLFlBQVk7d0JBQ1osbUJBQW1CO3dCQUNuQixlQUFlO3dCQUNmLHFCQUFxQjtxQkFDdEIsYUFDVTt3QkFDVCxtQkFBbUIsQ0FBQzs0QkFDbEI7Z0NBQ0UsR0FBRyxFQUFFLGNBQWM7Z0NBQ25CLEtBQUssRUFBRSxTQUFTOzZCQUNqQjt5QkFDRixDQUFDO3FCQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSwgVW50eXBlZEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgQ3VzdG9tQ29udHJvbENvbXBvbmVudCxcbiAgUHJvcHNCaW5kaW5nRGlyZWN0aXZlLFxuICBwcm92aWRlUHJvcHNCaW5kaW5nLFxufSBmcm9tICduZy1keW5hbWljLWpzb24tZm9ybSc7XG5pbXBvcnQgeyBJbnB1dFRleHQsIElucHV0VGV4dE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvaW5wdXR0ZXh0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndWktcHJpbWVuZy1pbnB1dCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBJbnB1dFRleHRNb2R1bGUsXG4gICAgUHJvcHNCaW5kaW5nRGlyZWN0aXZlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlUHJvcHNCaW5kaW5nKFtcbiAgICAgIHtcbiAgICAgICAga2V5OiAncC1pbnB1dC10ZXh0JyxcbiAgICAgICAgdG9rZW46IElucHV0VGV4dCxcbiAgICAgIH0sXG4gICAgXSksXG4gIF0sXG4gIHRlbXBsYXRlVXJsOiAnLi91aS1wcmltZW5nLWlucHV0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVzOiBbXSxcbn0pXG5leHBvcnQgY2xhc3MgVWlQcmltZW5nSW5wdXRDb21wb25lbnQgZXh0ZW5kcyBDdXN0b21Db250cm9sQ29tcG9uZW50IHtcbiAgb3ZlcnJpZGUgY29udHJvbCA9IG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woJycpO1xuICBvbkNoYW5nZT86IGFueTtcblxuICBvdmVycmlkZSByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICBvbklucHV0KGU6IEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgdmFsdWUgPSAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG5cbiAgICB0aGlzLmNvbnRyb2wuc2V0VmFsdWUodmFsdWUpO1xuICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwiY29udHJvbCAmJiBkYXRhXCI+XG4gIDxpbnB1dFxuICAgIHBJbnB1dFRleHRcbiAgICBbdHlwZV09XCJkYXRhLnR5cGUgPz8gJ3RleHQnXCJcbiAgICBbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiXG4gICAgW3Byb3BzQmluZGluZ109XCJbXG4gICAgICB7XG4gICAgICAgIGtleTogJ3AtaW5wdXQtdGV4dCcsXG4gICAgICAgIHByb3BzOiBkYXRhLnByb3BzLFxuICAgICAgICBvbWl0OiBbJ3R5cGUnXVxuICAgICAgfVxuICAgIF1cIlxuICAgIChpbnB1dCk9XCJvbklucHV0KCRldmVudClcIlxuICAvPlxuPC9uZy1jb250YWluZXI+XG4iXX0=