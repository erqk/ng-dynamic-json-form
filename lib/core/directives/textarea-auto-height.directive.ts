import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  inject,
} from '@angular/core';

@Directive({
  selector: '[textareaAutoHeight]',
  standalone: true,
})
export class TextareaAutHeightDirective {
  private _el = inject(ElementRef);
  private _hostEl?: HTMLElement;

  @Input() autoResize = true;

  // Call in this lifecycle hook to wait for PropsBindingDirective to bind the attributes,
  // then we can get the correct scrollHeight
  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    this._hostEl = this._el.nativeElement as HTMLElement;
    if (!this._hostEl) return;

    this._hostEl.style.setProperty('resize', 'none');
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

    this._hostEl.style.removeProperty('height');
    this._hostEl.style.setProperty(
      'height',
      `${this._hostEl.scrollHeight + borderWidth * 2}px`
    );
  }
}
