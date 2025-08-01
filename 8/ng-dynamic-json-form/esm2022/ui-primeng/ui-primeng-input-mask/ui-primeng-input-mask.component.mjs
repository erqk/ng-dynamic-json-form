import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IMaskDirective } from 'angular-imask';
import { CustomControlComponent, ImaskValuePatchDirective, PropsBindingDirective, providePropsBinding, } from 'ng-dynamic-json-form';
import { InputText, InputTextModule } from 'primeng/inputtext';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/inputtext";
class UiPrimengInputMaskComponent extends CustomControlComponent {
    constructor() {
        super(...arguments);
        this.control = new FormControl('');
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiPrimengInputMaskComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiPrimengInputMaskComponent, isStandalone: true, selector: "ui-primeng-input-mask", providers: [
            providePropsBinding([
                {
                    key: 'p-input-text',
                    token: InputText,
                },
                {
                    key: 'imask',
                    token: IMaskDirective,
                },
            ]),
        ], viewQueries: [{ propertyName: "target", first: true, predicate: InputText, descendants: true }], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <input\n    type=\"text\"\n    pInputText\n    imaskValuePatch\n    [formControl]=\"control\"\n    [imask]=\"data.inputMask\"\n    [propsBinding]=\"[\n      {\n        key: 'p-input-text',\n        props: data.props,\n        omit: ['type']\n      },\n      {\n        key: 'imask',\n        props: data.props,\n      }\n    ]\"\n    (complete)=\"onChange(control.value)\"\n  />\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: InputTextModule }, { kind: "directive", type: i3.InputText, selector: "[pInputText]" }, { kind: "directive", type: IMaskDirective, selector: "[imask]", inputs: ["imask", "unmask", "imaskElement"], outputs: ["accept", "complete"], exportAs: ["imask"] }, { kind: "directive", type: ImaskValuePatchDirective, selector: "[imaskValuePatch]" }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
export { UiPrimengInputMaskComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiPrimengInputMaskComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-primeng-input-mask', standalone: true, imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        InputTextModule,
                        IMaskDirective,
                        ImaskValuePatchDirective,
                        PropsBindingDirective,
                    ], providers: [
                        providePropsBinding([
                            {
                                key: 'p-input-text',
                                token: InputText,
                            },
                            {
                                key: 'imask',
                                token: IMaskDirective,
                            },
                        ]),
                    ], template: "<ng-container *ngIf=\"data\">\n  <input\n    type=\"text\"\n    pInputText\n    imaskValuePatch\n    [formControl]=\"control\"\n    [imask]=\"data.inputMask\"\n    [propsBinding]=\"[\n      {\n        key: 'p-input-text',\n        props: data.props,\n        omit: ['type']\n      },\n      {\n        key: 'imask',\n        props: data.props,\n      }\n    ]\"\n    (complete)=\"onChange(control.value)\"\n  />\n</ng-container>\n" }]
        }], propDecorators: { target: [{
                type: ViewChild,
                args: [InputText]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktcHJpbWVuZy1pbnB1dC1tYXNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi91aS1wcmltZW5nL3VpLXByaW1lbmctaW5wdXQtbWFzay91aS1wcmltZW5nLWlucHV0LW1hc2suY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vbGliL3VpLXByaW1lbmcvdWktcHJpbWVuZy1pbnB1dC1tYXNrL3VpLXByaW1lbmctaW5wdXQtbWFzay5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUNMLHNCQUFzQixFQUN0Qix3QkFBd0IsRUFDeEIscUJBQXFCLEVBQ3JCLG1CQUFtQixHQUNwQixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7Ozs7O0FBRS9ELE1BMEJhLDJCQUE0QixTQUFRLHNCQUFzQjtJQTFCdkU7O1FBNEJXLFlBQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQU14QztJQUhVLGdCQUFnQixDQUFDLEVBQU87UUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQzsrR0FQVSwyQkFBMkI7bUdBQTNCLDJCQUEyQixvRUFkM0I7WUFDVCxtQkFBbUIsQ0FBQztnQkFDbEI7b0JBQ0UsR0FBRyxFQUFFLGNBQWM7b0JBQ25CLEtBQUssRUFBRSxTQUFTO2lCQUNqQjtnQkFDRDtvQkFDRSxHQUFHLEVBQUUsT0FBTztvQkFDWixLQUFLLEVBQUUsY0FBYztpQkFDdEI7YUFDRixDQUFDO1NBQ0gsa0VBSVUsU0FBUyx1RUN2Q3RCLGdiQXFCQSwyQ0RMSSxZQUFZLGtJQUNaLG1CQUFtQix5a0JBQ25CLGVBQWUsb0dBQ2YsY0FBYyx1SkFDZCx3QkFBd0IsOERBQ3hCLHFCQUFxQjs7U0FpQlosMkJBQTJCOzRGQUEzQiwyQkFBMkI7a0JBMUJ2QyxTQUFTOytCQUNFLHVCQUF1QixjQUNyQixJQUFJLFdBQ1A7d0JBQ1AsWUFBWTt3QkFDWixtQkFBbUI7d0JBQ25CLGVBQWU7d0JBQ2YsY0FBYzt3QkFDZCx3QkFBd0I7d0JBQ3hCLHFCQUFxQjtxQkFDdEIsYUFFVTt3QkFDVCxtQkFBbUIsQ0FBQzs0QkFDbEI7Z0NBQ0UsR0FBRyxFQUFFLGNBQWM7Z0NBQ25CLEtBQUssRUFBRSxTQUFTOzZCQUNqQjs0QkFDRDtnQ0FDRSxHQUFHLEVBQUUsT0FBTztnQ0FDWixLQUFLLEVBQUUsY0FBYzs2QkFDdEI7eUJBQ0YsQ0FBQztxQkFDSDs4QkFJcUIsTUFBTTtzQkFBM0IsU0FBUzt1QkFBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IElNYXNrRGlyZWN0aXZlIH0gZnJvbSAnYW5ndWxhci1pbWFzayc7XG5pbXBvcnQge1xuICBDdXN0b21Db250cm9sQ29tcG9uZW50LFxuICBJbWFza1ZhbHVlUGF0Y2hEaXJlY3RpdmUsXG4gIFByb3BzQmluZGluZ0RpcmVjdGl2ZSxcbiAgcHJvdmlkZVByb3BzQmluZGluZyxcbn0gZnJvbSAnbmctZHluYW1pYy1qc29uLWZvcm0nO1xuaW1wb3J0IHsgSW5wdXRUZXh0LCBJbnB1dFRleHRNb2R1bGUgfSBmcm9tICdwcmltZW5nL2lucHV0dGV4dCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3VpLXByaW1lbmctaW5wdXQtbWFzaycsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBJbnB1dFRleHRNb2R1bGUsXG4gICAgSU1hc2tEaXJlY3RpdmUsXG4gICAgSW1hc2tWYWx1ZVBhdGNoRGlyZWN0aXZlLFxuICAgIFByb3BzQmluZGluZ0RpcmVjdGl2ZSxcbiAgXSxcbiAgdGVtcGxhdGVVcmw6ICcuL3VpLXByaW1lbmctaW5wdXQtbWFzay5jb21wb25lbnQuaHRtbCcsXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVQcm9wc0JpbmRpbmcoW1xuICAgICAge1xuICAgICAgICBrZXk6ICdwLWlucHV0LXRleHQnLFxuICAgICAgICB0b2tlbjogSW5wdXRUZXh0LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5OiAnaW1hc2snLFxuICAgICAgICB0b2tlbjogSU1hc2tEaXJlY3RpdmUsXG4gICAgICB9LFxuICAgIF0pLFxuICBdLFxuICBzdHlsZXM6IFtdLFxufSlcbmV4cG9ydCBjbGFzcyBVaVByaW1lbmdJbnB1dE1hc2tDb21wb25lbnQgZXh0ZW5kcyBDdXN0b21Db250cm9sQ29tcG9uZW50IHtcbiAgQFZpZXdDaGlsZChJbnB1dFRleHQpIHRhcmdldD86IElucHV0VGV4dDtcbiAgb3ZlcnJpZGUgY29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgnJyk7XG4gIG9uQ2hhbmdlPzogYW55O1xuXG4gIG92ZXJyaWRlIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cImRhdGFcIj5cbiAgPGlucHV0XG4gICAgdHlwZT1cInRleHRcIlxuICAgIHBJbnB1dFRleHRcbiAgICBpbWFza1ZhbHVlUGF0Y2hcbiAgICBbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiXG4gICAgW2ltYXNrXT1cImRhdGEuaW5wdXRNYXNrXCJcbiAgICBbcHJvcHNCaW5kaW5nXT1cIltcbiAgICAgIHtcbiAgICAgICAga2V5OiAncC1pbnB1dC10ZXh0JyxcbiAgICAgICAgcHJvcHM6IGRhdGEucHJvcHMsXG4gICAgICAgIG9taXQ6IFsndHlwZSddXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXk6ICdpbWFzaycsXG4gICAgICAgIHByb3BzOiBkYXRhLnByb3BzLFxuICAgICAgfVxuICAgIF1cIlxuICAgIChjb21wbGV0ZSk9XCJvbkNoYW5nZShjb250cm9sLnZhbHVlKVwiXG4gIC8+XG48L25nLWNvbnRhaW5lcj5cbiJdfQ==