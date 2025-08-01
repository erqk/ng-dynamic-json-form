import { CommonModule } from '@angular/common';
import { Component, DestroyRef, Input, ViewChild, ViewContainerRef, inject, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { FormValidationService } from '../../services/form-validation.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
class ErrorMessageComponent {
    constructor() {
        this._internal_destroyRef = inject(DestroyRef);
        this._internal_formValidationService = inject(FormValidationService);
        this._customComponent = null;
        this.errorMessages = [];
    }
    ngAfterViewInit() {
        this._injectComponent();
        this._getErrorMessages();
    }
    _injectComponent() {
        if (!this.customComponent || !this.componentAnchor) {
            return;
        }
        this.componentAnchor.clear();
        const componentRef = this.componentAnchor.createComponent(this.customComponent);
        this._customComponent = componentRef.instance;
        if (this.control) {
            componentRef.instance.control = this.control;
        }
    }
    _getErrorMessages() {
        this._internal_formValidationService
            .getErrorMessages$(this.control, this.validators)
            .pipe(tap((x) => {
            this.errorMessages = x;
            if (this._customComponent) {
                this._customComponent.errorMessages = [...this.errorMessages];
            }
        }), takeUntilDestroyed(this._internal_destroyRef))
            .subscribe();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ErrorMessageComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: ErrorMessageComponent, isStandalone: true, selector: "error-message", inputs: { control: "control", validators: "validators", customComponent: "customComponent", customTemplate: "customTemplate" }, host: { classAttribute: "error-message" }, viewQueries: [{ propertyName: "componentAnchor", first: true, predicate: ["componentAnchor"], descendants: true, read: ViewContainerRef }], ngImport: i0, template: "<!-- Custom error message component -->\n<ng-container #componentAnchor></ng-container>\n<ng-container\n  [ngTemplateOutlet]=\"customTemplate ?? null\"\n  [ngTemplateOutletContext]=\"{\n    control,\n    messages: errorMessages\n  }\"\n></ng-container>\n\n<!-- Default error message component -->\n<ng-container *ngIf=\"!customComponent && !customTemplate\">\n  <ng-container *ngFor=\"let error of errorMessages\">\n    <div>{{ error }}</div>\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }] }); }
}
export { ErrorMessageComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ErrorMessageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'error-message', standalone: true, imports: [CommonModule], host: {
                        class: 'error-message',
                    }, template: "<!-- Custom error message component -->\n<ng-container #componentAnchor></ng-container>\n<ng-container\n  [ngTemplateOutlet]=\"customTemplate ?? null\"\n  [ngTemplateOutletContext]=\"{\n    control,\n    messages: errorMessages\n  }\"\n></ng-container>\n\n<!-- Default error message component -->\n<ng-container *ngIf=\"!customComponent && !customTemplate\">\n  <ng-container *ngFor=\"let error of errorMessages\">\n    <div>{{ error }}</div>\n  </ng-container>\n</ng-container>\n" }]
        }], propDecorators: { control: [{
                type: Input
            }], validators: [{
                type: Input
            }], customComponent: [{
                type: Input
            }], customTemplate: [{
                type: Input
            }], componentAnchor: [{
                type: ViewChild,
                args: ['componentAnchor', { read: ViewContainerRef }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItbWVzc2FnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWIvY29yZS9jb21wb25lbnRzL2Vycm9yLW1lc3NhZ2UvZXJyb3ItbWVzc2FnZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9saWIvY29yZS9jb21wb25lbnRzL2Vycm9yLW1lc3NhZ2UvZXJyb3ItbWVzc2FnZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUdMLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRWhFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0IsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7OztBQUcvRSxNQVNhLHFCQUFxQjtJQVRsQztRQVVVLHlCQUFvQixHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMxQyxvQ0FBK0IsR0FBRyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNoRSxxQkFBZ0IsR0FBOEIsSUFBSSxDQUFDO1FBVTNELGtCQUFhLEdBQWEsRUFBRSxDQUFDO0tBdUM5QjtJQXJDQyxlQUFlO1FBQ2IsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVPLGdCQUFnQjtRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDbEQsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM3QixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FDdkQsSUFBSSxDQUFDLGVBQWUsQ0FDckIsQ0FBQztRQUVGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDO1FBRTlDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixZQUFZLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQzlDO0lBQ0gsQ0FBQztJQUVPLGlCQUFpQjtRQUN2QixJQUFJLENBQUMsK0JBQStCO2FBQ2pDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQzthQUNoRCxJQUFJLENBQ0gsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDUixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztZQUV2QixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQy9EO1FBQ0gsQ0FBQyxDQUFDLEVBQ0Ysa0JBQWtCLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQzlDO2FBQ0EsU0FBUyxFQUFFLENBQUM7SUFDakIsQ0FBQzsrR0FuRFUscUJBQXFCO21HQUFyQixxQkFBcUIsbVZBVU0sZ0JBQWdCLDZCQ3RDeEQsa2VBZ0JBLDJDRE1ZLFlBQVk7O1NBTVgscUJBQXFCOzRGQUFyQixxQkFBcUI7a0JBVGpDLFNBQVM7K0JBQ0UsZUFBZSxjQUNiLElBQUksV0FDUCxDQUFDLFlBQVksQ0FBQyxRQUVqQjt3QkFDSixLQUFLLEVBQUUsZUFBZTtxQkFDdkI7OEJBT1EsT0FBTztzQkFBZixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUdOLGVBQWU7c0JBRGQsU0FBUzt1QkFBQyxpQkFBaUIsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIERlc3Ryb3lSZWYsXG4gIElucHV0LFxuICBUZW1wbGF0ZVJlZixcbiAgVHlwZSxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBpbmplY3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdGFrZVVudGlsRGVzdHJveWVkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZS9yeGpzLWludGVyb3AnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBWYWxpZGF0b3JDb25maWcgfSBmcm9tICcuLi8uLi9tb2RlbHMnO1xuaW1wb3J0IHsgRm9ybVZhbGlkYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZm9ybS12YWxpZGF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ3VzdG9tRXJyb3JNZXNzYWdlIH0gZnJvbSAnLi4vY3VzdG9tLWVycm9yLW1lc3NhZ2UvY3VzdG9tLWVycm9yLW1lc3NhZ2UuYWJzdHJhY3QnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdlcnJvci1tZXNzYWdlJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIHRlbXBsYXRlVXJsOiAnLi9lcnJvci1tZXNzYWdlLmNvbXBvbmVudC5odG1sJyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnZXJyb3ItbWVzc2FnZScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIEVycm9yTWVzc2FnZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBwcml2YXRlIF9pbnRlcm5hbF9kZXN0cm95UmVmID0gaW5qZWN0KERlc3Ryb3lSZWYpO1xuICBwcml2YXRlIF9pbnRlcm5hbF9mb3JtVmFsaWRhdGlvblNlcnZpY2UgPSBpbmplY3QoRm9ybVZhbGlkYXRpb25TZXJ2aWNlKTtcbiAgcHJpdmF0ZSBfY3VzdG9tQ29tcG9uZW50OiBDdXN0b21FcnJvck1lc3NhZ2UgfCBudWxsID0gbnVsbDtcblxuICBASW5wdXQoKSBjb250cm9sPzogQWJzdHJhY3RDb250cm9sO1xuICBASW5wdXQoKSB2YWxpZGF0b3JzPzogVmFsaWRhdG9yQ29uZmlnW107XG4gIEBJbnB1dCgpIGN1c3RvbUNvbXBvbmVudD86IFR5cGU8Q3VzdG9tRXJyb3JNZXNzYWdlPjtcbiAgQElucHV0KCkgY3VzdG9tVGVtcGxhdGU/OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBWaWV3Q2hpbGQoJ2NvbXBvbmVudEFuY2hvcicsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KVxuICBjb21wb25lbnRBbmNob3IhOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIGVycm9yTWVzc2FnZXM6IHN0cmluZ1tdID0gW107XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX2luamVjdENvbXBvbmVudCgpO1xuICAgIHRoaXMuX2dldEVycm9yTWVzc2FnZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luamVjdENvbXBvbmVudCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY3VzdG9tQ29tcG9uZW50IHx8ICF0aGlzLmNvbXBvbmVudEFuY2hvcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY29tcG9uZW50QW5jaG9yLmNsZWFyKCk7XG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gdGhpcy5jb21wb25lbnRBbmNob3IuY3JlYXRlQ29tcG9uZW50KFxuICAgICAgdGhpcy5jdXN0b21Db21wb25lbnRcbiAgICApO1xuXG4gICAgdGhpcy5fY3VzdG9tQ29tcG9uZW50ID0gY29tcG9uZW50UmVmLmluc3RhbmNlO1xuXG4gICAgaWYgKHRoaXMuY29udHJvbCkge1xuICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlLmNvbnRyb2wgPSB0aGlzLmNvbnRyb2w7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0RXJyb3JNZXNzYWdlcygpOiB2b2lkIHtcbiAgICB0aGlzLl9pbnRlcm5hbF9mb3JtVmFsaWRhdGlvblNlcnZpY2VcbiAgICAgIC5nZXRFcnJvck1lc3NhZ2VzJCh0aGlzLmNvbnRyb2wsIHRoaXMudmFsaWRhdG9ycylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoKHgpID0+IHtcbiAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSB4O1xuXG4gICAgICAgICAgaWYgKHRoaXMuX2N1c3RvbUNvbXBvbmVudCkge1xuICAgICAgICAgICAgdGhpcy5fY3VzdG9tQ29tcG9uZW50LmVycm9yTWVzc2FnZXMgPSBbLi4udGhpcy5lcnJvck1lc3NhZ2VzXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICB0YWtlVW50aWxEZXN0cm95ZWQodGhpcy5faW50ZXJuYWxfZGVzdHJveVJlZilcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIiwiPCEtLSBDdXN0b20gZXJyb3IgbWVzc2FnZSBjb21wb25lbnQgLS0+XG48bmctY29udGFpbmVyICNjb21wb25lbnRBbmNob3I+PC9uZy1jb250YWluZXI+XG48bmctY29udGFpbmVyXG4gIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1c3RvbVRlbXBsYXRlID8/IG51bGxcIlxuICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xuICAgIGNvbnRyb2wsXG4gICAgbWVzc2FnZXM6IGVycm9yTWVzc2FnZXNcbiAgfVwiXG4+PC9uZy1jb250YWluZXI+XG5cbjwhLS0gRGVmYXVsdCBlcnJvciBtZXNzYWdlIGNvbXBvbmVudCAtLT5cbjxuZy1jb250YWluZXIgKm5nSWY9XCIhY3VzdG9tQ29tcG9uZW50ICYmICFjdXN0b21UZW1wbGF0ZVwiPlxuICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBlcnJvciBvZiBlcnJvck1lc3NhZ2VzXCI+XG4gICAgPGRpdj57eyBlcnJvciB9fTwvZGl2PlxuICA8L25nLWNvbnRhaW5lcj5cbjwvbmctY29udGFpbmVyPlxuIl19