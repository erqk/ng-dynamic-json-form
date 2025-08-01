import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CustomControlComponent } from '../../components/custom-control/custom-control.component';
import { PropsBindingDirective, TextareaAutHeightDirective, } from '../../directives';
import { providePropsBinding } from '../../providers/props-binding.provider';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
class UiBasicTextareaComponent extends CustomControlComponent {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiBasicTextareaComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiBasicTextareaComponent, isStandalone: true, selector: "ui-basic-textarea", host: { classAttribute: "ui-basic" }, providers: [
            providePropsBinding([
                {
                    key: 'textarea-autoheight',
                    token: TextareaAutHeightDirective,
                },
            ]),
        ], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <textarea\n    textareaAutoHeight\n    [ngClass]=\"{ disabled: control.disabled }\"\n    [propsBinding]=\"[\n      {\n        key: 'textarea-autoheight',\n        props: data.props\n      }\n    ]\"\n    [formControl]=\"control\"\n    (input)=\"onInput($event)\"\n  ></textarea>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: TextareaAutHeightDirective, selector: "[textareaAutoHeight]", inputs: ["autoResize"] }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
export { UiBasicTextareaComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiBasicTextareaComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-basic-textarea', standalone: true, imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        TextareaAutHeightDirective,
                        PropsBindingDirective,
                    ], providers: [
                        providePropsBinding([
                            {
                                key: 'textarea-autoheight',
                                token: TextareaAutHeightDirective,
                            },
                        ]),
                    ], host: {
                        class: 'ui-basic',
                    }, template: "<ng-container *ngIf=\"data\">\n  <textarea\n    textareaAutoHeight\n    [ngClass]=\"{ disabled: control.disabled }\"\n    [propsBinding]=\"[\n      {\n        key: 'textarea-autoheight',\n        props: data.props\n      }\n    ]\"\n    [formControl]=\"control\"\n    (input)=\"onInput($event)\"\n  ></textarea>\n</ng-container>\n" }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktYmFzaWMtdGV4dGFyZWEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGliL2NvcmUvdWktYmFzaWMvdWktYmFzaWMtdGV4dGFyZWEvdWktYmFzaWMtdGV4dGFyZWEuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbGliL2NvcmUvdWktYmFzaWMvdWktYmFzaWMtdGV4dGFyZWEvdWktYmFzaWMtdGV4dGFyZWEuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBEQUEwRCxDQUFDO0FBQ2xHLE9BQU8sRUFDTCxxQkFBcUIsRUFDckIsMEJBQTBCLEdBQzNCLE1BQU0sa0JBQWtCLENBQUM7QUFDMUIsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7Ozs7QUFFN0UsTUF1QmEsd0JBQXlCLFNBQVEsc0JBQXNCO0lBdkJwRTs7UUF3QlcsWUFBTyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBY3hDO0lBVlUsZ0JBQWdCLENBQUMsRUFBTztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsT0FBTyxDQUFDLENBQVE7UUFDZCxNQUFNLEtBQUssR0FBSSxDQUFDLENBQUMsTUFBMkIsQ0FBQyxLQUFLLENBQUM7UUFFbkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QixDQUFDOytHQWRVLHdCQUF3QjttR0FBeEIsd0JBQXdCLHNHQWR4QjtZQUNULG1CQUFtQixDQUFDO2dCQUNsQjtvQkFDRSxHQUFHLEVBQUUscUJBQXFCO29CQUMxQixLQUFLLEVBQUUsMEJBQTBCO2lCQUNsQzthQUNGLENBQUM7U0FDSCxpREMxQkgsNFVBY0EsMkNEQUksWUFBWSxnT0FDWixtQkFBbUIsMGtCQUNuQiwwQkFBMEIseUZBQzFCLHFCQUFxQjs7U0FnQlosd0JBQXdCOzRGQUF4Qix3QkFBd0I7a0JBdkJwQyxTQUFTOytCQUNFLG1CQUFtQixjQUNqQixJQUFJLFdBQ1A7d0JBQ1AsWUFBWTt3QkFDWixtQkFBbUI7d0JBQ25CLDBCQUEwQjt3QkFDMUIscUJBQXFCO3FCQUN0QixhQUNVO3dCQUNULG1CQUFtQixDQUFDOzRCQUNsQjtnQ0FDRSxHQUFHLEVBQUUscUJBQXFCO2dDQUMxQixLQUFLLEVBQUUsMEJBQTBCOzZCQUNsQzt5QkFDRixDQUFDO3FCQUNILFFBR0s7d0JBQ0osS0FBSyxFQUFFLFVBQVU7cUJBQ2xCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDdXN0b21Db250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jdXN0b20tY29udHJvbC9jdXN0b20tY29udHJvbC5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgUHJvcHNCaW5kaW5nRGlyZWN0aXZlLFxuICBUZXh0YXJlYUF1dEhlaWdodERpcmVjdGl2ZSxcbn0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcyc7XG5pbXBvcnQgeyBwcm92aWRlUHJvcHNCaW5kaW5nIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL3Byb3BzLWJpbmRpbmcucHJvdmlkZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd1aS1iYXNpYy10ZXh0YXJlYScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBUZXh0YXJlYUF1dEhlaWdodERpcmVjdGl2ZSxcbiAgICBQcm9wc0JpbmRpbmdEaXJlY3RpdmUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVQcm9wc0JpbmRpbmcoW1xuICAgICAge1xuICAgICAgICBrZXk6ICd0ZXh0YXJlYS1hdXRvaGVpZ2h0JyxcbiAgICAgICAgdG9rZW46IFRleHRhcmVhQXV0SGVpZ2h0RGlyZWN0aXZlLFxuICAgICAgfSxcbiAgICBdKSxcbiAgXSxcbiAgdGVtcGxhdGVVcmw6ICcuL3VpLWJhc2ljLXRleHRhcmVhLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVzOiBbXSxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAndWktYmFzaWMnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBVaUJhc2ljVGV4dGFyZWFDb21wb25lbnQgZXh0ZW5kcyBDdXN0b21Db250cm9sQ29tcG9uZW50IHtcbiAgb3ZlcnJpZGUgY29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgnJyk7XG5cbiAgb25DaGFuZ2U/OiBhbnk7XG5cbiAgb3ZlcnJpZGUgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgb25JbnB1dChlOiBFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHZhbHVlID0gKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuXG4gICAgdGhpcy5jb250cm9sLnNldFZhbHVlKHZhbHVlKTtcbiAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlKTtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cImRhdGFcIj5cbiAgPHRleHRhcmVhXG4gICAgdGV4dGFyZWFBdXRvSGVpZ2h0XG4gICAgW25nQ2xhc3NdPVwieyBkaXNhYmxlZDogY29udHJvbC5kaXNhYmxlZCB9XCJcbiAgICBbcHJvcHNCaW5kaW5nXT1cIltcbiAgICAgIHtcbiAgICAgICAga2V5OiAndGV4dGFyZWEtYXV0b2hlaWdodCcsXG4gICAgICAgIHByb3BzOiBkYXRhLnByb3BzXG4gICAgICB9XG4gICAgXVwiXG4gICAgW2Zvcm1Db250cm9sXT1cImNvbnRyb2xcIlxuICAgIChpbnB1dCk9XCJvbklucHV0KCRldmVudClcIlxuICA+PC90ZXh0YXJlYT5cbjwvbmctY29udGFpbmVyPlxuIl19