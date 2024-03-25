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

export const PROPS_BINDING_INJECTORS = new InjectionToken<ProviderToken<any>[]>(
  'property-binding-injector'
);

@Directive({
  selector: '[propsBinding]',
  standalone: true,
})
export class PropsBindingDirective {
  private _injectionTokens = inject(PROPS_BINDING_INJECTORS, {
    optional: true,
  });
  private _injector = inject(Injector);
  private _cd = inject(ChangeDetectorRef);
  private _el = inject(ElementRef);
  private _renderer2 = inject(Renderer2);
  private _isViewInitialized = false;

  @Input() propsBinding?: any[];

  /**Properties to exclude from binding */
  @Input() skipProperties?: string[];

  ngOnChanges(): void {
    if (!this._isViewInitialized) return;
    this._bindProperties();
  }

  ngAfterViewInit(): void {
    this._isViewInitialized = true;
    this._bindProperties();
  }

  private _bindProperties(): void {
    if (!this.propsBinding?.length) {
      return;
    }

    const host = this._el.nativeElement;

    this.propsBinding.forEach((props, i) => {
      if (!props || !Object.keys(props).length) {
        return;
      }

      const target = !this._injectionTokens?.length
        ? null
        : this._injector.get(this._injectionTokens[i]);

      for (const key in props) {
        const value = props[key];
        if (value === undefined) continue;

        if (target) {
          target[key] = value;
        }

        if (target && target['ngOnChanges']) {
          const simpleChange = new SimpleChange(undefined, value, true);
          target.ngOnChanges({ [key]: simpleChange });
        }

        if (host) {
          this._renderer2.setProperty(host, key, value);
        }
      }
    });

    this._cd.markForCheck();
  }
}
