import { CommonModule } from '@angular/common';
import { Component, DestroyRef, HostBinding, HostListener, Input, ViewChild, ViewContainerRef, inject, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, fromEvent, tap } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
class FormLabelComponent {
    constructor() {
        this._destroyRef = inject(DestroyRef);
        this._viewInitialized = false;
        this._collapsibleElCssText = '';
        this.collapsible = false;
        this.expand = false;
        this.toggle = (value) => {
            if (!this._collapsible)
                return;
            this.expand = value ?? !this.expand;
            this._setElementHeight();
            if (this._componentRef) {
                this._componentRef.expand = this.expand;
            }
        };
    }
    get styleDisplay() {
        if (!this.label)
            return null;
        if (this.customComponent)
            return null;
        return this._collapsible ? 'flex' : 'inline-block';
    }
    get styleCursor() {
        return this._collapsible ? 'pointer' : 'normal';
    }
    onClick() {
        this.toggle();
    }
    ngOnChanges(simpleChanges) {
        if (!this._viewInitialized)
            return;
        const { state } = simpleChanges;
        if (state && this._collapsible) {
            switch (this.state) {
                case 'collapse':
                    this.toggle(false);
                    break;
                case 'expand':
                    this.toggle(true);
                    break;
            }
        }
    }
    ngOnInit() {
        this.collapsible = this._collapsible;
        this.expand =
            this.state === undefined
                ? this.layout?.contentCollapsible === 'expand'
                : this.state === 'expand';
    }
    ngAfterViewInit() {
        if (this.customComponent) {
            this._injectComponent();
            return;
        }
        this._initCollapsibleEl();
        this._viewInitialized = true;
    }
    _injectComponent() {
        if (!this.componentAnchor || !this.customComponent) {
            return;
        }
        const componentRef = this.componentAnchor.createComponent(this.customComponent);
        componentRef.instance.label = this.label;
        componentRef.instance.layout = this.layout;
        componentRef.instance.props = this.props;
        componentRef.instance.collapsible = this._collapsible;
        componentRef.instance.expand = this.expand;
        this._initCollapsibleEl();
        this._componentRef = componentRef.instance;
    }
    _listenTransition() {
        if (!this.collapsibleEl) {
            return;
        }
        const transitionEnd$ = fromEvent(this.collapsibleEl, 'transitionend', {
            passive: true,
        }).pipe(filter(() => this.expand), tap(() => {
            this.collapsibleEl?.classList.remove(...['height', 'overflow']);
        }));
        transitionEnd$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe();
    }
    _setElementHeight() {
        this._setExpandStyle();
        if (!this.expand) {
            requestAnimationFrame(() => this._setCollapseStyle());
        }
    }
    _initCollapsibleEl() {
        if (!this.collapsibleEl || !this.collapsible) {
            return;
        }
        this._collapsibleElCssText = this.collapsibleEl.style.cssText || '';
        this.collapsibleEl.classList.add('collapsible-container');
        this._listenTransition();
        if (!this.expand) {
            this._setCollapseStyle();
        }
    }
    _setCollapseStyle() {
        const stylesToRemove = ['border', 'padding', 'margin'];
        stylesToRemove.forEach((style) => {
            if (!this._collapsibleElCssText.includes(style))
                return;
            this.collapsibleEl?.style.removeProperty(style);
        });
        this.collapsibleEl?.style.setProperty('overflow', 'hidden');
        this.collapsibleEl?.style.setProperty('height', '0px');
    }
    _setExpandStyle() {
        const height = !this.collapsibleEl
            ? 0
            : this.collapsibleEl.scrollHeight + 1;
        // Set existing styles from collapsible element first
        if (this._collapsibleElCssText) {
            this.collapsibleEl?.setAttribute('style', this._collapsibleElCssText);
        }
        // Then set height later to overwrite height style
        this.collapsibleEl?.style.setProperty('height', `${height}px`);
    }
    get _collapsible() {
        return (this.layout?.contentCollapsible === 'collapse' ||
            this.layout?.contentCollapsible === 'expand');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormLabelComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: FormLabelComponent, isStandalone: true, selector: "form-label", inputs: { label: "label", layout: "layout", props: "props", collapsibleEl: "collapsibleEl", state: "state", customComponent: "customComponent", customTemplate: "customTemplate" }, host: { listeners: { "click": "onClick($event)" }, properties: { "style.display": "this.styleDisplay", "style.cursor": "this.styleCursor" }, classAttribute: "form-label" }, viewQueries: [{ propertyName: "componentAnchor", first: true, predicate: ["componentAnchor"], descendants: true, read: ViewContainerRef }], usesOnChanges: true, ngImport: i0, template: "<ng-container *ngIf=\"!customComponent && !customTemplate\">\n  <span class=\"text\">{{ label }}</span>\n\n  <ng-container *ngIf=\"collapsible\">\n    <span\n      style=\"margin-left: auto\"\n      [ngStyle]=\"{\n        transform: !expand ? 'rotate(-180deg)' : 'rotate(0deg)',\n      }\"\n    >\n      <!-- prettier-ignore -->\n      <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1em\" height=\"1em\" fill=\"currentColor\" class=\"bi bi-chevron-up\" viewBox=\"0 0 16 16\">\n          <path fill-rule=\"evenodd\" d=\"M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z\"/>\n        </svg>\n    </span>\n  </ng-container>\n</ng-container>\n\n<ng-container #componentAnchor></ng-container>\n\n<ng-container\n  *ngIf=\"customTemplate\"\n  [ngTemplateOutlet]=\"customTemplate\"\n  [ngTemplateOutletContext]=\"{\n    label,\n    layout,\n    toggle,\n    collapsible,\n    expand,\n    props\n  }\"\n></ng-container>\n", styles: [":host{align-items:center;gap:1rem}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] }); }
}
export { FormLabelComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormLabelComponent, decorators: [{
            type: Component,
            args: [{ selector: 'form-label', standalone: true, imports: [CommonModule], host: {
                        class: 'form-label',
                    }, template: "<ng-container *ngIf=\"!customComponent && !customTemplate\">\n  <span class=\"text\">{{ label }}</span>\n\n  <ng-container *ngIf=\"collapsible\">\n    <span\n      style=\"margin-left: auto\"\n      [ngStyle]=\"{\n        transform: !expand ? 'rotate(-180deg)' : 'rotate(0deg)',\n      }\"\n    >\n      <!-- prettier-ignore -->\n      <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1em\" height=\"1em\" fill=\"currentColor\" class=\"bi bi-chevron-up\" viewBox=\"0 0 16 16\">\n          <path fill-rule=\"evenodd\" d=\"M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z\"/>\n        </svg>\n    </span>\n  </ng-container>\n</ng-container>\n\n<ng-container #componentAnchor></ng-container>\n\n<ng-container\n  *ngIf=\"customTemplate\"\n  [ngTemplateOutlet]=\"customTemplate\"\n  [ngTemplateOutletContext]=\"{\n    label,\n    layout,\n    toggle,\n    collapsible,\n    expand,\n    props\n  }\"\n></ng-container>\n", styles: [":host{align-items:center;gap:1rem}\n"] }]
        }], propDecorators: { label: [{
                type: Input
            }], layout: [{
                type: Input
            }], props: [{
                type: Input
            }], collapsibleEl: [{
                type: Input
            }], state: [{
                type: Input
            }], customComponent: [{
                type: Input
            }], customTemplate: [{
                type: Input
            }], componentAnchor: [{
                type: ViewChild,
                args: ['componentAnchor', { read: ViewContainerRef }]
            }], styleDisplay: [{
                type: HostBinding,
                args: ['style.display']
            }], styleCursor: [{
                type: HostBinding,
                args: ['style.cursor']
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1sYWJlbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWIvY29yZS9jb21wb25lbnRzL2Zvcm0tbGFiZWwvZm9ybS1sYWJlbC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9saWIvY29yZS9jb21wb25lbnRzL2Zvcm0tbGFiZWwvZm9ybS1sYWJlbC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsV0FBVyxFQUNYLFlBQVksRUFDWixLQUFLLEVBSUwsU0FBUyxFQUNULGdCQUFnQixFQUNoQixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDaEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7QUFLOUMsTUFVYSxrQkFBa0I7SUFWL0I7UUFXVSxnQkFBVyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqQyxxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDekIsMEJBQXFCLEdBQUcsRUFBRSxDQUFDO1FBZ0NuQyxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRWYsV0FBTSxHQUFHLENBQUMsS0FBZSxFQUFFLEVBQUU7WUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZO2dCQUFFLE9BQU87WUFFL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBRXpCLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDdEIsSUFB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NkZEVFksWUFBWTs7U0FPWCxrQkFBa0I7NEZBQWxCLGtCQUFrQjtrQkFWOUIsU0FBUzsrQkFDRSxZQUFZLGNBQ1YsSUFBSSxXQUNQLENBQUMsWUFBWSxDQUFDLFFBR2pCO3dCQUNKLEtBQUssRUFBRSxZQUFZO3FCQUNwQjs4QkFRUSxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUlHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBR04sZUFBZTtzQkFEZCxTQUFTO3VCQUFDLGlCQUFpQixFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFO2dCQUd0QixZQUFZO3NCQUE3QyxXQUFXO3VCQUFDLGVBQWU7Z0JBTUssV0FBVztzQkFBM0MsV0FBVzt1QkFBQyxjQUFjO2dCQUszQixPQUFPO3NCQUROLFlBQVk7dUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRGVzdHJveVJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBUeXBlLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIGluamVjdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0YWtlVW50aWxEZXN0cm95ZWQgfSBmcm9tICdAYW5ndWxhci9jb3JlL3J4anMtaW50ZXJvcCc7XG5pbXBvcnQgeyBmaWx0ZXIsIGZyb21FdmVudCwgdGFwIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbENvbmZpZyB9IGZyb20gJy4uLy4uL21vZGVscyc7XG5pbXBvcnQgeyBGb3JtTGF5b3V0IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2Zvcm0tbGF5b3V0LmludGVyZmFjZSc7XG5pbXBvcnQgeyBDdXN0b21Gb3JtTGFiZWwgfSBmcm9tICcuLi9jdXN0b20tZm9ybS1sYWJlbC9jdXN0b20tZm9ybS1sYWJlbC5hYnN0cmFjdCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Zvcm0tbGFiZWwnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgdGVtcGxhdGVVcmw6ICcuL2Zvcm0tbGFiZWwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9mb3JtLWxhYmVsLmNvbXBvbmVudC5zY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2Zvcm0tbGFiZWwnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtTGFiZWxDb21wb25lbnQge1xuICBwcml2YXRlIF9kZXN0cm95UmVmID0gaW5qZWN0KERlc3Ryb3lSZWYpO1xuICBwcml2YXRlIF92aWV3SW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfY29sbGFwc2libGVFbENzc1RleHQgPSAnJztcbiAgcHJpdmF0ZSBfY29tcG9uZW50UmVmPzogQ3VzdG9tRm9ybUxhYmVsO1xuXG4gIEBJbnB1dCgpIGxhYmVsPzogc3RyaW5nO1xuICBASW5wdXQoKSBsYXlvdXQ/OiBGb3JtQ29udHJvbENvbmZpZ1snbGF5b3V0J107XG4gIEBJbnB1dCgpIHByb3BzPzogRm9ybUNvbnRyb2xDb25maWdbJ3Byb3BzJ107XG4gIEBJbnB1dCgpIGNvbGxhcHNpYmxlRWw/OiBIVE1MRWxlbWVudDtcbiAgLyoqXG4gICAqIFN0YXRlIGNvbWVzIGZyb20gcm9vdCwgdG8gb3ZlcndyaXRlIGFsbCB0aGUgY29sbGFwc2libGUgc3RhdGVcbiAgICovXG4gIEBJbnB1dCgpIHN0YXRlPzogRm9ybUxheW91dFsnY29udGVudENvbGxhcHNpYmxlJ107XG4gIEBJbnB1dCgpIGN1c3RvbUNvbXBvbmVudD86IFR5cGU8Q3VzdG9tRm9ybUxhYmVsPjtcbiAgQElucHV0KCkgY3VzdG9tVGVtcGxhdGU/OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBWaWV3Q2hpbGQoJ2NvbXBvbmVudEFuY2hvcicsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KVxuICBjb21wb25lbnRBbmNob3I/OiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuZGlzcGxheScpIGdldCBzdHlsZURpc3BsYXkoKSB7XG4gICAgaWYgKCF0aGlzLmxhYmVsKSByZXR1cm4gbnVsbDtcbiAgICBpZiAodGhpcy5jdXN0b21Db21wb25lbnQpIHJldHVybiBudWxsO1xuXG4gICAgcmV0dXJuIHRoaXMuX2NvbGxhcHNpYmxlID8gJ2ZsZXgnIDogJ2lubGluZS1ibG9jayc7XG4gIH1cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5jdXJzb3InKSBnZXQgc3R5bGVDdXJzb3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbGxhcHNpYmxlID8gJ3BvaW50ZXInIDogJ25vcm1hbCc7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIG9uQ2xpY2soKTogdm9pZCB7XG4gICAgdGhpcy50b2dnbGUoKTtcbiAgfVxuXG4gIGNvbGxhcHNpYmxlID0gZmFsc2U7XG4gIGV4cGFuZCA9IGZhbHNlO1xuXG4gIHRvZ2dsZSA9ICh2YWx1ZT86IGJvb2xlYW4pID0+IHtcbiAgICBpZiAoIXRoaXMuX2NvbGxhcHNpYmxlKSByZXR1cm47XG5cbiAgICB0aGlzLmV4cGFuZCA9IHZhbHVlID8/ICF0aGlzLmV4cGFuZDtcbiAgICB0aGlzLl9zZXRFbGVtZW50SGVpZ2h0KCk7XG5cbiAgICBpZiAodGhpcy5fY29tcG9uZW50UmVmKSB7XG4gICAgICB0aGlzLl9jb21wb25lbnRSZWYuZXhwYW5kID0gdGhpcy5leHBhbmQ7XG4gICAgfVxuICB9O1xuXG4gIG5nT25DaGFuZ2VzKHNpbXBsZUNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX3ZpZXdJbml0aWFsaXplZCkgcmV0dXJuO1xuXG4gICAgY29uc3QgeyBzdGF0ZSB9ID0gc2ltcGxlQ2hhbmdlcztcblxuICAgIGlmIChzdGF0ZSAmJiB0aGlzLl9jb2xsYXBzaWJsZSkge1xuICAgICAgc3dpdGNoICh0aGlzLnN0YXRlKSB7XG4gICAgICAgIGNhc2UgJ2NvbGxhcHNlJzpcbiAgICAgICAgICB0aGlzLnRvZ2dsZShmYWxzZSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnZXhwYW5kJzpcbiAgICAgICAgICB0aGlzLnRvZ2dsZSh0cnVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbGxhcHNpYmxlID0gdGhpcy5fY29sbGFwc2libGU7XG4gICAgdGhpcy5leHBhbmQgPVxuICAgICAgdGhpcy5zdGF0ZSA9PT0gdW5kZWZpbmVkXG4gICAgICAgID8gdGhpcy5sYXlvdXQ/LmNvbnRlbnRDb2xsYXBzaWJsZSA9PT0gJ2V4cGFuZCdcbiAgICAgICAgOiB0aGlzLnN0YXRlID09PSAnZXhwYW5kJztcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jdXN0b21Db21wb25lbnQpIHtcbiAgICAgIHRoaXMuX2luamVjdENvbXBvbmVudCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2luaXRDb2xsYXBzaWJsZUVsKCk7XG4gICAgdGhpcy5fdmlld0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2luamVjdENvbXBvbmVudCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY29tcG9uZW50QW5jaG9yIHx8ICF0aGlzLmN1c3RvbUNvbXBvbmVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMuY29tcG9uZW50QW5jaG9yLmNyZWF0ZUNvbXBvbmVudChcbiAgICAgIHRoaXMuY3VzdG9tQ29tcG9uZW50XG4gICAgKTtcblxuICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZS5sYWJlbCA9IHRoaXMubGFiZWw7XG4gICAgY29tcG9uZW50UmVmLmluc3RhbmNlLmxheW91dCA9IHRoaXMubGF5b3V0O1xuICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZS5wcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgY29tcG9uZW50UmVmLmluc3RhbmNlLmNvbGxhcHNpYmxlID0gdGhpcy5fY29sbGFwc2libGU7XG4gICAgY29tcG9uZW50UmVmLmluc3RhbmNlLmV4cGFuZCA9IHRoaXMuZXhwYW5kO1xuXG4gICAgdGhpcy5faW5pdENvbGxhcHNpYmxlRWwoKTtcbiAgICB0aGlzLl9jb21wb25lbnRSZWYgPSBjb21wb25lbnRSZWYuaW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIF9saXN0ZW5UcmFuc2l0aW9uKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jb2xsYXBzaWJsZUVsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdHJhbnNpdGlvbkVuZCQgPSBmcm9tRXZlbnQodGhpcy5jb2xsYXBzaWJsZUVsLCAndHJhbnNpdGlvbmVuZCcsIHtcbiAgICAgIHBhc3NpdmU6IHRydWUsXG4gICAgfSkucGlwZShcbiAgICAgIGZpbHRlcigoKSA9PiB0aGlzLmV4cGFuZCksXG4gICAgICB0YXAoKCkgPT4ge1xuICAgICAgICB0aGlzLmNvbGxhcHNpYmxlRWw/LmNsYXNzTGlzdC5yZW1vdmUoLi4uWydoZWlnaHQnLCAnb3ZlcmZsb3cnXSk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0cmFuc2l0aW9uRW5kJC5waXBlKHRha2VVbnRpbERlc3Ryb3llZCh0aGlzLl9kZXN0cm95UmVmKSkuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRFbGVtZW50SGVpZ2h0KCk6IHZvaWQge1xuICAgIHRoaXMuX3NldEV4cGFuZFN0eWxlKCk7XG5cbiAgICBpZiAoIXRoaXMuZXhwYW5kKSB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5fc2V0Q29sbGFwc2VTdHlsZSgpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pbml0Q29sbGFwc2libGVFbCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY29sbGFwc2libGVFbCB8fCAhdGhpcy5jb2xsYXBzaWJsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2NvbGxhcHNpYmxlRWxDc3NUZXh0ID0gdGhpcy5jb2xsYXBzaWJsZUVsLnN0eWxlLmNzc1RleHQgfHwgJyc7XG4gICAgdGhpcy5jb2xsYXBzaWJsZUVsLmNsYXNzTGlzdC5hZGQoJ2NvbGxhcHNpYmxlLWNvbnRhaW5lcicpO1xuICAgIHRoaXMuX2xpc3RlblRyYW5zaXRpb24oKTtcblxuICAgIGlmICghdGhpcy5leHBhbmQpIHtcbiAgICAgIHRoaXMuX3NldENvbGxhcHNlU3R5bGUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zZXRDb2xsYXBzZVN0eWxlKCk6IHZvaWQge1xuICAgIGNvbnN0IHN0eWxlc1RvUmVtb3ZlID0gWydib3JkZXInLCAncGFkZGluZycsICdtYXJnaW4nXTtcblxuICAgIHN0eWxlc1RvUmVtb3ZlLmZvckVhY2goKHN0eWxlKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuX2NvbGxhcHNpYmxlRWxDc3NUZXh0LmluY2x1ZGVzKHN0eWxlKSkgcmV0dXJuO1xuICAgICAgdGhpcy5jb2xsYXBzaWJsZUVsPy5zdHlsZS5yZW1vdmVQcm9wZXJ0eShzdHlsZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNvbGxhcHNpYmxlRWw/LnN0eWxlLnNldFByb3BlcnR5KCdvdmVyZmxvdycsICdoaWRkZW4nKTtcbiAgICB0aGlzLmNvbGxhcHNpYmxlRWw/LnN0eWxlLnNldFByb3BlcnR5KCdoZWlnaHQnLCAnMHB4Jyk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRFeHBhbmRTdHlsZSgpOiB2b2lkIHtcbiAgICBjb25zdCBoZWlnaHQgPSAhdGhpcy5jb2xsYXBzaWJsZUVsXG4gICAgICA/IDBcbiAgICAgIDogdGhpcy5jb2xsYXBzaWJsZUVsLnNjcm9sbEhlaWdodCArIDE7XG5cbiAgICAvLyBTZXQgZXhpc3Rpbmcgc3R5bGVzIGZyb20gY29sbGFwc2libGUgZWxlbWVudCBmaXJzdFxuICAgIGlmICh0aGlzLl9jb2xsYXBzaWJsZUVsQ3NzVGV4dCkge1xuICAgICAgdGhpcy5jb2xsYXBzaWJsZUVsPy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgdGhpcy5fY29sbGFwc2libGVFbENzc1RleHQpO1xuICAgIH1cblxuICAgIC8vIFRoZW4gc2V0IGhlaWdodCBsYXRlciB0byBvdmVyd3JpdGUgaGVpZ2h0IHN0eWxlXG4gICAgdGhpcy5jb2xsYXBzaWJsZUVsPy5zdHlsZS5zZXRQcm9wZXJ0eSgnaGVpZ2h0JywgYCR7aGVpZ2h0fXB4YCk7XG4gIH1cblxuICBwcml2YXRlIGdldCBfY29sbGFwc2libGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMubGF5b3V0Py5jb250ZW50Q29sbGFwc2libGUgPT09ICdjb2xsYXBzZScgfHxcbiAgICAgIHRoaXMubGF5b3V0Py5jb250ZW50Q29sbGFwc2libGUgPT09ICdleHBhbmQnXG4gICAgKTtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFjdXN0b21Db21wb25lbnQgJiYgIWN1c3RvbVRlbXBsYXRlXCI+XG4gIDxzcGFuIGNsYXNzPVwidGV4dFwiPnt7IGxhYmVsIH19PC9zcGFuPlxuXG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb2xsYXBzaWJsZVwiPlxuICAgIDxzcGFuXG4gICAgICBzdHlsZT1cIm1hcmdpbi1sZWZ0OiBhdXRvXCJcbiAgICAgIFtuZ1N0eWxlXT1cIntcbiAgICAgICAgdHJhbnNmb3JtOiAhZXhwYW5kID8gJ3JvdGF0ZSgtMTgwZGVnKScgOiAncm90YXRlKDBkZWcpJyxcbiAgICAgIH1cIlxuICAgID5cbiAgICAgIDwhLS0gcHJldHRpZXItaWdub3JlIC0tPlxuICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxZW1cIiBoZWlnaHQ9XCIxZW1cIiBmaWxsPVwiY3VycmVudENvbG9yXCIgY2xhc3M9XCJiaSBiaS1jaGV2cm9uLXVwXCIgdmlld0JveD1cIjAgMCAxNiAxNlwiPlxuICAgICAgICAgIDxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTcuNjQ2IDQuNjQ2YS41LjUgMCAwIDEgLjcwOCAwbDYgNmEuNS41IDAgMCAxLS43MDguNzA4TDggNS43MDdsLTUuNjQ2IDUuNjQ3YS41LjUgMCAwIDEtLjcwOC0uNzA4elwiLz5cbiAgICAgICAgPC9zdmc+XG4gICAgPC9zcGFuPlxuICA8L25nLWNvbnRhaW5lcj5cbjwvbmctY29udGFpbmVyPlxuXG48bmctY29udGFpbmVyICNjb21wb25lbnRBbmNob3I+PC9uZy1jb250YWluZXI+XG5cbjxuZy1jb250YWluZXJcbiAgKm5nSWY9XCJjdXN0b21UZW1wbGF0ZVwiXG4gIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1c3RvbVRlbXBsYXRlXCJcbiAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntcbiAgICBsYWJlbCxcbiAgICBsYXlvdXQsXG4gICAgdG9nZ2xlLFxuICAgIGNvbGxhcHNpYmxlLFxuICAgIGV4cGFuZCxcbiAgICBwcm9wc1xuICB9XCJcbj48L25nLWNvbnRhaW5lcj5cbiJdfQ==