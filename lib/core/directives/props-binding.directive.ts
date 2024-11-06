import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Injector,
  Input,
  Renderer2,
  SimpleChange,
  inject,
} from '@angular/core';
import { PROPS_BINDING_INJECTORS } from '../providers/props-binding.provider';
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

  @Input() propsBinding?: { props: any; key?: string; omit?: string[] }[];

  ngOnChanges(): void {
    this._bindProperties();
  }

  private _bindProperties(): void {
    const propsBinding = (this.propsBinding ?? []).filter((x) => {
      return (
        Boolean(x) &&
        typeof x.props === 'object' &&
        Object.keys(x.props).length > 0
      );
    });

    if (!propsBinding.length) {
      return;
    }

    const host = this._el.nativeElement;

    for (const item of propsBinding) {
      const { props, key, omit = [] } = item;
      const providerToken = this._injectionTokens?.find(
        (x) => x.key === key
      )?.token;

      const target = !providerToken ? null : this._injector.get(providerToken);

      for (const key in props) {
        const value = props[key];

        if (value === undefined || omit.includes(key)) {
          continue;
        }

        if (target && Object.hasOwn(target, key)) {
          target[key] = value;

          if (target['ngOnChanges']) {
            const simpleChange = new SimpleChange(undefined, value, true);
            target.ngOnChanges({ [key]: simpleChange });
          }
        } else if (host) {
          this._renderer2.setAttribute(host, key, value);
          this._renderer2.setProperty(host, key, value);
        }
      }
    }

    this._cd.markForCheck();
    this._cd.detectChanges();
  }
}
