import {
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { FormControlConfig } from '../models';
import { getClassListFromString } from '../utilities/get-class-list-from-string';
import { getStyleListFromString } from '../utilities/get-style-list-from-string';

@Directive({
  selector: '[controlLayout]',
  standalone: true,
})
export class ControlLayoutDirective {
  private el = inject(ElementRef);

  controlLayout = input<{
    type?:
      | 'host'
      | 'label'
      | 'content'
      | 'formGroup'
      | 'description'
      | 'inputArea'
      | 'error';
    layout?: FormControlConfig['layout'];
  }>();

  classNames = computed(() => {
    const data = this.controlLayout();
    if (!data) {
      return [];
    }

    const { type, layout } = data;
    const classString = layout?.[`${type ?? 'host'}Class`] ?? '';
    const result = getClassListFromString(classString);

    return result;
  });

  styleList = computed(() => {
    const data = this.controlLayout();
    if (!data) {
      return [];
    }

    const { type, layout } = data;
    const styleString = layout?.[`${type ?? 'host'}Styles`] ?? '';
    const result = getStyleListFromString(styleString);

    return result;
  });

  updateClass = effect(() => {
    const host = this.el.nativeElement as HTMLElement;
    const classNames = this.classNames();

    if (!classNames.length) {
      return;
    }

    host.classList.add(...classNames);
  });

  updateStyles = effect(() => {
    const host = this.el.nativeElement as HTMLElement;
    const styleList = this.styleList();

    if (!styleList.length) {
      return;
    }

    for (const item of styleList) {
      const [name, value] = item.split(':').map((x) => x.trim());
      host.style.setProperty(name, value);
    }
  });
}
