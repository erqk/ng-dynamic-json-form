import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { FormControlConfig } from '../../models';

@Component({
  selector: 'grid-item-wrapper',
  template: ` <ng-content></ng-content> `,
  styles: [],
  standalone: true,
  imports: [CommonModule],
})
export class GridItemWrapperComponent {
  @Input() parentId = '';
  @Input() data: FormControlConfig =
    {} as FormControlConfig;

  get hostId(): string {
    return this.parentId
      ? `${this.parentId}.${this.data.formControlName}`
      : this.data.formControlName;
  }

  get isGridLayout(): boolean {
    return !!this.data?.cssGrid?.gridColumn || !!this.data?.cssGrid?.gridRow;
  }

  get gridRow(): string {
    return this.data?.cssGrid?.gridRow ?? '';
  }

  get gridColumn(): string {
    return this.data?.cssGrid?.gridColumn ?? '';
  }

  constructor(private el: ElementRef, private renderer2: Renderer2) {}

  ngOnInit(): void {
    this.setHostAttributes();
  }

  setHostAttributes(): void {
    const hostElement = this.el.nativeElement as HTMLElement;

    if (this.isGridLayout) {
      this.renderer2.addClass(hostElement, 'grid-layout');
    }

    // Set `id` to this component so that `querySelector` can find it correctly.
    this.renderer2.setAttribute(hostElement, 'id', this.hostId);
    this.renderer2.setAttribute(
      hostElement,
      'style',
      `grid-row: ${this.gridRow}`
    );
    this.renderer2.setAttribute(
      hostElement,
      'style',
      `grid-column: ${this.gridColumn}`
    );
  }
}
