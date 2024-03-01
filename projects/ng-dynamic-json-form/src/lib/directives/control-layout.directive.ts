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
    type?: 'host' | 'label' | 'content' | 'description' | 'error';
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

    if (classNames.length > 0) {
      classNames.split(/\s{1,}/).forEach((name) => {
        this._renderer2.addClass(hostEl, name);
      });
    }

    if (styles.length > 0) {
      const styleProperties = styles.split(';').filter(Boolean);

      styleProperties.forEach((style) => {
        const [name, value] = style.split(':').map((x) => x.trim());
        this._renderer2.setStyle(hostEl, name, value);
      });
    }

    isNested
      ? this._renderer2.addClass(hostEl, 'is-nested')
      : this._renderer2.removeClass(hostEl, 'is-nested');

    readonly
      ? this._renderer2.addClass(hostEl, 'readonly')
      : this._renderer2.removeClass(hostEl, 'readonly');
  }
}
