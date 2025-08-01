import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CustomControlComponent, PropsBindingDirective, providePropsBinding, } from 'ng-dynamic-json-form';
import { Slider, SliderModule } from 'primeng/slider';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/slider";
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
        ], viewQueries: [{ propertyName: "sliderRef", first: true, predicate: Slider, descendants: true }], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <div class=\"range-input\">\n    <p-slider\n      [formControl]=\"control\"\n      [propsBinding]=\"[\n        {\n          key: 'p-slider',\n          props: data.props\n        }\n      ]\"\n      (onChange)=\"onChange(control.value)\"\n    ></p-slider>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: SliderModule }, { kind: "component", type: i3.Slider, selector: "p-slider", inputs: ["animate", "disabled", "min", "max", "orientation", "step", "range", "style", "styleClass", "ariaLabel", "ariaLabelledBy", "tabindex"], outputs: ["onChange", "onSlideEnd"] }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
export { UiPrimengRangeComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktcHJpbWVuZy1yYW5nZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvdWktcHJpbWVuZy91aS1wcmltZW5nLXJhbmdlL3VpLXByaW1lbmctcmFuZ2UuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vbGliL3VpLXByaW1lbmcvdWktcHJpbWVuZy1yYW5nZS91aS1wcmltZW5nLXJhbmdlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQWlCLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFDTCxzQkFBc0IsRUFDdEIscUJBQXFCLEVBQ3JCLG1CQUFtQixHQUNwQixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBRXRELE1Bb0JhLHVCQUNYLFNBQVEsc0JBQXNCO0lBckJoQzs7UUF3QlUsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFFakIsWUFBTyxHQUFHLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBaUJ2QztJQVpVLFVBQVUsQ0FBQyxHQUFRO1FBQzFCLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUM7SUFDM0IsQ0FBQztJQUVRLGdCQUFnQixDQUFDLEVBQU87UUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDbEQsQ0FBQzsrR0F0QlUsdUJBQXVCO21HQUF2Qix1QkFBdUIsK0RBWHZCO1lBQ1QsbUJBQW1CLENBQUM7Z0JBQ2xCO29CQUNFLEdBQUcsRUFBRSxVQUFVO29CQUNmLEtBQUssRUFBRSxNQUFNO2lCQUNkO2FBQ0YsQ0FBQztTQUNILHFFQWFVLE1BQU0sdUVDdkNuQiwrVEFjQSwyQ0RBSSxZQUFZLGtJQUNaLG1CQUFtQix5VEFDbkIsWUFBWSxtUkFDWixxQkFBcUI7O1NBYVosdUJBQXVCOzRGQUF2Qix1QkFBdUI7a0JBcEJuQyxTQUFTOytCQUNFLGtCQUFrQixjQUNoQixJQUFJLFdBQ1A7d0JBQ1AsWUFBWTt3QkFDWixtQkFBbUI7d0JBQ25CLFlBQVk7d0JBQ1oscUJBQXFCO3FCQUN0QixhQUNVO3dCQUNULG1CQUFtQixDQUFDOzRCQUNsQjtnQ0FDRSxHQUFHLEVBQUUsVUFBVTtnQ0FDZixLQUFLLEVBQUUsTUFBTTs2QkFDZDt5QkFDRixDQUFDO3FCQUNIOzhCQWFrQixTQUFTO3NCQUEzQixTQUFTO3VCQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgQ3VzdG9tQ29udHJvbENvbXBvbmVudCxcbiAgUHJvcHNCaW5kaW5nRGlyZWN0aXZlLFxuICBwcm92aWRlUHJvcHNCaW5kaW5nLFxufSBmcm9tICduZy1keW5hbWljLWpzb24tZm9ybSc7XG5pbXBvcnQgeyBTbGlkZXIsIFNsaWRlck1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvc2xpZGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndWktcHJpbWVuZy1yYW5nZScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBTbGlkZXJNb2R1bGUsXG4gICAgUHJvcHNCaW5kaW5nRGlyZWN0aXZlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlUHJvcHNCaW5kaW5nKFtcbiAgICAgIHtcbiAgICAgICAga2V5OiAncC1zbGlkZXInLFxuICAgICAgICB0b2tlbjogU2xpZGVyLFxuICAgICAgfSxcbiAgICBdKSxcbiAgXSxcbiAgdGVtcGxhdGVVcmw6ICcuL3VpLXByaW1lbmctcmFuZ2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZXM6IFtdLFxufSlcbmV4cG9ydCBjbGFzcyBVaVByaW1lbmdSYW5nZUNvbXBvbmVudFxuICBleHRlbmRzIEN1c3RvbUNvbnRyb2xDb21wb25lbnRcbiAgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0XG57XG4gIHByaXZhdGUgX3BlbmRpbmdWYWx1ZSA9IDA7XG5cbiAgb3ZlcnJpZGUgY29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgwKTtcbiAgb25DaGFuZ2U/OiBhbnk7XG5cbiAgQFZpZXdDaGlsZChTbGlkZXIpIHNsaWRlclJlZj86IFNsaWRlcjtcblxuICBvdmVycmlkZSB3cml0ZVZhbHVlKG9iajogYW55KTogdm9pZCB7XG4gICAgc3VwZXIud3JpdGVWYWx1ZShvYmopO1xuICAgIHRoaXMuX3BlbmRpbmdWYWx1ZSA9IG9iajtcbiAgfVxuXG4gIG92ZXJyaWRlIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNsaWRlclJlZj8udXBkYXRlVmFsdWUodGhpcy5fcGVuZGluZ1ZhbHVlKTtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cImRhdGFcIj5cbiAgPGRpdiBjbGFzcz1cInJhbmdlLWlucHV0XCI+XG4gICAgPHAtc2xpZGVyXG4gICAgICBbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiXG4gICAgICBbcHJvcHNCaW5kaW5nXT1cIltcbiAgICAgICAge1xuICAgICAgICAgIGtleTogJ3Atc2xpZGVyJyxcbiAgICAgICAgICBwcm9wczogZGF0YS5wcm9wc1xuICAgICAgICB9XG4gICAgICBdXCJcbiAgICAgIChvbkNoYW5nZSk9XCJvbkNoYW5nZShjb250cm9sLnZhbHVlKVwiXG4gICAgPjwvcC1zbGlkZXI+XG4gIDwvZGl2PlxuPC9uZy1jb250YWluZXI+XG4iXX0=