import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Injector,
  SimpleChange,
  WritableSignal,
  computed,
  effect,
  inject,
  input,
  isSignal,
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

  propsBinding = input<{ props: any; key?: string; omit?: string[] }[]>([]);

  validPropsData = computed(() =>
    this.propsBinding().filter(
      (x) =>
        Boolean(x) &&
        typeof x.props === 'object' &&
        Object.keys(x.props).length > 0,
    ),
  );

  handlePropsGet = effect(() => {
    const propsData = this.validPropsData();

    if (!propsData.length) {
      return;
    }

    const hostEl = this.el.nativeElement as HTMLElement | undefined;

    for (const item of propsData) {
      const { props, key, omit = [] } = item;
      const providerToken = this.injectionTokens?.find(
        (x) => x.key === key,
      )?.token;

      const component = !providerToken
        ? null
        : this.injector.get(providerToken);

      for (const key in props) {
        const value = props[key];

        if (value == undefined || omit.includes(key)) {
          continue;
        }

        if (component) {
          this.updateComponentProperty({ component, key, value });
        }

        if (hostEl) {
          // Only set CSS custom properties (starting with --) or valid HTML attributes
          if (key.startsWith('--')) {
            hostEl.style.setProperty(key, value);
          } else if (this.isValidHtmlAttribute(key)) {
            hostEl.setAttribute(key, value);
          }
        }
      }
    }

    this.cd.markForCheck();
    this.cd.detectChanges();
  });

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

    if (isSignal(property)) {
      if (typeof (property as any).set === 'function') {
        (property as WritableSignal<any>).set(value);
      }
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
