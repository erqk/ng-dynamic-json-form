import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CustomControlComponent, PropsBindingDirective, providePropsBinding, } from 'ng-dynamic-json-form';
import { InputTextarea, InputTextareaModule } from 'primeng/inputtextarea';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/inputtextarea";
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
        ], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <textarea\n    pInputTextarea\n    [formControl]=\"control\"\n    [propsBinding]=\"[\n      {\n        key: 'p-input-textarea',\n        props: data.props\n      }\n    ]\"\n    (input)=\"onInput($event)\"\n  ></textarea>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: InputTextareaModule }, { kind: "directive", type: i3.InputTextarea, selector: "[pInputTextarea]", inputs: ["autoResize"], outputs: ["onResize"] }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
export { UiPrimengTextareaComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktcHJpbWVuZy10ZXh0YXJlYS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvdWktcHJpbWVuZy91aS1wcmltZW5nLXRleHRhcmVhL3VpLXByaW1lbmctdGV4dGFyZWEuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vbGliL3VpLXByaW1lbmcvdWktcHJpbWVuZy10ZXh0YXJlYS91aS1wcmltZW5nLXRleHRhcmVhLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQ0wsc0JBQXNCLEVBQ3RCLHFCQUFxQixFQUNyQixtQkFBbUIsR0FDcEIsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsYUFBYSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7O0FBRTNFLE1Bb0JhLDBCQUEyQixTQUFRLHNCQUFzQjtJQXBCdEU7O1FBcUJXLFlBQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQWF4QztJQVZVLGdCQUFnQixDQUFDLEVBQU87UUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELE9BQU8sQ0FBQyxDQUFRO1FBQ2QsTUFBTSxLQUFLLEdBQUksQ0FBQyxDQUFDLE1BQTJCLENBQUMsS0FBSyxDQUFDO1FBRW5ELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkIsQ0FBQzsrR0FiVSwwQkFBMEI7bUdBQTFCLDBCQUEwQixrRUFYMUI7WUFDVCxtQkFBbUIsQ0FBQztnQkFDbEI7b0JBQ0UsR0FBRyxFQUFFLGtCQUFrQjtvQkFDdkIsS0FBSyxFQUFFLGFBQWE7aUJBQ3JCO2FBQ0YsQ0FBQztTQUNILGlEQzFCSCxtUkFhQSwyQ0RDSSxZQUFZLGtJQUNaLG1CQUFtQix5a0JBQ25CLG1CQUFtQiwySkFDbkIscUJBQXFCOztTQWFaLDBCQUEwQjs0RkFBMUIsMEJBQTBCO2tCQXBCdEMsU0FBUzsrQkFDRSxxQkFBcUIsY0FDbkIsSUFBSSxXQUNQO3dCQUNQLFlBQVk7d0JBQ1osbUJBQW1CO3dCQUNuQixtQkFBbUI7d0JBQ25CLHFCQUFxQjtxQkFDdEIsYUFDVTt3QkFDVCxtQkFBbUIsQ0FBQzs0QkFDbEI7Z0NBQ0UsR0FBRyxFQUFFLGtCQUFrQjtnQ0FDdkIsS0FBSyxFQUFFLGFBQWE7NkJBQ3JCO3lCQUNGLENBQUM7cUJBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIEN1c3RvbUNvbnRyb2xDb21wb25lbnQsXG4gIFByb3BzQmluZGluZ0RpcmVjdGl2ZSxcbiAgcHJvdmlkZVByb3BzQmluZGluZyxcbn0gZnJvbSAnbmctZHluYW1pYy1qc29uLWZvcm0nO1xuaW1wb3J0IHsgSW5wdXRUZXh0YXJlYSwgSW5wdXRUZXh0YXJlYU1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvaW5wdXR0ZXh0YXJlYSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3VpLXByaW1lbmctdGV4dGFyZWEnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgSW5wdXRUZXh0YXJlYU1vZHVsZSxcbiAgICBQcm9wc0JpbmRpbmdEaXJlY3RpdmUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVQcm9wc0JpbmRpbmcoW1xuICAgICAge1xuICAgICAgICBrZXk6ICdwLWlucHV0LXRleHRhcmVhJyxcbiAgICAgICAgdG9rZW46IElucHV0VGV4dGFyZWEsXG4gICAgICB9LFxuICAgIF0pLFxuICBdLFxuICB0ZW1wbGF0ZVVybDogJy4vdWktcHJpbWVuZy10ZXh0YXJlYS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlczogW10sXG59KVxuZXhwb3J0IGNsYXNzIFVpUHJpbWVuZ1RleHRhcmVhQ29tcG9uZW50IGV4dGVuZHMgQ3VzdG9tQ29udHJvbENvbXBvbmVudCB7XG4gIG92ZXJyaWRlIGNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woJycpO1xuICBvbkNoYW5nZT86IGFueTtcblxuICBvdmVycmlkZSByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICBvbklucHV0KGU6IEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgdmFsdWUgPSAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG5cbiAgICB0aGlzLmNvbnRyb2wuc2V0VmFsdWUodmFsdWUpO1xuICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwiZGF0YVwiPlxuICA8dGV4dGFyZWFcbiAgICBwSW5wdXRUZXh0YXJlYVxuICAgIFtmb3JtQ29udHJvbF09XCJjb250cm9sXCJcbiAgICBbcHJvcHNCaW5kaW5nXT1cIltcbiAgICAgIHtcbiAgICAgICAga2V5OiAncC1pbnB1dC10ZXh0YXJlYScsXG4gICAgICAgIHByb3BzOiBkYXRhLnByb3BzXG4gICAgICB9XG4gICAgXVwiXG4gICAgKGlucHV0KT1cIm9uSW5wdXQoJGV2ZW50KVwiXG4gID48L3RleHRhcmVhPlxuPC9uZy1jb250YWluZXI+XG4iXX0=