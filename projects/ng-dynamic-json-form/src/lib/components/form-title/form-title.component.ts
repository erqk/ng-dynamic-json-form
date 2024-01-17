import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Renderer2,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { Subject, filter, fromEvent, takeUntil, tap } from 'rxjs';
import { ControlLayoutDirective } from '../../directives';
import { FormControlConfig } from '../../models';
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
  private readonly _renderer2 = inject(Renderer2);
  private readonly _onDestroy$ = new Subject<void>();

  @Input() label?: string;
  @Input() layout?: FormControlConfig['layout'];
  @Input() collapsibleEl?: HTMLElement;
  @Input() customComponent?: LayoutComponents['formTitle'];
  @Input() customTemplate?: LayoutTemplates['formTitle'];

  @ViewChild('componentAnchor', { read: ViewContainerRef })
  componentAnchor?: ViewContainerRef;

  collapsible = false;
  expand = false;

  toggle = () => {
    if (!this._collapsible) return;

    this.expand = !this.expand;
    this._setElementHeight();
  };

  ngOnInit(): void {
    this.collapsible = this._collapsible;
    this.expand = this.layout?.childCollapsible === 'expand';
  }

  ngAfterViewInit(): void {
    if (!this.collapsibleEl || !this.collapsible) return;

    if (this.customComponent) {
      this._injectComponent();
      return;
    }

    this._initCollapsibleEl();
    this._listenTransition();
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
    componentRef.instance.collapsibleEl = this.collapsibleEl;
  }

  private _listenTransition(): void {
    if (!this.collapsibleEl) return;

    const transitionEnd$ = fromEvent(this.collapsibleEl, 'transitionend').pipe(
      filter(() => this.expand),
      tap(() => this._renderer2.removeStyle(this.collapsibleEl, 'height'))
    );

    transitionEnd$.pipe(takeUntil(this._onDestroy$)).subscribe();
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
      this.layout?.childCollapsible === 'collapse' ||
      this.layout?.childCollapsible === 'expand'
    );
  }
}
