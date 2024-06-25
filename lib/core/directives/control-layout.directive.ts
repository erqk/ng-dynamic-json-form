import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  inject,
} from '@angular/core';
import { FormControlConfig } from '../models';

@Directive({
  selector: '[controlLayout]',
  standalone: true,
})
export class ControlLayoutDirective implements OnChanges {
  private _renderer2 = inject(Renderer2);
  private _el = inject(ElementRef);

  @Input() controlLayout?: {
    type?:
      | 'host'
      | 'label'
      | 'content'
      | 'formGroup'
      | 'description'
      | 'inputArea'
      | 'error';
    layout?: FormControlConfig['layout'];
  };

  ngOnChanges(): void {
    const hostEl = this._el.nativeElement as HTMLElement;
    if (!hostEl || !this.controlLayout) return;

    const { type, layout } = this.controlLayout;
    const classNames = layout?.[`${type ?? 'host'}Class`] ?? '';
    const styles = layout?.[`${type ?? 'host'}Styles`] ?? '';

    if (classNames.length > 0) {
      classNames
        .split(/\s{1,}/)
        .map((x) => x.trim())
        .filter(Boolean)
        .forEach((name) => {
          this._renderer2.addClass(hostEl, name);
        });
    }

    if (styles.length > 0) {
      const styleProperties = styles
        .split(';')
        .map((x) => x.trim())
        .filter(Boolean);

      styleProperties.forEach((style) => {
        const [name, value] = style.split(':').map((x) => x.trim());
        hostEl.style.setProperty(name, value);
      });
    }
  }
}
