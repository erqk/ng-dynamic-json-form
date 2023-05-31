import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[textareaAutoResize]',
  standalone: true,
})
export class TextareaAutoResizeDirective {
  private el = inject(ElementRef);

  private hostEl?: HTMLElement;
  private borderWidth = 0;

  ngOnInit(): void {
    this.hostEl = this.el.nativeElement as HTMLElement;
    if (this.hostEl) {
      this.hostEl.style.resize = 'none';
      this.borderWidth = parseFloat(
        window.getComputedStyle(this.hostEl).borderWidth
      );
    }
  }

  @HostListener('input', ['$event'])
  onInput(): void {
    if (!this.hostEl) return;

    this.hostEl.style.removeProperty('height');
    this.hostEl.style.height = `${this.hostEl.scrollHeight + this.borderWidth * 2}px`;
  }
}
