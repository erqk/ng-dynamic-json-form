import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  InjectionToken,
  Injector,
  Input,
  ProviderToken,
  Renderer2,
  SimpleChange,
  inject,
} from '@angular/core';
import { FormControlConfig } from '../models';

export const PROPERTY_BINDING_INJECTOR = new InjectionToken<ProviderToken<any>>(
  'property-binding-injector'
);

@Directive({
  selector: '[propertyBinding]',
  standalone: true,
})
export class PropertyBindingDirective {
  private _tokenToInject = inject(PROPERTY_BINDING_INJECTOR, {
    optional: true,
  });
  private _injector = inject(Injector);
  private _cd = inject(ChangeDetectorRef);
  private _el = inject(ElementRef);
  private _renderer2 = inject(Renderer2);
  private _isViewInitialized = false;

  @Input() propertyBinding?: FormControlConfig;

  ngOnChanges(): void {
    if (!this._isViewInitialized) return;
    this._bindProperties();
  }

  ngAfterViewInit(): void {
    this._isViewInitialized = true;
    this._bindProperties();
  }

  private _bindProperties(): void {
    const extra = this.propertyBinding?.extra;
    const host = this._el.nativeElement;
    const directive = !this._tokenToInject
      ? null
      : this._injector.get(this._tokenToInject);

    if (!extra) return;

    for (const key in extra) {
      const value = extra[key];

      if (directive) {
        directive[key] = value;
      }

      if (directive && directive['ngOnChanges']) {
        const simpleChange = new SimpleChange(undefined, value, true);
        directive.ngOnChanges({ [key]: simpleChange });
      }

      if (host) {
        this._renderer2.setProperty(host, key, value);
      }
    }

    this._cd.detectChanges();
  }
}
