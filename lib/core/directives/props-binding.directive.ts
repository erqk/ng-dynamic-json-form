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
  private _injectionTokens = inject(PROPS_BINDING_INJECTORS, {
    optional: true,
  });
  private _injector = inject(Injector);
  private _cd = inject(ChangeDetectorRef);
  private _el = inject(ElementRef);
  /**
   * Must ensure the view is initialized before applying any properties binding
   */
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

    const host = this._el.nativeElement as HTMLElement | undefined;

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

        if (target) {
          this.updateComponentProperty({ component: target, key, value });
          continue;
        }

        if (host) {
          // Only set CSS custom properties (starting with --) or valid HTML attributes
          if (key.startsWith('--')) {
            host.style.setProperty(key, value);
          } else if (this.isValidHtmlAttribute(key)) {
            host.setAttribute(key, value);
          }
        }
      }
    }

    this._cd.markForCheck();
    this._cd.detectChanges();
  }

  private updateComponentProperty(data: {
    component: any;
    key: any;
    value: any;
  }): void {
    const { component, key, value } = data;
    const hasProperty = this.hasProperty(component, key);

    if (!hasProperty) {
      return;
    }

    const property = component[key];

    if (typeof (property as any)?.set === 'function') {
      (property as any).set(value);
    } else {
      component[key] = value;
    }

    // For compatibility
    if (component['ngOnChanges']) {
      const simpleChange = new SimpleChange(undefined, value, true);
      component.ngOnChanges({ [key]: simpleChange });
    }
  }

  private hasProperty(obj: any, key: string): boolean {
    return Object.hasOwn(obj, key) || key in obj;
  }

  private isValidHtmlAttribute(attributeName: string): boolean {
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
    return (
      validAttributes.has(attributeName.toLowerCase()) ||
      attributeName.startsWith('data-') ||
      attributeName.startsWith('aria-')
    );
  }
}
