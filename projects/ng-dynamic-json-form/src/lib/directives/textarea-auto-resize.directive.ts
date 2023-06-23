import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[textareaAutoResize]',
  standalone: true,
})
export class TextareaAutoResizeDirective {
  private _el = inject(ElementRef);

  private _hostEl?: HTMLElement;
  private _borderWidth = 0;

  ngOnInit(): void {
    this._hostEl = this._el.nativeElement as HTMLElement;
    if (this._hostEl) {
      this._hostEl.style.resize = 'none';
      this._borderWidth = parseFloat(
        window.getComputedStyle(this._hostEl).borderWidth
      );
    }
  }

  @HostListener('input', ['$event'])
  onInput(): void {
    if (!this._hostEl) return;

    this._hostEl.style.removeProperty('height');
    this._hostEl.style.height = `${this._hostEl.scrollHeight + this._borderWidth * 2}px`;
  }
}
