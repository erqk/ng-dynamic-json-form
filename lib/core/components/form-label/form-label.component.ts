import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  HostBinding,
  HostListener,
  Input,
  SimpleChanges,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef,
  inject,
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
    }
})
export class FormLabelComponent {
  private destroyRef = inject(DestroyRef);
  private viewInitialized = false;
  private collapsibleElCssText = '';
  private componentRef?: CustomFormLabel;

  @Input() label?: string;
  @Input() layout?: FormControlConfig['layout'];
  @Input() props?: FormControlConfig['props'];
  @Input() collapsibleEl?: HTMLElement;
  /**
   * State comes from root, to overwrite all the collapsible state
   */
  @Input() state?: FormLayout['contentCollapsible'];
  @Input() customComponent?: Type<CustomFormLabel>;
  @Input() customTemplate?: TemplateRef<any>;

  @ViewChild('componentAnchor', { read: ViewContainerRef })
  componentAnchor?: ViewContainerRef;

  @HostBinding('style.display') get styleDisplay() {
    if (!this.label) return null;
    if (this.customComponent) return null;

    return this._collapsible ? 'flex' : 'inline-block';
  }
  @HostBinding('style.cursor') get styleCursor() {
    return this._collapsible ? 'pointer' : 'normal';
  }

  @HostListener('click', ['$event'])
  onClick(): void {
    this.toggle();
  }

  collapsible = false;
  expand = false;

  toggle = (value?: boolean) => {
    if (!this._collapsible) return;

    this.expand = value ?? !this.expand;
    this.setElementHeight();

    if (this.componentRef) {
      this.componentRef.expand = this.expand;
    }
  };

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (!this.viewInitialized) return;

    const { state } = simpleChanges;

    if (state && this._collapsible) {
      switch (this.state) {
        case 'collapse':
          this.toggle(false);
          break;

        case 'expand':
          this.toggle(true);
          break;
      }
    }
  }

  ngOnInit(): void {
    this.collapsible = this._collapsible;
    this.expand =
      this.state === undefined
        ? this.layout?.contentCollapsible === 'expand'
        : this.state === 'expand';
  }

  ngAfterViewInit(): void {
    if (this.customComponent) {
      this.injectComponent();
      return;
    }

    this.initCollapsibleEl();
    this.viewInitialized = true;
  }

  private injectComponent(): void {
    if (!this.componentAnchor || !this.customComponent) {
      return;
    }

    const componentRef = this.componentAnchor.createComponent(
      this.customComponent
    );

    componentRef.instance.label = this.label;
    componentRef.instance.layout = this.layout;
    componentRef.instance.props = this.props;
    componentRef.instance.collapsible = this._collapsible;
    componentRef.instance.expand = this.expand;

    this.initCollapsibleEl();
    this.componentRef = componentRef.instance;
  }

  private listenTransition(): void {
    if (!this.collapsibleEl) {
      return;
    }

    const transitionEnd$ = fromEvent(this.collapsibleEl, 'transitionend', {
      passive: true,
    }).pipe(
      filter(() => this.expand),
      tap(() => {
        this.collapsibleEl?.classList.remove(...['height', 'overflow']);
      })
    );

    transitionEnd$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  private setElementHeight(): void {
    this.setExpandStyle();

    if (!this.expand) {
      requestAnimationFrame(() => this.setCollapseStyle());
    }
  }

  private initCollapsibleEl(): void {
    if (!this.collapsibleEl || !this.collapsible) {
      return;
    }

    this.collapsibleElCssText = this.collapsibleEl.style.cssText || '';
    this.collapsibleEl.classList.add('collapsible-container');
    this.listenTransition();

    if (!this.expand) {
      this.setCollapseStyle();
    }
  }

  private setCollapseStyle(): void {
    const stylesToRemove = ['border', 'padding', 'margin'];

    stylesToRemove.forEach((style) => {
      if (!this.collapsibleElCssText.includes(style)) return;
      this.collapsibleEl?.style.removeProperty(style);
    });

    this.collapsibleEl?.style.setProperty('overflow', 'hidden');
    this.collapsibleEl?.style.setProperty('height', '0px');
  }

  private setExpandStyle(): void {
    const height = !this.collapsibleEl
      ? 0
      : this.collapsibleEl.scrollHeight + 1;

    // Set existing styles from collapsible element first
    if (this.collapsibleElCssText) {
      this.collapsibleEl?.setAttribute('style', this.collapsibleElCssText);
    }

    // Then set height later to overwrite height style
    this.collapsibleEl?.style.setProperty('height', `${height}px`);
  }

  private get _collapsible(): boolean {
    return (
      this.layout?.contentCollapsible === 'collapse' ||
      this.layout?.contentCollapsible === 'expand'
    );
  }
}
