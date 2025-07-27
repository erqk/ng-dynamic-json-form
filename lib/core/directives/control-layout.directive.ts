import { Directive, ElementRef, Input, OnChanges, inject } from '@angular/core';
import { FormControlConfig } from '../models';
import { getClassListFromString } from '../utilities/get-class-list-from-string';
import { getStyleListFromString } from '../utilities/get-style-list-from-string';

@Directive({
  selector: '[controlLayout]',
  standalone: true,
})
export class ControlLayoutDirective implements OnChanges {
  private el = inject(ElementRef);

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
    const hostEl = this.el.nativeElement as HTMLElement;
    if (!hostEl || !this.controlLayout) return;

    const { type, layout } = this.controlLayout;
    const classNames = layout?.[`${type ?? 'host'}Class`] ?? '';
    const styles = layout?.[`${type ?? 'host'}Styles`] ?? '';

    if (classNames.length > 0) {
      hostEl.classList.add(...getClassListFromString(classNames));
    }

    if (styles.length > 0) {
      const styleList = getStyleListFromString(styles);

      for (const item of styleList) {
        const [name, value] = item.split(':').map((x) => x.trim());
        hostEl.style.setProperty(name, value);
      }
    }
  }
}
