import { Directive, ElementRef, HostListener, Input, inject, } from '@angular/core';
import * as i0 from "@angular/core";
class TextareaAutHeightDirective {
    constructor() {
        this._el = inject(ElementRef);
        this.autoResize = true;
    }
    // Call in this lifecycle hook to wait for PropsBindingDirective to bind the attributes,
    // then we can get the correct scrollHeight
    ngAfterViewInit() {
        if (typeof window === 'undefined')
            return;
        this._hostEl = this._el.nativeElement;
        if (!this._hostEl)
            return;
        this._hostEl.style.setProperty('resize', 'none');
        this._setHeight();
    }
    onInput() {
        this._setHeight();
    }
    _setHeight() {
        if (!this._hostEl || !this.autoResize)
            return;
        const borderWidth = Math.ceil(parseFloat(window.getComputedStyle(this._hostEl).borderWidth));
        this._hostEl.style.removeProperty('height');
        this._hostEl.style.setProperty('height', `${this._hostEl.scrollHeight + borderWidth * 2}px`);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TextareaAutHeightDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TextareaAutHeightDirective, isStandalone: true, selector: "[textareaAutoHeight]", inputs: { autoResize: "autoResize" }, host: { listeners: { "input": "onInput($event)" } }, ngImport: i0 }); }
}
export { TextareaAutHeightDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TextareaAutHeightDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[textareaAutoHeight]',
                    standalone: true,
                }]
        }], propDecorators: { autoResize: [{
                type: Input
            }], onInput: [{
                type: HostListener,
                args: ['input', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEtYXV0by1oZWlnaHQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGliL2NvcmUvZGlyZWN0aXZlcy90ZXh0YXJlYS1hdXRvLWhlaWdodC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7O0FBRXZCLE1BSWEsMEJBQTBCO0lBSnZDO1FBS1UsUUFBRyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUd4QixlQUFVLEdBQUcsSUFBSSxDQUFDO0tBZ0M1QjtJQTlCQyx3RkFBd0Y7SUFDeEYsMkNBQTJDO0lBQzNDLGVBQWU7UUFDYixJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVc7WUFBRSxPQUFPO1FBRTFDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUE0QixDQUFDO1FBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTztZQUFFLE9BQU87UUFFMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUdELE9BQU87UUFDTCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVPLFVBQVU7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVTtZQUFFLE9BQU87UUFFOUMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FDM0IsVUFBVSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQzlELENBQUM7UUFFRixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUM1QixRQUFRLEVBQ1IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBRyxXQUFXLEdBQUcsQ0FBQyxJQUFJLENBQ25ELENBQUM7SUFDSixDQUFDOytHQW5DVSwwQkFBMEI7bUdBQTFCLDBCQUEwQjs7U0FBMUIsMEJBQTBCOzRGQUExQiwwQkFBMEI7a0JBSnRDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsVUFBVSxFQUFFLElBQUk7aUJBQ2pCOzhCQUtVLFVBQVU7c0JBQWxCLEtBQUs7Z0JBZU4sT0FBTztzQkFETixZQUFZO3VCQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgaW5qZWN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3RleHRhcmVhQXV0b0hlaWdodF0nLFxuICBzdGFuZGFsb25lOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBUZXh0YXJlYUF1dEhlaWdodERpcmVjdGl2ZSB7XG4gIHByaXZhdGUgX2VsID0gaW5qZWN0KEVsZW1lbnRSZWYpO1xuICBwcml2YXRlIF9ob3N0RWw/OiBIVE1MRWxlbWVudDtcblxuICBASW5wdXQoKSBhdXRvUmVzaXplID0gdHJ1ZTtcblxuICAvLyBDYWxsIGluIHRoaXMgbGlmZWN5Y2xlIGhvb2sgdG8gd2FpdCBmb3IgUHJvcHNCaW5kaW5nRGlyZWN0aXZlIHRvIGJpbmQgdGhlIGF0dHJpYnV0ZXMsXG4gIC8vIHRoZW4gd2UgY2FuIGdldCB0aGUgY29ycmVjdCBzY3JvbGxIZWlnaHRcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuXG4gICAgdGhpcy5faG9zdEVsID0gdGhpcy5fZWwubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcbiAgICBpZiAoIXRoaXMuX2hvc3RFbCkgcmV0dXJuO1xuXG4gICAgdGhpcy5faG9zdEVsLnN0eWxlLnNldFByb3BlcnR5KCdyZXNpemUnLCAnbm9uZScpO1xuICAgIHRoaXMuX3NldEhlaWdodCgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignaW5wdXQnLCBbJyRldmVudCddKVxuICBvbklucHV0KCk6IHZvaWQge1xuICAgIHRoaXMuX3NldEhlaWdodCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0SGVpZ2h0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5faG9zdEVsIHx8ICF0aGlzLmF1dG9SZXNpemUpIHJldHVybjtcblxuICAgIGNvbnN0IGJvcmRlcldpZHRoID0gTWF0aC5jZWlsKFxuICAgICAgcGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLl9ob3N0RWwpLmJvcmRlcldpZHRoKVxuICAgICk7XG5cbiAgICB0aGlzLl9ob3N0RWwuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ2hlaWdodCcpO1xuICAgIHRoaXMuX2hvc3RFbC5zdHlsZS5zZXRQcm9wZXJ0eShcbiAgICAgICdoZWlnaHQnLFxuICAgICAgYCR7dGhpcy5faG9zdEVsLnNjcm9sbEhlaWdodCArIGJvcmRlcldpZHRoICogMn1weGBcbiAgICApO1xuICB9XG59XG4iXX0=