import { CommonModule } from '@angular/common';
import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  TemplateRef,
  Type,
  untracked,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, fromEvent, tap } from 'rxjs';
import { FormControlConfig } from '../../models';
import { FormLayout } from '../../models/form-layout.interface';
import { CustomFormLabel } from '../custom-form-label/custom-form-label.abstract';

@Component({
  selector: 'form-label',
  imports: [CommonModule],
  templateUrl: './form-label.component.html',
  styleUrls: ['./form-label.component.scss'],
  host: {
    class: 'form-label',
  },
})
export class FormLabelComponent {
  private el = inject(ElementRef);
  private destroyRef = inject(DestroyRef);
  private collapsibleElCssText = '';
  private componentRef?: CustomFormLabel;

  label = input<string>();
  layout = input<FormControlConfig['layout']>();
  props = input<FormControlConfig['props']>();
  collapsibleEl = input<HTMLElement>();
  /**
   * State that comes from the root component.
   * This will overwrite the current collapsible state
   */
  state = input<FormLayout['contentCollapsible']>();
  customComponent = input<Type<CustomFormLabel>>();
  customTemplate = input<TemplateRef<any>>();

  componentAnchor = viewChild.required<ViewContainerRef>('componentAnchor');

  expand = signal<boolean>(false);

  useDefaultTemplate = computed(
    () => !this.customComponent() && !this.customTemplate(),
  );

  isCollapsible = computed(() => {
    const layout = this.layout();
    if (!layout) {
      return false;
    }

    return (
      layout.contentCollapsible === 'collapse' ||
      layout.contentCollapsible === 'expand'
    );
  });

  injectCustomComponent = effect(() => {
    const anchor = this.componentAnchor();
    const customComponent = this.customComponent();

    if (!anchor || !customComponent) {
      return;
    }

    untracked(() => {
      const componentRef = anchor.createComponent(customComponent);

      componentRef.instance.label = this.label();
      componentRef.instance.layout = this.layout();
      componentRef.instance.props = this.props();
      componentRef.instance.collapsible = this.isCollapsible();
      componentRef.instance.expand = this.expand();

      this.componentRef = componentRef.instance;

      this.injectCustomComponent.destroy();
    });
  });

  handleStateChange = effect(() => {
    const isCollapsible = this.isCollapsible();
    const state = this.state();

    if (!isCollapsible || !state) {
      return;
    }

    this.toggle(state === 'expand');
  });

  setExpandInitialState = effect(() => {
    const state = this.state();

    if (state) {
      this.expand.set(state === 'expand');
    } else {
      this.expand.set(this.layout()?.contentCollapsible === 'expand');
    }

    this.setExpandInitialState.destroy();
  });

  setHostStyle = effect(() => {
    const host = this.el.nativeElement as HTMLElement;
    const label = this.label();
    const customComponent = this.customComponent();
    const isCollapsible = this.isCollapsible();

    if (!label || !!customComponent) {
      return;
    }

    if (isCollapsible) {
      host.style.setProperty('display', 'flex');
      host.style.setProperty('cursor', 'pointer');
    } else {
      host.style.setProperty('display', 'inline-block');
      host.style.removeProperty('cursor');
    }
  });

  constructor() {
    afterNextRender(() => {
      this.initCollapsibleEl();
      this.listenClickEvent();
    });
  }

  toggle = (expand?: boolean) => {
    const collapsible = this.isCollapsible();

    if (!collapsible) {
      return;
    }

    this.expand.update((x) => expand ?? !x);
    this.setElementHeight();

    if (this.componentRef) {
      this.componentRef.expand = this.expand();
    }
  };

  private listenTransition(): void {
    const el = this.collapsibleEl();

    if (!el) {
      return;
    }

    const transitionEnd$ = fromEvent(el, 'transitionend', {
      passive: true,
    }).pipe(
      filter(() => this.expand()),
      tap(() => {
        el?.classList.remove(...['height', 'overflow']);
      }),
    );

    transitionEnd$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  private setElementHeight(): void {
    this.setExpandStyle();

    if (!this.expand()) {
      requestAnimationFrame(() => this.setCollapseStyle());
    }
  }

  private initCollapsibleEl(): void {
    const el = this.collapsibleEl();

    if (!el || !this.isCollapsible()) {
      return;
    }

    this.collapsibleElCssText = el.style.cssText || '';
    el.classList.add('collapsible-container');
    this.listenTransition();

    if (!this.expand()) {
      this.setCollapseStyle();
    }
  }

  private setCollapseStyle(): void {
    const el = this.collapsibleEl();
    const stylesToRemove = ['border', 'padding', 'margin'];

    if (!el) {
      return;
    }

    stylesToRemove.forEach((style) => {
      if (!this.collapsibleElCssText.includes(style)) return;
      el.style.removeProperty(style);
    });

    el.style.setProperty('overflow', 'hidden');
    el.style.setProperty('height', '0px');
  }

  private setExpandStyle(): void {
    const el = this.collapsibleEl();

    const height = !el ? 0 : el.scrollHeight + 1;

    // Set existing styles from collapsible element first
    if (this.collapsibleElCssText) {
      el?.setAttribute('style', this.collapsibleElCssText);
    }

    // Then set height later to overwrite height style
    el?.style.setProperty('height', `${height}px`);
  }

  private listenClickEvent(): void {
    const host = this.el.nativeElement as HTMLElement;
    const collapsible = this.isCollapsible();

    if (!collapsible) {
      return;
    }

    fromEvent(host, 'click', { passive: true })
      .pipe(
        tap(() => this.toggle()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
