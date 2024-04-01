import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, fromEvent, tap } from 'rxjs';
import { ControlLayoutDirective } from '../../directives';
import { FormControlConfig } from '../../models';
import { FormLayout } from '../../models/form-layout.interface';
import {
  LayoutComponents,
  LayoutTemplates,
} from '../../ng-dynamic-json-form.config';

@Component({
  selector: 'form-title',
  standalone: true,
  imports: [CommonModule, ControlLayoutDirective],
  templateUrl: './form-title.component.html',
  styleUrls: ['./form-title.component.scss'],
})
export class FormTitleComponent {
  private _cd = inject(ChangeDetectorRef);
  private _renderer2 = inject(Renderer2);
  private _destroyRef = inject(DestroyRef);
  private _viewInitialized = false;

  @Input() label?: string;
  @Input() layout?: FormControlConfig['layout'];
  @Input() extra?: FormControlConfig['extra'];
  @Input() collapsibleEl?: HTMLElement;
  @Input() state?: FormLayout['contentCollapsible'];
  @Input() customComponent?: LayoutComponents['formTitle'];
  @Input() customTemplate?: LayoutTemplates['formTitle'];

  @ViewChild('componentAnchor', { read: ViewContainerRef })
  componentAnchor?: ViewContainerRef;

  collapsible = false;
  expand = false;

  toggle = (value?: boolean) => {
    if (!this._collapsible) return;

    this.expand = value ?? !this.expand;
    this._setElementHeight();
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

    if (this.collapsible && this.collapsibleEl) {
      this._initCollapsibleEl();
      this._listenTransition();
    }

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
    componentRef.instance.extra = this.extra;
    componentRef.instance.collapsibleEl = this.collapsibleEl;
  }

  private _listenTransition(): void {
    if (!this.collapsibleEl) return;

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
    this._renderer2.addClass(this.collapsibleEl, 'collapsible-container');

    if (!this.expand) {
      this._setCollapseStyle();
    }
  }

  private _setCollapseStyle(): void {
    this._renderer2.setStyle(this.collapsibleEl, 'overflow', 'hidden');
    this._renderer2.setStyle(this.collapsibleEl, 'height', '0px');
  }

  private _setExpandStyle(): void {
    const height = !this.collapsibleEl
      ? 0
      : this.collapsibleEl.scrollHeight + 1;

    this._renderer2.setStyle(this.collapsibleEl, 'height', `${height}px`);
  }

  private get _collapsible(): boolean {
    return (
      this.layout?.contentCollapsible === 'collapse' ||
      this.layout?.contentCollapsible === 'expand'
    );
  }
}
