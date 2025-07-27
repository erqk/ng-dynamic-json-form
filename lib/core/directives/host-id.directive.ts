import {
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';

@Directive({
  selector: '[hostId]',
  standalone: true,
})
export class HostIdDirective {
  private el = inject(ElementRef);

  hostId = input<{ parentId?: string; controlName?: string }>();

  computedId = computed(() => {
    const hostId = this.hostId();

    if (!hostId) {
      return;
    }

    const { parentId, controlName } = hostId;
    return parentId ? `${parentId}.${controlName}` : controlName;
  });

  updateAttribute = effect(() => {
    const id = this.computedId();
    const host = this.el.nativeElement as HTMLElement;

    if (id) {
      host.setAttribute('id', id);
    }
  });
}
