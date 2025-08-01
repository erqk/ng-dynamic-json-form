import { Directive, ElementRef, Input, inject } from '@angular/core';
import { getClassListFromString } from '../utilities/get-class-list-from-string';
import { getStyleListFromString } from '../utilities/get-style-list-from-string';
import * as i0 from "@angular/core";
class ControlLayoutDirective {
    constructor() {
        this._el = inject(ElementRef);
    }
    ngOnChanges() {
        const hostEl = this._el.nativeElement;
        if (!hostEl || !this.controlLayout)
            return;
        const { type, layout } = this.controlLayout;
        const classNames = layout?.[`${type ?? 'host'}Class`] ?? '';
        const styles = layout?.[`${type ?? 'host'}Styles`] ?? '';
        if (classNames.length > 0) {
            hostEl.classList.add(...getClassListFromString(classNames));
        }
        if (styles.length > 0) {
            const styleList = getStyleListFromString(styles);
            for (const item of styleList) {
                const [name, value] = item.split(':').map((x) => x.trim());
                hostEl.style.setProperty(name, value);
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ControlLayoutDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: ControlLayoutDirective, isStandalone: true, selector: "[controlLayout]", inputs: { controlLayout: "controlLayout" }, usesOnChanges: true, ngImport: i0 }); }
}
export { ControlLayoutDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ControlLayoutDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[controlLayout]',
                    standalone: true,
                }]
        }], propDecorators: { controlLayout: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1sYXlvdXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGliL2NvcmUvZGlyZWN0aXZlcy9jb250cm9sLWxheW91dC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVoRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQzs7QUFFakYsTUFJYSxzQkFBc0I7SUFKbkM7UUFLVSxRQUFHLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBbUNsQztJQXJCQyxXQUFXO1FBQ1QsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUE0QixDQUFDO1FBQ3JELElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYTtZQUFFLE9BQU87UUFFM0MsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzVDLE1BQU0sVUFBVSxHQUFHLE1BQU0sRUFBRSxDQUFDLEdBQUcsSUFBSSxJQUFJLE1BQU0sT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVELE1BQU0sTUFBTSxHQUFHLE1BQU0sRUFBRSxDQUFDLEdBQUcsSUFBSSxJQUFJLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXpELElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDekIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1NBQzdEO1FBRUQsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNyQixNQUFNLFNBQVMsR0FBRyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVqRCxLQUFLLE1BQU0sSUFBSSxJQUFJLFNBQVMsRUFBRTtnQkFDNUIsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQzNELE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQzthQUN2QztTQUNGO0lBQ0gsQ0FBQzsrR0FuQ1Usc0JBQXNCO21HQUF0QixzQkFBc0I7O1NBQXRCLHNCQUFzQjs0RkFBdEIsc0JBQXNCO2tCQUpsQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFVBQVUsRUFBRSxJQUFJO2lCQUNqQjs4QkFJVSxhQUFhO3NCQUFyQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBpbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sQ29uZmlnIH0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7IGdldENsYXNzTGlzdEZyb21TdHJpbmcgfSBmcm9tICcuLi91dGlsaXRpZXMvZ2V0LWNsYXNzLWxpc3QtZnJvbS1zdHJpbmcnO1xuaW1wb3J0IHsgZ2V0U3R5bGVMaXN0RnJvbVN0cmluZyB9IGZyb20gJy4uL3V0aWxpdGllcy9nZXQtc3R5bGUtbGlzdC1mcm9tLXN0cmluZyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjb250cm9sTGF5b3V0XScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG59KVxuZXhwb3J0IGNsYXNzIENvbnRyb2xMYXlvdXREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBwcml2YXRlIF9lbCA9IGluamVjdChFbGVtZW50UmVmKTtcblxuICBASW5wdXQoKSBjb250cm9sTGF5b3V0Pzoge1xuICAgIHR5cGU/OlxuICAgICAgfCAnaG9zdCdcbiAgICAgIHwgJ2xhYmVsJ1xuICAgICAgfCAnY29udGVudCdcbiAgICAgIHwgJ2Zvcm1Hcm91cCdcbiAgICAgIHwgJ2Rlc2NyaXB0aW9uJ1xuICAgICAgfCAnaW5wdXRBcmVhJ1xuICAgICAgfCAnZXJyb3InO1xuICAgIGxheW91dD86IEZvcm1Db250cm9sQ29uZmlnWydsYXlvdXQnXTtcbiAgfTtcblxuICBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcbiAgICBjb25zdCBob3N0RWwgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xuICAgIGlmICghaG9zdEVsIHx8ICF0aGlzLmNvbnRyb2xMYXlvdXQpIHJldHVybjtcblxuICAgIGNvbnN0IHsgdHlwZSwgbGF5b3V0IH0gPSB0aGlzLmNvbnRyb2xMYXlvdXQ7XG4gICAgY29uc3QgY2xhc3NOYW1lcyA9IGxheW91dD8uW2Ake3R5cGUgPz8gJ2hvc3QnfUNsYXNzYF0gPz8gJyc7XG4gICAgY29uc3Qgc3R5bGVzID0gbGF5b3V0Py5bYCR7dHlwZSA/PyAnaG9zdCd9U3R5bGVzYF0gPz8gJyc7XG5cbiAgICBpZiAoY2xhc3NOYW1lcy5sZW5ndGggPiAwKSB7XG4gICAgICBob3N0RWwuY2xhc3NMaXN0LmFkZCguLi5nZXRDbGFzc0xpc3RGcm9tU3RyaW5nKGNsYXNzTmFtZXMpKTtcbiAgICB9XG5cbiAgICBpZiAoc3R5bGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHN0eWxlTGlzdCA9IGdldFN0eWxlTGlzdEZyb21TdHJpbmcoc3R5bGVzKTtcblxuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHN0eWxlTGlzdCkge1xuICAgICAgICBjb25zdCBbbmFtZSwgdmFsdWVdID0gaXRlbS5zcGxpdCgnOicpLm1hcCgoeCkgPT4geC50cmltKCkpO1xuICAgICAgICBob3N0RWwuc3R5bGUuc2V0UHJvcGVydHkobmFtZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19