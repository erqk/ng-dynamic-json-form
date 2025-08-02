import { CommonModule } from '@angular/common';
import { Component, computed, ViewEncapsulation } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  CustomControlComponent,
  PropsBindingDirective,
  providePropsBinding,
} from 'ng-dynamic-json-form';
import { Checkbox, CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'ui-primeng-checkbox',
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CheckboxModule,
    PropsBindingDirective,
  ],
  providers: [
    providePropsBinding([
      {
        key: 'p-checkbox',
        token: Checkbox,
      },
    ]),
  ],
  templateUrl: './ui-primeng-checkbox.component.html',
  styles: [],
})
export class UiPrimengCheckboxComponent extends CustomControlComponent {
  override control = new FormControl<any | any[]>('');
  onChange?: any;

  options = computed(() => this.data()?.options?.data ?? []);
  groupButtonStyles = computed(() => {
    const { layout, containerStyles } = this.data()?.options ?? {};

    return `
      flex-direction: ${layout ?? 'row'};
      align-items: flex-start;
      ${containerStyles ?? ''}
    `.replace(/\s{2,}/g, '');
  });

  override registerOnChange(fn: any): void {
    this.onChange = fn;
  }
}
