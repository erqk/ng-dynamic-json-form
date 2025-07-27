import { Directive, ElementRef, Input, inject } from '@angular/core';

@Directive({
  selector: '[hostId]',
  standalone: true,
})
export class HostIdDirective {
  private el = inject(ElementRef);

  @Input() hostId?: { parentId?: string; controlName?: string };

  ngOnChanges(): void {
    const hostEl = this.el.nativeElement as HTMLElement;
    if (!hostEl || !this._hostId) return;

    // Set `id` to this component so that `querySelector` can find it correctly.
    hostEl.setAttribute('id', this._hostId);
  }

  private get _hostId(): string | undefined {
    if (!this.hostId) return undefined;

    const { parentId, controlName } = this.hostId;
    return parentId ? `${parentId}.${controlName}` : controlName;
  }
}
