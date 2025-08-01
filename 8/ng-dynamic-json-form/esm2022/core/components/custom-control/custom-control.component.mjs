import { Component } from '@angular/core';
import { getControlErrors } from '../../utilities/get-control-errors';
import * as i0 from "@angular/core";
class CustomControlComponent {
    writeValue(obj) {
        this.control?.patchValue(obj);
    }
    registerOnChange(fn) {
        this.control?.valueChanges.subscribe(fn);
    }
    registerOnTouched(fn) {
        return;
    }
    setDisabledState(isDisabled) {
        isDisabled ? this.control?.disable() : this.control?.enable();
    }
    validate(control) {
        return getControlErrors(this.control);
    }
    markAsDirty() { }
    markAsPristine() { }
    markAsTouched() { }
    markAsUntouched() { }
    setErrors(errors) { }
    onOptionsGet(data) {
        if (!this.data || !this.data.options) {
            return;
        }
        this.data.options.data = data;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: CustomControlComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: CustomControlComponent, isStandalone: true, selector: "custom-control", ngImport: i0, template: ``, isInline: true }); }
}
export { CustomControlComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: CustomControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'custom-control',
                    template: ``,
                    standalone: true,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWNvbnRyb2wuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGliL2NvcmUvY29tcG9uZW50cy9jdXN0b20tY29udHJvbC9jdXN0b20tY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVMxQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7QUFFdEUsTUFLYSxzQkFBc0I7SUFZakMsVUFBVSxDQUFDLEdBQVE7UUFDakIsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELGdCQUFnQixDQUFDLEVBQU87UUFDdEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxFQUFPO1FBQ3ZCLE9BQU87SUFDVCxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsVUFBbUI7UUFDbEMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO0lBQ2hFLENBQUM7SUFFRCxRQUFRLENBQUMsT0FBa0M7UUFDekMsT0FBTyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELFdBQVcsS0FBVSxDQUFDO0lBRXRCLGNBQWMsS0FBVSxDQUFDO0lBRXpCLGFBQWEsS0FBVSxDQUFDO0lBRXhCLGVBQWUsS0FBVSxDQUFDO0lBRTFCLFNBQVMsQ0FBQyxNQUErQixJQUFTLENBQUM7SUFFbkQsWUFBWSxDQUFDLElBQWtCO1FBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDcEMsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNoQyxDQUFDOytHQWhEVSxzQkFBc0I7bUdBQXRCLHNCQUFzQiwwRUFIdkIsRUFBRTs7U0FHRCxzQkFBc0I7NEZBQXRCLHNCQUFzQjtrQkFMbEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUUsRUFBRTtvQkFDWixVQUFVLEVBQUUsSUFBSTtpQkFDakIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEFic3RyYWN0Q29udHJvbCxcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gIFVudHlwZWRGb3JtR3JvdXAsXG4gIFZhbGlkYXRpb25FcnJvcnMsXG4gIFZhbGlkYXRvcixcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2xDb25maWcsIE9wdGlvbkl0ZW0gfSBmcm9tICcuLi8uLi9tb2RlbHMnO1xuaW1wb3J0IHsgZ2V0Q29udHJvbEVycm9ycyB9IGZyb20gJy4uLy4uL3V0aWxpdGllcy9nZXQtY29udHJvbC1lcnJvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjdXN0b20tY29udHJvbCcsXG4gIHRlbXBsYXRlOiBgYCxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbn0pXG5leHBvcnQgY2xhc3MgQ3VzdG9tQ29udHJvbENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBWYWxpZGF0b3Ige1xuICAvKipNdXN0IGFzc2lnbiBpdCB3aXRoIGluc3RhbmNlIG9mIGBBYnN0cmFjdENvbnRyb2xgXG4gICAqIEBleGFtcGxlXG4gICAqIG92ZXJyaWRlIGNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKSAnb3InIG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woKTtcbiAgICogb3ZlcnJpZGUgY29udHJvbCA9IG5ldyBGb3JtR3JvdXAoKSAnb3InIG5ldyBVbnR5cGVkRm9ybUdyb3VwKCk7XG4gICAqIG92ZXJyaWRlIGNvbnRyb2wgPSBuZXcgRm9ybUFycmF5KCkgJ29yJyBuZXcgVW50eXBlZEZvcm1BcnJheSgpO1xuICAgKi9cbiAgcHVibGljIGNvbnRyb2w/OiBBYnN0cmFjdENvbnRyb2w7XG4gIHB1YmxpYyBob3N0Rm9ybT86IFVudHlwZWRGb3JtR3JvdXA7XG4gIHB1YmxpYyBkYXRhPzogRm9ybUNvbnRyb2xDb25maWc7XG4gIHB1YmxpYyBoaWRlRXJyb3JNZXNzYWdlPzogYm9vbGVhbjtcblxuICB3cml0ZVZhbHVlKG9iajogYW55KTogdm9pZCB7XG4gICAgdGhpcy5jb250cm9sPy5wYXRjaFZhbHVlKG9iaik7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnRyb2w/LnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoZm4pO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIGlzRGlzYWJsZWQgPyB0aGlzLmNvbnRyb2w/LmRpc2FibGUoKSA6IHRoaXMuY29udHJvbD8uZW5hYmxlKCk7XG4gIH1cblxuICB2YWxpZGF0ZShjb250cm9sOiBBYnN0cmFjdENvbnRyb2w8YW55LCBhbnk+KTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwge1xuICAgIHJldHVybiBnZXRDb250cm9sRXJyb3JzKHRoaXMuY29udHJvbCk7XG4gIH1cblxuICBtYXJrQXNEaXJ0eSgpOiB2b2lkIHt9XG5cbiAgbWFya0FzUHJpc3RpbmUoKTogdm9pZCB7fVxuXG4gIG1hcmtBc1RvdWNoZWQoKTogdm9pZCB7fVxuXG4gIG1hcmtBc1VudG91Y2hlZCgpOiB2b2lkIHt9XG5cbiAgc2V0RXJyb3JzKGVycm9yczogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwpOiB2b2lkIHt9XG5cbiAgb25PcHRpb25zR2V0KGRhdGE6IE9wdGlvbkl0ZW1bXSk6IHZvaWQge1xuICAgIGlmICghdGhpcy5kYXRhIHx8ICF0aGlzLmRhdGEub3B0aW9ucykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuZGF0YS5vcHRpb25zLmRhdGEgPSBkYXRhO1xuICB9XG59XG4iXX0=