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

export const PROPS_BINDING_INJECTORS = new InjectionToken<
  { key: string; token: ProviderToken<any> }[]
>('property-binding-injector');

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

  @Input() propsBinding?: { props: any; key?: string; omit?: string[] }[];

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

    for (const item of this.propsBinding) {
      const { props, key, omit = [] } = item;
      const providerToken = this._injectionTokens?.find(
        (x) => x.key === key
      )?.token;

      const target = !providerToken ? null : this._injector.get(providerToken);

      for (const key in props) {
        const value = props[key];
        if (value === undefined) continue;
        if (omit.includes(key)) continue;

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
    }

    this._cd.markForCheck();
    this._cd.detectChanges();
  }
}
