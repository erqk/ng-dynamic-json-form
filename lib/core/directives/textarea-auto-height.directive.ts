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
  private el = inject(ElementRef);
  private hostEl?: HTMLElement;

  @Input() autoResize = true;

  // Call in this lifecycle hook to wait for PropsBindingDirective to bind the attributes,
  // then we can get the correct scrollHeight
  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    this.hostEl = this.el.nativeElement as HTMLElement;
    if (!this.hostEl) return;

    this.hostEl.style.setProperty('resize', 'none');
    this.setHeight();
  }

  @HostListener('input', ['$event'])
  onInput(): void {
    this.setHeight();
  }

  private setHeight(): void {
    if (!this.hostEl || !this.autoResize) return;

    const borderWidth = Math.ceil(
      parseFloat(window.getComputedStyle(this.hostEl).borderWidth)
    );

    this.hostEl.style.removeProperty('height');
    this.hostEl.style.setProperty(
      'height',
      `${this.hostEl.scrollHeight + borderWidth * 2}px`
    );
  }
}
