import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, inject } from '@angular/core';

@Component({
    selector: 'app-doc-code',
    imports: [CommonModule],
    templateUrl: './doc-code.component.html',
    styleUrls: ['./doc-code.component.scss']
})
export class DocCodeComponent {
  private el = inject(ElementRef);

  @Input() enableCopy = true;

  copyToClipboard(): void {
    const host = this.el.nativeElement as HTMLElement;
    const target = host.querySelector('.code-container') as
      | HTMLElement
      | undefined;
    const content = target?.innerText;

    if (typeof window === 'undefined') return;
    if (!content) return;

    window.navigator.clipboard.writeText(content);
  }
}
