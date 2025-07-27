import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Injector,
  Input,
  SimpleChange,
  inject,
} from '@angular/core';
import { PROPS_BINDING_INJECTORS } from '../providers/props-binding.provider';
@Directive({
  selector: '[propsBinding]',
  standalone: true,
})
export class PropsBindingDirective {
  private injectionTokens = inject(PROPS_BINDING_INJECTORS, {
    optional: true,
  });
  private injector = inject(Injector);
  private cd = inject(ChangeDetectorRef);
  private el = inject(ElementRef);
  /**
   * Must ensure the view is initialized before applying any properties binding
   */
  private isViewInitialized = false;

  @Input() propsBinding?: { props: any; key?: string; omit?: string[] }[];

  ngOnChanges(): void {
    if (!this.isViewInitialized) return;
    this.bindProperties();
  }

  ngAfterViewInit(): void {
    this.isViewInitialized = true;
    this.bindProperties();
  }

  private bindProperties(): void {
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

    const host = this.el.nativeElement as HTMLElement | undefined;

    for (const item of propsBinding) {
      const { props, key, omit = [] } = item;
      const providerToken = this.injectionTokens?.find(
        (x) => x.key === key
      )?.token;

      const target = !providerToken ? null : this.injector.get(providerToken);

      for (const key in props) {
        const value = props[key];

        if (value === undefined || omit.includes(key)) {
          continue;
        }

        if (target && (Object.hasOwn(target, key) || key in target)) {
          target[key] = value;

          if (target['ngOnChanges']) {
            const simpleChange = new SimpleChange(undefined, value, true);
            target.ngOnChanges({ [key]: simpleChange });
          }
        } else if (host) {
          host.style.setProperty(key, value);
          host.setAttribute(key, value);
        }
      }
    }

    this.cd.markForCheck();
    this.cd.detectChanges();
  }
}
