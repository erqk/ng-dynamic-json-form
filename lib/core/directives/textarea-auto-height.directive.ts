import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[textareaAutoHeight]',
  standalone: true,
})
export class TextareaAutHeightDirective implements OnInit {
  private el = inject(ElementRef);

  autoResize = input<boolean>(true);

  @HostListener('input', ['$event'])
  onInput(): void {
    this.setHeight();
  }

  ngOnInit(): void {
    this.removeResizeProperty();
  }

  private removeResizeProperty(): void {
    const hostEl = this.el.nativeElement as HTMLElement;
    hostEl.style.setProperty('resize', 'none');
  }

  private setHeight(): void {
    const autoResize = this.autoResize();
    const hostEl = this.el.nativeElement as HTMLElement;

    if (!hostEl || !autoResize) {
      return;
    }

    const borderWidth = Math.ceil(
      parseFloat(window.getComputedStyle(hostEl).borderWidth),
    );

    hostEl.style.removeProperty('height');
    hostEl.style.setProperty(
      'height',
      `${hostEl.scrollHeight + borderWidth * 2}px`,
    );
  }
}
