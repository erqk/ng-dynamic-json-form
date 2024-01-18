import { Directive, ElementRef, Input, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[hostId]',
  standalone: true,
})
export class HostIdDirective {
  private _renderer2 = inject(Renderer2);
  private _el = inject(ElementRef);

  @Input() hostId = {
    parentId: '',
    controlName: '',
  };

  ngOnChanges(): void {
    const hostEl = this._el.nativeElement as HTMLElement;
    if (!hostEl || !this.hostId.controlName) return;

    // Set `id` to this component so that `querySelector` can find it correctly.
    this._renderer2.setAttribute(hostEl, 'id', this._hostId);
  }

  private get _hostId(): string {
    const { parentId, controlName } = this.hostId;
    return parentId ? `${parentId}.${controlName}` : controlName;
  }
}
