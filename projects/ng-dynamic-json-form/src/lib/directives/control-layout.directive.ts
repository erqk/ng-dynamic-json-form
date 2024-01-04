import { Directive, ElementRef, Input, Renderer2, inject } from '@angular/core';
import { FormControlConfig } from '../models';

@Directive({
  selector: '[controlLayout]',
  standalone: true,
})
export class ControlLayoutDirective {
  private _renderer2 = inject(Renderer2);
  private _el = inject(ElementRef);

  @Input() controlLayout?: {
    type?: 'child' | 'host' | 'label' | 'description';
    layout?: FormControlConfig['layout'];
    isNested?: boolean;
    readonly?: boolean;
  };

  ngOnChanges(): void {
    const hostEl = this._el.nativeElement as HTMLElement;
    if (!hostEl || !this.controlLayout) return;

    const { type, isNested, layout, readonly } = this.controlLayout;
    const classNames = layout?.[`${type ?? 'host'}Class`] ?? '';
    const styles = layout?.[`${type ?? 'host'}Styles`] ?? '';

    if (!layout) return;
    if (classNames.length > 0) {
      classNames.split(/\s{1,}/).forEach((name) => {
        this._renderer2.addClass(hostEl, name);
      });
    }

    if (styles.length > 0) {
      this._renderer2.setProperty(hostEl, 'style', styles);
    }

    isNested
      ? this._renderer2.addClass(hostEl, 'is-nested')
      : this._renderer2.removeClass(hostEl, 'is-nested');

    readonly
      ? this._renderer2.addClass(hostEl, 'readonly')
      : this._renderer2.removeClass(hostEl, 'readonly');
  }
}
