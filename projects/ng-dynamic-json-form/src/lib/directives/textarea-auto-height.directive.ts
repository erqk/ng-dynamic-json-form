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
  private _borderWidth = 0;

  @Input() autoResize = true;

  ngOnInit(): void {
    this._hostEl = this._el.nativeElement as HTMLElement;
    if (!this._hostEl) return;

    this._hostEl.style.resize = 'none';
    this._borderWidth = Math.ceil(
      parseFloat(window.getComputedStyle(this._hostEl).borderWidth)
    );
  }

  @HostListener('input', ['$event'])
  onInput(): void {
    if (!this._hostEl || !this.autoResize) return;

    this._renderer2.removeStyle(this._hostEl, 'height');
    this._renderer2.setStyle(
      this._hostEl,
      'height',
      `${this._hostEl.scrollHeight + this._borderWidth * 2}px`
    );
  }
}
