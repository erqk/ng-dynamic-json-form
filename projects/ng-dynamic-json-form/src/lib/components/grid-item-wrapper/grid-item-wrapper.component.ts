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
  @Input() data: FormControlConfig = {} as FormControlConfig;

  private get _hostId(): string {
    return this.parentId
      ? `${this.parentId}.${this.data.formControlName}`
      : this.data.formControlName;
  }

  private get _isGridLayout(): boolean {
    return !!this.data?.cssGrid?.gridColumn || !!this.data?.cssGrid?.gridRow;
  }

  private get _gridRow(): string {
    return this.data?.cssGrid?.gridRow ?? '';
  }

  private get _gridColumn(): string {
    return this.data?.cssGrid?.gridColumn ?? '';
  }

  constructor(private _el: ElementRef, private _renderer2: Renderer2) {}

  ngOnInit(): void {
    this.setHostAttributes();
  }

  setHostAttributes(): void {
    const hostElement = this._el.nativeElement as HTMLElement;

    if (this._isGridLayout) {
      this._renderer2.addClass(hostElement, 'grid-layout');
    }

    // Set `id` to this component so that `querySelector` can find it correctly.
    this._renderer2.setAttribute(hostElement, 'id', this._hostId);

    const styles: { [key: string]: string } = {
      ...(this._gridRow && { 'grid-row': this._gridRow }),
      ...(this._gridColumn && { 'grid-column': this._gridColumn }),
    };

    this._renderer2.setAttribute(
      hostElement,
      'style',
      Object.keys(styles).reduce((a, key) => `${a}${key}:${styles[key]};`, '')
    );
  }
}
