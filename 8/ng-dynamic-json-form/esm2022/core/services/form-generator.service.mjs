import { Injectable, inject } from '@angular/core';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { FormValidationService } from './form-validation.service';
import * as i0 from "@angular/core";
class FormGeneratorService {
    constructor() {
        this._formValidationService = inject(FormValidationService);
    }
    generateFormGroup(data) {
        const formGroup = new UntypedFormGroup({});
        for (const item of data) {
            const control = !item.children?.length
                ? new FormControl(item.value)
                : this.generateFormGroup(item.children);
            const validators = this._formValidationService.getValidators(item.validators);
            const asyncValidators = this._formValidationService.getAsyncValidators(item.asyncValidators);
            control.setValidators(validators);
            control.setAsyncValidators(asyncValidators);
            formGroup.addControl(item.formControlName, control);
            // Runs the validation manually after async validators are initialized,
            // to prevent the initial status stuck at "PENDING".
            if (asyncValidators.length > 0) {
                queueMicrotask(() => control.updateValueAndValidity());
            }
        }
        return formGroup;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormGeneratorService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormGeneratorService }); }
}
export { FormGeneratorService };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormGeneratorService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1nZW5lcmF0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi9jb3JlL3NlcnZpY2VzL2Zvcm0tZ2VuZXJhdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRS9ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDOztBQUVsRSxNQUNhLG9CQUFvQjtJQURqQztRQUVVLDJCQUFzQixHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0tBZ0NoRTtJQTlCQyxpQkFBaUIsQ0FBQyxJQUF5QjtRQUN6QyxNQUFNLFNBQVMsR0FBRyxJQUFJLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTNDLEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxFQUFFO1lBQ3ZCLE1BQU0sT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNO2dCQUNwQyxDQUFDLENBQUMsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDN0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFMUMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FDMUQsSUFBSSxDQUFDLFVBQVUsQ0FDaEIsQ0FBQztZQUVGLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxrQkFBa0IsQ0FDcEUsSUFBSSxDQUFDLGVBQWUsQ0FDckIsQ0FBQztZQUVGLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbEMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBRTVDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUVwRCx1RUFBdUU7WUFDdkUsb0RBQW9EO1lBQ3BELElBQUksZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzlCLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO2FBQ3hEO1NBQ0Y7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDOytHQWhDVSxvQkFBb0I7bUhBQXBCLG9CQUFvQjs7U0FBcEIsb0JBQW9COzRGQUFwQixvQkFBb0I7a0JBRGhDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBpbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBVbnR5cGVkRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2xDb25maWcgfSBmcm9tICcuLi9tb2RlbHMvZm9ybS1jb250cm9sLWNvbmZpZy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRm9ybVZhbGlkYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9mb3JtLXZhbGlkYXRpb24uc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGb3JtR2VuZXJhdG9yU2VydmljZSB7XG4gIHByaXZhdGUgX2Zvcm1WYWxpZGF0aW9uU2VydmljZSA9IGluamVjdChGb3JtVmFsaWRhdGlvblNlcnZpY2UpO1xuXG4gIGdlbmVyYXRlRm9ybUdyb3VwKGRhdGE6IEZvcm1Db250cm9sQ29uZmlnW10pOiBVbnR5cGVkRm9ybUdyb3VwIHtcbiAgICBjb25zdCBmb3JtR3JvdXAgPSBuZXcgVW50eXBlZEZvcm1Hcm91cCh7fSk7XG5cbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgZGF0YSkge1xuICAgICAgY29uc3QgY29udHJvbCA9ICFpdGVtLmNoaWxkcmVuPy5sZW5ndGhcbiAgICAgICAgPyBuZXcgRm9ybUNvbnRyb2woaXRlbS52YWx1ZSlcbiAgICAgICAgOiB0aGlzLmdlbmVyYXRlRm9ybUdyb3VwKGl0ZW0uY2hpbGRyZW4pO1xuXG4gICAgICBjb25zdCB2YWxpZGF0b3JzID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLmdldFZhbGlkYXRvcnMoXG4gICAgICAgIGl0ZW0udmFsaWRhdG9yc1xuICAgICAgKTtcblxuICAgICAgY29uc3QgYXN5bmNWYWxpZGF0b3JzID0gdGhpcy5fZm9ybVZhbGlkYXRpb25TZXJ2aWNlLmdldEFzeW5jVmFsaWRhdG9ycyhcbiAgICAgICAgaXRlbS5hc3luY1ZhbGlkYXRvcnNcbiAgICAgICk7XG5cbiAgICAgIGNvbnRyb2wuc2V0VmFsaWRhdG9ycyh2YWxpZGF0b3JzKTtcbiAgICAgIGNvbnRyb2wuc2V0QXN5bmNWYWxpZGF0b3JzKGFzeW5jVmFsaWRhdG9ycyk7XG5cbiAgICAgIGZvcm1Hcm91cC5hZGRDb250cm9sKGl0ZW0uZm9ybUNvbnRyb2xOYW1lLCBjb250cm9sKTtcblxuICAgICAgLy8gUnVucyB0aGUgdmFsaWRhdGlvbiBtYW51YWxseSBhZnRlciBhc3luYyB2YWxpZGF0b3JzIGFyZSBpbml0aWFsaXplZCxcbiAgICAgIC8vIHRvIHByZXZlbnQgdGhlIGluaXRpYWwgc3RhdHVzIHN0dWNrIGF0IFwiUEVORElOR1wiLlxuICAgICAgaWYgKGFzeW5jVmFsaWRhdG9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHF1ZXVlTWljcm90YXNrKCgpID0+IGNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZm9ybUdyb3VwO1xuICB9XG59XG4iXX0=