import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggle, MatSlideToggleModule, } from '@angular/material/slide-toggle';
import { CustomControlComponent, PropsBindingDirective, providePropsBinding, } from 'ng-dynamic-json-form';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/material/slide-toggle";
class UiMaterialSwitchComponent extends CustomControlComponent {
    constructor() {
        super(...arguments);
        this.control = new FormControl(false);
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiMaterialSwitchComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiMaterialSwitchComponent, isStandalone: true, selector: "ui-material-switch", providers: [
            providePropsBinding([
                {
                    key: 'mat-slide-toggle',
                    token: MatSlideToggle,
                },
            ]),
        ], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <mat-slide-toggle\n    [labelPosition]=\"data.options?.labelPosition ?? 'after'\"\n    [formControl]=\"control\"\n    [propsBinding]=\"[\n      {\n        key: 'mat-slide-toggle',\n        props: data.props,\n        omit: ['labelPosition']\n      }\n    ]\"\n    (change)=\"onChange(control.value)\"\n    >{{ data.options?.data?.[0]?.label }}</mat-slide-toggle\n  >\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: MatSlideToggleModule }, { kind: "component", type: i3.MatSlideToggle, selector: "mat-slide-toggle", inputs: ["disabled", "disableRipple", "color", "tabIndex"], exportAs: ["matSlideToggle"] }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
export { UiMaterialSwitchComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiMaterialSwitchComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-material-switch', standalone: true, imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        MatSlideToggleModule,
                        MatInputModule,
                        PropsBindingDirective,
                    ], providers: [
                        providePropsBinding([
                            {
                                key: 'mat-slide-toggle',
                                token: MatSlideToggle,
                            },
                        ]),
                    ], template: "<ng-container *ngIf=\"data\">\n  <mat-slide-toggle\n    [labelPosition]=\"data.options?.labelPosition ?? 'after'\"\n    [formControl]=\"control\"\n    [propsBinding]=\"[\n      {\n        key: 'mat-slide-toggle',\n        props: data.props,\n        omit: ['labelPosition']\n      }\n    ]\"\n    (change)=\"onChange(control.value)\"\n    >{{ data.options?.data?.[0]?.label }}</mat-slide-toggle\n  >\n</ng-container>\n" }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktbWF0ZXJpYWwtc3dpdGNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi91aS1tYXRlcmlhbC91aS1tYXRlcmlhbC1zd2l0Y2gvdWktbWF0ZXJpYWwtc3dpdGNoLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL2xpYi91aS1tYXRlcmlhbC91aS1tYXRlcmlhbC1zd2l0Y2gvdWktbWF0ZXJpYWwtc3dpdGNoLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUNMLGNBQWMsRUFDZCxvQkFBb0IsR0FDckIsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN4QyxPQUFPLEVBQ0wsc0JBQXNCLEVBQ3RCLHFCQUFxQixFQUNyQixtQkFBbUIsR0FDcEIsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7QUFFOUIsTUFxQmEseUJBQTBCLFNBQVEsc0JBQXNCO0lBckJyRTs7UUFzQlcsWUFBTyxHQUFHLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBTTNDO0lBSFUsZ0JBQWdCLENBQUMsRUFBTztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDOytHQU5VLHlCQUF5QjttR0FBekIseUJBQXlCLGlFQVh6QjtZQUNULG1CQUFtQixDQUFDO2dCQUNsQjtvQkFDRSxHQUFHLEVBQUUsa0JBQWtCO29CQUN2QixLQUFLLEVBQUUsY0FBYztpQkFDdEI7YUFDRixDQUFDO1NBQ0gsaURDL0JILG9hQWVBLDJDREdJLFlBQVksa0lBQ1osbUJBQW1CLHlUQUNuQixvQkFBb0Isc01BQ3BCLGNBQWMsK0JBQ2QscUJBQXFCOztTQWFaLHlCQUF5Qjs0RkFBekIseUJBQXlCO2tCQXJCckMsU0FBUzsrQkFDRSxvQkFBb0IsY0FDbEIsSUFBSSxXQUNQO3dCQUNQLFlBQVk7d0JBQ1osbUJBQW1CO3dCQUNuQixvQkFBb0I7d0JBQ3BCLGNBQWM7d0JBQ2QscUJBQXFCO3FCQUN0QixhQUNVO3dCQUNULG1CQUFtQixDQUFDOzRCQUNsQjtnQ0FDRSxHQUFHLEVBQUUsa0JBQWtCO2dDQUN2QixLQUFLLEVBQUUsY0FBYzs2QkFDdEI7eUJBQ0YsQ0FBQztxQkFDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCc7XG5pbXBvcnQge1xuICBNYXRTbGlkZVRvZ2dsZSxcbiAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NsaWRlLXRvZ2dsZSc7XG5pbXBvcnQge1xuICBDdXN0b21Db250cm9sQ29tcG9uZW50LFxuICBQcm9wc0JpbmRpbmdEaXJlY3RpdmUsXG4gIHByb3ZpZGVQcm9wc0JpbmRpbmcsXG59IGZyb20gJ25nLWR5bmFtaWMtanNvbi1mb3JtJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndWktbWF0ZXJpYWwtc3dpdGNoJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIFByb3BzQmluZGluZ0RpcmVjdGl2ZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZVByb3BzQmluZGluZyhbXG4gICAgICB7XG4gICAgICAgIGtleTogJ21hdC1zbGlkZS10b2dnbGUnLFxuICAgICAgICB0b2tlbjogTWF0U2xpZGVUb2dnbGUsXG4gICAgICB9LFxuICAgIF0pLFxuICBdLFxuICB0ZW1wbGF0ZVVybDogJy4vdWktbWF0ZXJpYWwtc3dpdGNoLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVzOiBbXSxcbn0pXG5leHBvcnQgY2xhc3MgVWlNYXRlcmlhbFN3aXRjaENvbXBvbmVudCBleHRlbmRzIEN1c3RvbUNvbnRyb2xDb21wb25lbnQge1xuICBvdmVycmlkZSBjb250cm9sID0gbmV3IEZvcm1Db250cm9sKGZhbHNlKTtcbiAgb25DaGFuZ2U/OiBhbnk7XG5cbiAgb3ZlcnJpZGUgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwiZGF0YVwiPlxuICA8bWF0LXNsaWRlLXRvZ2dsZVxuICAgIFtsYWJlbFBvc2l0aW9uXT1cImRhdGEub3B0aW9ucz8ubGFiZWxQb3NpdGlvbiA/PyAnYWZ0ZXInXCJcbiAgICBbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiXG4gICAgW3Byb3BzQmluZGluZ109XCJbXG4gICAgICB7XG4gICAgICAgIGtleTogJ21hdC1zbGlkZS10b2dnbGUnLFxuICAgICAgICBwcm9wczogZGF0YS5wcm9wcyxcbiAgICAgICAgb21pdDogWydsYWJlbFBvc2l0aW9uJ11cbiAgICAgIH1cbiAgICBdXCJcbiAgICAoY2hhbmdlKT1cIm9uQ2hhbmdlKGNvbnRyb2wudmFsdWUpXCJcbiAgICA+e3sgZGF0YS5vcHRpb25zPy5kYXRhPy5bMF0/LmxhYmVsIH19PC9tYXQtc2xpZGUtdG9nZ2xlXG4gID5cbjwvbmctY29udGFpbmVyPlxuIl19