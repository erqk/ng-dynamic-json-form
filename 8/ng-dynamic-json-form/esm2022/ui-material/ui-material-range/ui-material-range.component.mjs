import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSlider, MatSliderModule } from '@angular/material/slider';
import { CustomControlComponent, PropsBindingDirective, providePropsBinding, } from 'ng-dynamic-json-form';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/material/slider";
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
        ], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <mat-slider\n    [propsBinding]=\"[\n      {\n        key: 'mat-slider',\n        props: data.props\n      }\n    ]\"\n  >\n    <input\n      matSliderThumb\n      [formControl]=\"control\"\n      (input)=\"onChange(control.value)\"\n    />\n  </mat-slider>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: MatSliderModule }, { kind: "component", type: i3.MatSlider, selector: "mat-slider", inputs: ["color", "disableRipple", "disabled", "discrete", "showTickMarks", "min", "max", "step", "displayWith"], exportAs: ["matSlider"] }, { kind: "directive", type: i3.MatSliderThumb, selector: "input[matSliderThumb]", inputs: ["value"], outputs: ["valueChange", "dragStart", "dragEnd"], exportAs: ["matSliderThumb"] }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
export { UiMaterialRangeComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktbWF0ZXJpYWwtcmFuZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGliL3VpLW1hdGVyaWFsL3VpLW1hdGVyaWFsLXJhbmdlL3VpLW1hdGVyaWFsLXJhbmdlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL2xpYi91aS1tYXRlcmlhbC91aS1tYXRlcmlhbC1yYW5nZS91aS1tYXRlcmlhbC1yYW5nZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdEUsT0FBTyxFQUNMLHNCQUFzQixFQUN0QixxQkFBcUIsRUFDckIsbUJBQW1CLEdBQ3BCLE1BQU0sc0JBQXNCLENBQUM7Ozs7O0FBRTlCLE1BcUJhLHdCQUF5QixTQUFRLHNCQUFzQjtJQXJCcEU7O1FBc0JXLFlBQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQU12QztJQUhVLGdCQUFnQixDQUFDLEVBQU87UUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQzsrR0FOVSx3QkFBd0I7bUdBQXhCLHdCQUF3QixnRUFYeEI7WUFDVCxtQkFBbUIsQ0FBQztnQkFDbEI7b0JBQ0UsR0FBRyxFQUFFLFlBQVk7b0JBQ2pCLEtBQUssRUFBRSxTQUFTO2lCQUNqQjthQUNGLENBQUM7U0FDSCxpREM1QkgsdVRBZ0JBLDJDRERJLFlBQVksa0lBQ1osbUJBQW1CLHlrQkFDbkIsZUFBZSxrYUFDZixjQUFjLCtCQUNkLHFCQUFxQjs7U0FhWix3QkFBd0I7NEZBQXhCLHdCQUF3QjtrQkFyQnBDLFNBQVM7K0JBQ0UsbUJBQW1CLGNBQ2pCLElBQUksV0FDUDt3QkFDUCxZQUFZO3dCQUNaLG1CQUFtQjt3QkFDbkIsZUFBZTt3QkFDZixjQUFjO3dCQUNkLHFCQUFxQjtxQkFDdEIsYUFDVTt3QkFDVCxtQkFBbUIsQ0FBQzs0QkFDbEI7Z0NBQ0UsR0FBRyxFQUFFLFlBQVk7Z0NBQ2pCLEtBQUssRUFBRSxTQUFTOzZCQUNqQjt5QkFDRixDQUFDO3FCQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2lucHV0JztcbmltcG9ydCB7IE1hdFNsaWRlciwgTWF0U2xpZGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2xpZGVyJztcbmltcG9ydCB7XG4gIEN1c3RvbUNvbnRyb2xDb21wb25lbnQsXG4gIFByb3BzQmluZGluZ0RpcmVjdGl2ZSxcbiAgcHJvdmlkZVByb3BzQmluZGluZyxcbn0gZnJvbSAnbmctZHluYW1pYy1qc29uLWZvcm0nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd1aS1tYXRlcmlhbC1yYW5nZScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBNYXRTbGlkZXJNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgUHJvcHNCaW5kaW5nRGlyZWN0aXZlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlUHJvcHNCaW5kaW5nKFtcbiAgICAgIHtcbiAgICAgICAga2V5OiAnbWF0LXNsaWRlcicsXG4gICAgICAgIHRva2VuOiBNYXRTbGlkZXIsXG4gICAgICB9LFxuICAgIF0pLFxuICBdLFxuICB0ZW1wbGF0ZVVybDogJy4vdWktbWF0ZXJpYWwtcmFuZ2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZXM6IFtdLFxufSlcbmV4cG9ydCBjbGFzcyBVaU1hdGVyaWFsUmFuZ2VDb21wb25lbnQgZXh0ZW5kcyBDdXN0b21Db250cm9sQ29tcG9uZW50IHtcbiAgb3ZlcnJpZGUgY29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgwKTtcbiAgb25DaGFuZ2U/OiBhbnk7XG5cbiAgb3ZlcnJpZGUgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwiZGF0YVwiPlxuICA8bWF0LXNsaWRlclxuICAgIFtwcm9wc0JpbmRpbmddPVwiW1xuICAgICAge1xuICAgICAgICBrZXk6ICdtYXQtc2xpZGVyJyxcbiAgICAgICAgcHJvcHM6IGRhdGEucHJvcHNcbiAgICAgIH1cbiAgICBdXCJcbiAgPlxuICAgIDxpbnB1dFxuICAgICAgbWF0U2xpZGVyVGh1bWJcbiAgICAgIFtmb3JtQ29udHJvbF09XCJjb250cm9sXCJcbiAgICAgIChpbnB1dCk9XCJvbkNoYW5nZShjb250cm9sLnZhbHVlKVwiXG4gICAgLz5cbiAgPC9tYXQtc2xpZGVyPlxuPC9uZy1jb250YWluZXI+XG4iXX0=