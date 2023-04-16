import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { NgDynamicJsonFormControlConfig } from '../../models';

@Component({
  selector: 'grid-item-wrapper',
  template: ` <ng-content></ng-content> `,
  styles: [],
  standalone: true,
  imports: [CommonModule],
})
export class GridItemWrapperComponent {
  @Input() class = '';
  @Input() parentId = '';
  @Input() data: NgDynamicJsonFormControlConfig = {} as NgDynamicJsonFormControlConfig;
  @Input() isNested = false;

  @HostBinding('id')
  get hostId() {
    return this.parentId
      ? `${this.parentId}.${this.data.formControlName}`
      : this.data.formControlName;
  }

  @HostBinding('class')
  get hostClass() {
    return this.class;
  }

  @HostBinding('class.grid-layout')
  get isGridLayout() {
    return this.data?.gridColumn || this.data?.gridRow;
  }

  @HostBinding('class.nested-group')
  get isNestedGroup() {
    return this.isNested;
  }

  @HostBinding('style.grid-row')
  get getGridRow() {
    return this.data?.gridRow ?? '';
  }

  @HostBinding('style.grid-column')
  get getGridColumn() {
    return this.data?.gridColumn ?? '';
  }
}
