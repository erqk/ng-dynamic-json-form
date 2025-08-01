import { ChangeDetectorRef, Directive, ElementRef, Injector, Input, SimpleChange, inject, } from '@angular/core';
import { PROPS_BINDING_INJECTORS } from '../providers/props-binding.provider';
import * as i0 from "@angular/core";
class PropsBindingDirective {
    constructor() {
        this._injectionTokens = inject(PROPS_BINDING_INJECTORS, {
            optional: true,
        });
        this._injector = inject(Injector);
        this._cd = inject(ChangeDetectorRef);
        this._el = inject(ElementRef);
        /**
         * Must ensure the view is initialized before applying any properties binding
         */
        this._isViewInitialized = false;
    }
    ngOnChanges() {
        if (!this._isViewInitialized)
            return;
        this._bindProperties();
    }
    ngAfterViewInit() {
        this._isViewInitialized = true;
        this._bindProperties();
    }
    _bindProperties() {
        const propsBinding = (this.propsBinding ?? []).filter((x) => {
            return (Boolean(x) &&
                typeof x.props === 'object' &&
                Object.keys(x.props).length > 0);
        });
        if (!propsBinding.length) {
            return;
        }
        const host = this._el.nativeElement;
        for (const item of propsBinding) {
            const { props, key, omit = [] } = item;
            const providerToken = this._injectionTokens?.find((x) => x.key === key)?.token;
            const target = !providerToken ? null : this._injector.get(providerToken);
            for (const key in props) {
                const value = props[key];
                if (value === undefined || omit.includes(key)) {
                    continue;
                }
                if (target) {
                    this.updateComponentProperty({ component: target, key, value });
                    continue;
                }
                if (host) {
                    // Only set CSS custom properties (starting with --) or valid HTML attributes
                    if (key.startsWith('--')) {
                        host.style.setProperty(key, value);
                    }
                    else if (this.isValidHtmlAttribute(key)) {
                        host.setAttribute(key, value);
                    }
                }
            }
        }
        this._cd.markForCheck();
        this._cd.detectChanges();
    }
    updateComponentProperty(data) {
        const { component, key, value } = data;
        const hasProperty = this.hasProperty(component, key);
        if (!hasProperty) {
            return;
        }
        const property = component[key];
        if (typeof property?.set === 'function') {
            property.set(value);
        }
        else {
            component[key] = value;
        }
        // For compatibility
        if (component['ngOnChanges']) {
            const simpleChange = new SimpleChange(undefined, value, true);
            component.ngOnChanges({ [key]: simpleChange });
        }
    }
    hasProperty(obj, key) {
        return Object.hasOwn(obj, key) || key in obj;
    }
    isValidHtmlAttribute(attributeName) {
        // Common HTML attributes - this is not exhaustive but covers most use cases
        const validAttributes = new Set([
            'id',
            'class',
            'style',
            'title',
            'lang',
            'dir',
            'hidden',
            'tabindex',
            'accesskey',
            'contenteditable',
            'draggable',
            'spellcheck',
            'translate',
            'role',
            'aria-label',
            'aria-labelledby',
            'aria-describedby',
            'aria-hidden',
            'aria-expanded',
            'aria-selected',
            'aria-checked',
            'aria-disabled',
            'data-testid',
            'disabled',
            'readonly',
            'required',
            'placeholder',
            'value',
            'checked',
            'selected',
            'multiple',
            'size',
            'rows',
            'cols',
            'min',
            'max',
            'step',
            'pattern',
            'minlength',
            'maxlength',
            'src',
            'alt',
            'href',
            'target',
            'rel',
            'type',
            'name',
            'for',
        ]);
        // Allow data-* and aria-* attributes
        return (validAttributes.has(attributeName.toLowerCase()) ||
            attributeName.startsWith('data-') ||
            attributeName.startsWith('aria-'));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PropsBindingDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: PropsBindingDirective, isStandalone: true, selector: "[propsBinding]", inputs: { propsBinding: "propsBinding" }, usesOnChanges: true, ngImport: i0 }); }
}
export { PropsBindingDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PropsBindingDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[propsBinding]',
                    standalone: true,
                }]
        }], propDecorators: { propsBinding: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcHMtYmluZGluZy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvY29yZS9kaXJlY3RpdmVzL3Byb3BzLWJpbmRpbmcuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixRQUFRLEVBQ1IsS0FBSyxFQUNMLFlBQVksRUFDWixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0scUNBQXFDLENBQUM7O0FBQzlFLE1BSWEscUJBQXFCO0lBSmxDO1FBS1UscUJBQWdCLEdBQUcsTUFBTSxDQUFDLHVCQUF1QixFQUFFO1lBQ3pELFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQyxDQUFDO1FBQ0ssY0FBUyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QixRQUFHLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDaEMsUUFBRyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqQzs7V0FFRztRQUNLLHVCQUFrQixHQUFHLEtBQUssQ0FBQztLQTJKcEM7SUF2SkMsV0FBVztRQUNULElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCO1lBQUUsT0FBTztRQUNyQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRU8sZUFBZTtRQUNyQixNQUFNLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDMUQsT0FBTyxDQUNMLE9BQU8sQ0FBQyxDQUFDLENB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QUFyQixxQkFBcUI7O1NBQXJCLHFCQUFxQjs0RkFBckIscUJBQXFCO2tCQUpqQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFVBQVUsRUFBRSxJQUFJO2lCQUNqQjs4QkFhVSxZQUFZO3NCQUFwQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0b3IsXG4gIElucHV0LFxuICBTaW1wbGVDaGFuZ2UsXG4gIGluamVjdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQUk9QU19CSU5ESU5HX0lOSkVDVE9SUyB9IGZyb20gJy4uL3Byb3ZpZGVycy9wcm9wcy1iaW5kaW5nLnByb3ZpZGVyJztcbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1twcm9wc0JpbmRpbmddJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbn0pXG5leHBvcnQgY2xhc3MgUHJvcHNCaW5kaW5nRGlyZWN0aXZlIHtcbiAgcHJpdmF0ZSBfaW5qZWN0aW9uVG9rZW5zID0gaW5qZWN0KFBST1BTX0JJTkRJTkdfSU5KRUNUT1JTLCB7XG4gICAgb3B0aW9uYWw6IHRydWUsXG4gIH0pO1xuICBwcml2YXRlIF9pbmplY3RvciA9IGluamVjdChJbmplY3Rvcik7XG4gIHByaXZhdGUgX2NkID0gaW5qZWN0KENoYW5nZURldGVjdG9yUmVmKTtcbiAgcHJpdmF0ZSBfZWwgPSBpbmplY3QoRWxlbWVudFJlZik7XG4gIC8qKlxuICAgKiBNdXN0IGVuc3VyZSB0aGUgdmlldyBpcyBpbml0aWFsaXplZCBiZWZvcmUgYXBwbHlpbmcgYW55IHByb3BlcnRpZXMgYmluZGluZ1xuICAgKi9cbiAgcHJpdmF0ZSBfaXNWaWV3SW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICBASW5wdXQoKSBwcm9wc0JpbmRpbmc/OiB7IHByb3BzOiBhbnk7IGtleT86IHN0cmluZzsgb21pdD86IHN0cmluZ1tdIH1bXTtcblxuICBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2lzVmlld0luaXRpYWxpemVkKSByZXR1cm47XG4gICAgdGhpcy5fYmluZFByb3BlcnRpZXMoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9pc1ZpZXdJbml0aWFsaXplZCA9IHRydWU7XG4gICAgdGhpcy5fYmluZFByb3BlcnRpZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2JpbmRQcm9wZXJ0aWVzKCk6IHZvaWQge1xuICAgIGNvbnN0IHByb3BzQmluZGluZyA9ICh0aGlzLnByb3BzQmluZGluZyA/PyBbXSkuZmlsdGVyKCh4KSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBCb29sZWFuKHgpICYmXG4gICAgICAgIHR5cGVvZiB4LnByb3BzID09PSAnb2JqZWN0JyAmJlxuICAgICAgICBPYmplY3Qua2V5cyh4LnByb3BzKS5sZW5ndGggPiAwXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaWYgKCFwcm9wc0JpbmRpbmcubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaG9zdCA9IHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQ7XG5cbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgcHJvcHNCaW5kaW5nKSB7XG4gICAgICBjb25zdCB7IHByb3BzLCBrZXksIG9taXQgPSBbXSB9ID0gaXRlbTtcbiAgICAgIGNvbnN0IHByb3ZpZGVyVG9rZW4gPSB0aGlzLl9pbmplY3Rpb25Ub2tlbnM/LmZpbmQoXG4gICAgICAgICh4KSA9PiB4LmtleSA9PT0ga2V5XG4gICAgICApPy50b2tlbjtcblxuICAgICAgY29uc3QgdGFyZ2V0ID0gIXByb3ZpZGVyVG9rZW4gPyBudWxsIDogdGhpcy5faW5qZWN0b3IuZ2V0KHByb3ZpZGVyVG9rZW4pO1xuXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBwcm9wcykge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHByb3BzW2tleV07XG5cbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgb21pdC5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVDb21wb25lbnRQcm9wZXJ0eSh7IGNvbXBvbmVudDogdGFyZ2V0LCBrZXksIHZhbHVlIH0pO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhvc3QpIHtcbiAgICAgICAgICAvLyBPbmx5IHNldCBDU1MgY3VzdG9tIHByb3BlcnRpZXMgKHN0YXJ0aW5nIHdpdGggLS0pIG9yIHZhbGlkIEhUTUwgYXR0cmlidXRlc1xuICAgICAgICAgIGlmIChrZXkuc3RhcnRzV2l0aCgnLS0nKSkge1xuICAgICAgICAgICAgaG9zdC5zdHlsZS5zZXRQcm9wZXJ0eShrZXksIHZhbHVlKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNWYWxpZEh0bWxBdHRyaWJ1dGUoa2V5KSkge1xuICAgICAgICAgICAgaG9zdC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5fY2QubWFya0ZvckNoZWNrKCk7XG4gICAgdGhpcy5fY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVDb21wb25lbnRQcm9wZXJ0eShkYXRhOiB7XG4gICAgY29tcG9uZW50OiBhbnk7XG4gICAga2V5OiBhbnk7XG4gICAgdmFsdWU6IGFueTtcbiAgfSk6IHZvaWQge1xuICAgIGNvbnN0IHsgY29tcG9uZW50LCBrZXksIHZhbHVlIH0gPSBkYXRhO1xuICAgIGNvbnN0IGhhc1Byb3BlcnR5ID0gdGhpcy5oYXNQcm9wZXJ0eShjb21wb25lbnQsIGtleSk7XG5cbiAgICBpZiAoIWhhc1Byb3BlcnR5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcHJvcGVydHkgPSBjb21wb25lbnRba2V5XTtcblxuICAgIGlmICh0eXBlb2YgKHByb3BlcnR5IGFzIGFueSk/LnNldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgKHByb3BlcnR5IGFzIGFueSkuc2V0KHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29tcG9uZW50W2tleV0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvLyBGb3IgY29tcGF0aWJpbGl0eVxuICAgIGlmIChjb21wb25lbnRbJ25nT25DaGFuZ2VzJ10pIHtcbiAgICAgIGNvbnN0IHNpbXBsZUNoYW5nZSA9IG5ldyBTaW1wbGVDaGFuZ2UodW5kZWZpbmVkLCB2YWx1ZSwgdHJ1ZSk7XG4gICAgICBjb21wb25lbnQubmdPbkNoYW5nZXMoeyBba2V5XTogc2ltcGxlQ2hhbmdlIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGFzUHJvcGVydHkob2JqOiBhbnksIGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIE9iamVjdC5oYXNPd24ob2JqLCBrZXkpIHx8IGtleSBpbiBvYmo7XG4gIH1cblxuICBwcml2YXRlIGlzVmFsaWRIdG1sQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIC8vIENvbW1vbiBIVE1MIGF0dHJpYnV0ZXMgLSB0aGlzIGlzIG5vdCBleGhhdXN0aXZlIGJ1dCBjb3ZlcnMgbW9zdCB1c2UgY2FzZXNcbiAgICBjb25zdCB2YWxpZEF0dHJpYnV0ZXMgPSBuZXcgU2V0KFtcbiAgICAgICdpZCcsXG4gICAgICAnY2xhc3MnLFxuICAgICAgJ3N0eWxlJyxcbiAgICAgICd0aXRsZScsXG4gICAgICAnbGFuZycsXG4gICAgICAnZGlyJyxcbiAgICAgICdoaWRkZW4nLFxuICAgICAgJ3RhYmluZGV4JyxcbiAgICAgICdhY2Nlc3NrZXknLFxuICAgICAgJ2NvbnRlbnRlZGl0YWJsZScsXG4gICAgICAnZHJhZ2dhYmxlJyxcbiAgICAgICdzcGVsbGNoZWNrJyxcbiAgICAgICd0cmFuc2xhdGUnLFxuICAgICAgJ3JvbGUnLFxuICAgICAgJ2FyaWEtbGFiZWwnLFxuICAgICAgJ2FyaWEtbGFiZWxsZWRieScsXG4gICAgICAnYXJpYS1kZXNjcmliZWRieScsXG4gICAgICAnYXJpYS1oaWRkZW4nLFxuICAgICAgJ2FyaWEtZXhwYW5kZWQnLFxuICAgICAgJ2FyaWEtc2VsZWN0ZWQnLFxuICAgICAgJ2FyaWEtY2hlY2tlZCcsXG4gICAgICAnYXJpYS1kaXNhYmxlZCcsXG4gICAgICAnZGF0YS10ZXN0aWQnLFxuICAgICAgJ2Rpc2FibGVkJyxcbiAgICAgICdyZWFkb25seScsXG4gICAgICAncmVxdWlyZWQnLFxuICAgICAgJ3BsYWNlaG9sZGVyJyxcbiAgICAgICd2YWx1ZScsXG4gICAgICAnY2hlY2tlZCcsXG4gICAgICAnc2VsZWN0ZWQnLFxuICAgICAgJ211bHRpcGxlJyxcbiAgICAgICdzaXplJyxcbiAgICAgICdyb3dzJyxcbiAgICAgICdjb2xzJyxcbiAgICAgICdtaW4nLFxuICAgICAgJ21heCcsXG4gICAgICAnc3RlcCcsXG4gICAgICAncGF0dGVybicsXG4gICAgICAnbWlubGVuZ3RoJyxcbiAgICAgICdtYXhsZW5ndGgnLFxuICAgICAgJ3NyYycsXG4gICAgICAnYWx0JyxcbiAgICAgICdocmVmJyxcbiAgICAgICd0YXJnZXQnLFxuICAgICAgJ3JlbCcsXG4gICAgICAndHlwZScsXG4gICAgICAnbmFtZScsXG4gICAgICAnZm9yJyxcbiAgICBdKTtcblxuICAgIC8vIEFsbG93IGRhdGEtKiBhbmQgYXJpYS0qIGF0dHJpYnV0ZXNcbiAgICByZXR1cm4gKFxuICAgICAgdmFsaWRBdHRyaWJ1dGVzLmhhcyhhdHRyaWJ1dGVOYW1lLnRvTG93ZXJDYXNlKCkpIHx8XG4gICAgICBhdHRyaWJ1dGVOYW1lLnN0YXJ0c1dpdGgoJ2RhdGEtJykgfHxcbiAgICAgIGF0dHJpYnV0ZU5hbWUuc3RhcnRzV2l0aCgnYXJpYS0nKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==