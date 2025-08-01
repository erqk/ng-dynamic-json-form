import { Directive, ElementRef, Input, inject } from '@angular/core';
import * as i0 from "@angular/core";
class HostIdDirective {
    constructor() {
        this._el = inject(ElementRef);
    }
    ngOnChanges() {
        const hostEl = this._el.nativeElement;
        if (!hostEl || !this._hostId)
            return;
        // Set `id` to this component so that `querySelector` can find it correctly.
        hostEl.setAttribute('id', this._hostId);
    }
    get _hostId() {
        if (!this.hostId)
            return undefined;
        const { parentId, controlName } = this.hostId;
        return parentId ? `${parentId}.${controlName}` : controlName;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HostIdDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: HostIdDirective, isStandalone: true, selector: "[hostId]", inputs: { hostId: "hostId" }, usesOnChanges: true, ngImport: i0 }); }
}
export { HostIdDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HostIdDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[hostId]',
                    standalone: true,
                }]
        }], propDecorators: { hostId: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9zdC1pZC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvY29yZS9kaXJlY3RpdmVzL2hvc3QtaWQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRXJFLE1BSWEsZUFBZTtJQUo1QjtRQUtVLFFBQUcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7S0FrQmxDO0lBZEMsV0FBVztRQUNULE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBNEIsQ0FBQztRQUNyRCxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87WUFBRSxPQUFPO1FBRXJDLDRFQUE0RTtRQUM1RSxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELElBQVksT0FBTztRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU07WUFBRSxPQUFPLFNBQVMsQ0FBQztRQUVuQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDOUMsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxJQUFJLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7SUFDL0QsQ0FBQzsrR0FsQlUsZUFBZTttR0FBZixlQUFlOztTQUFmLGVBQWU7NEZBQWYsZUFBZTtrQkFKM0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsVUFBVTtvQkFDcEIsVUFBVSxFQUFFLElBQUk7aUJBQ2pCOzhCQUlVLE1BQU07c0JBQWQsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIGluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbaG9zdElkXScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG59KVxuZXhwb3J0IGNsYXNzIEhvc3RJZERpcmVjdGl2ZSB7XG4gIHByaXZhdGUgX2VsID0gaW5qZWN0KEVsZW1lbnRSZWYpO1xuXG4gIEBJbnB1dCgpIGhvc3RJZD86IHsgcGFyZW50SWQ/OiBzdHJpbmc7IGNvbnRyb2xOYW1lPzogc3RyaW5nIH07XG5cbiAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgY29uc3QgaG9zdEVsID0gdGhpcy5fZWwubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcbiAgICBpZiAoIWhvc3RFbCB8fCAhdGhpcy5faG9zdElkKSByZXR1cm47XG5cbiAgICAvLyBTZXQgYGlkYCB0byB0aGlzIGNvbXBvbmVudCBzbyB0aGF0IGBxdWVyeVNlbGVjdG9yYCBjYW4gZmluZCBpdCBjb3JyZWN0bHkuXG4gICAgaG9zdEVsLnNldEF0dHJpYnV0ZSgnaWQnLCB0aGlzLl9ob3N0SWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgX2hvc3RJZCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGlmICghdGhpcy5ob3N0SWQpIHJldHVybiB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCB7IHBhcmVudElkLCBjb250cm9sTmFtZSB9ID0gdGhpcy5ob3N0SWQ7XG4gICAgcmV0dXJuIHBhcmVudElkID8gYCR7cGFyZW50SWR9LiR7Y29udHJvbE5hbWV9YCA6IGNvbnRyb2xOYW1lO1xuICB9XG59XG4iXX0=