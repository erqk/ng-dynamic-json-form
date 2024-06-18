import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
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
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-label.component.html',
  styleUrls: ['./form-label.component.scss'],
})
export class FormLabelComponent {
  private _cd = inject(ChangeDetectorRef);
  private _renderer2 = inject(Renderer2);
  private _destroyRef = inject(DestroyRef);
  private _viewInitialized = false;
  private _collapsibleElCssText = '';
  private _componentRef?: CustomFormLabel;

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

  @HostBinding('class') hostClass = 'form-title';
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
    this._setElementHeight();

    if (this._componentRef) {
      this._componentRef.expand = this.expand;
    }
  };

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (!this._viewInitialized) return;

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
      this._injectComponent();
      this._cd.markForCheck();
      return;
    }

    this._initCollapsibleEl();
    this._viewInitialized = true;
  }

  private _injectComponent(): void {
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

    this._initCollapsibleEl();
    this._componentRef = componentRef.instance;
  }

  private _listenTransition(): void {
    if (!this.collapsibleEl) {
      return;
    }

    const transitionEnd$ = fromEvent(this.collapsibleEl, 'transitionend', {
      passive: true,
    }).pipe(
      filter(() => this.expand),
      tap(() => {
        this._renderer2.removeStyle(this.collapsibleEl, 'height');
        this._renderer2.removeStyle(this.collapsibleEl, 'overflow');
      })
    );

    transitionEnd$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe();
  }

  private _setElementHeight(): void {
    this._setExpandStyle();

    if (!this.expand) {
      requestAnimationFrame(() => this._setCollapseStyle());
    }
  }

  private _initCollapsibleEl(): void {
    if (!this.collapsibleEl || !this.collapsible) {
      return;
    }

    this._collapsibleElCssText = this.collapsibleEl.style.cssText || '';
    this._renderer2.addClass(this.collapsibleEl, 'collapsible-container');
    this._listenTransition();

    if (!this.expand) {
      this._setCollapseStyle();
    }
  }

  private _setCollapseStyle(): void {
    const stylesToRemove = ['border', 'padding', 'margin'];

    stylesToRemove.forEach((style) => {
      if (!this._collapsibleElCssText.includes(style)) return;
      this._renderer2.removeStyle(this.collapsibleEl, style);
    });

    this._renderer2.setStyle(this.collapsibleEl, 'overflow', 'hidden');
    this._renderer2.setStyle(this.collapsibleEl, 'height', '0px');
  }

  private _setExpandStyle(): void {
    const height = !this.collapsibleEl
      ? 0
      : this.collapsibleEl.scrollHeight + 1;

    // Set existing styles from collapsible element first
    this._renderer2.setProperty(
      this.collapsibleEl,
      'style',
      this._collapsibleElCssText || null
    );

    // Then set height later to overwrite height style
    this._renderer2.setStyle(this.collapsibleEl, 'height', `${height}px`);
  }

  private get _collapsible(): boolean {
    return (
      this.layout?.contentCollapsible === 'collapse' ||
      this.layout?.contentCollapsible === 'expand'
    );
  }
}
