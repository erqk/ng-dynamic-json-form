import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  inject,
} from '@angular/core';

@Directive({
  selector: '[textareaAutoHeight]',
  standalone: true,
})
export class TextareaAutHeightDirective {
  private _el = inject(ElementRef);
  private _renderer2 = inject(Renderer2);

  private _hostEl?: HTMLElement;

  @Input() autoResize = true;

  // Call in this lifecycle hook to wait for PropsBindingDirective to bind the attributes,
  // then we can get the correct scrollHeight
  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    this._hostEl = this._el.nativeElement as HTMLElement;
    if (!this._hostEl) return;

    this._renderer2.setStyle(this._hostEl, 'resize', 'none');
    this._setHeight();
  }

  @HostListener('input', ['$event'])
  onInput(): void {
    this._setHeight();
  }

  private _setHeight(): void {
    if (!this._hostEl || !this.autoResize) return;

    const borderWidth = Math.ceil(
      parseFloat(window.getComputedStyle(this._hostEl).borderWidth)
    );

    this._renderer2.removeStyle(this._hostEl, 'height');
    this._renderer2.setStyle(
      this._hostEl,
      'height',
      `${this._hostEl.scrollHeight + borderWidth * 2}px`
    );
  }
}
