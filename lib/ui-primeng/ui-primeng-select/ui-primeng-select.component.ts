import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import {
  CustomControlComponent,
  PropsBindingDirective,
  providePropsBinding,
} from 'ng-dynamic-json-form';
import { Dropdown, DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'ui-primeng-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    PropsBindingDirective,
  ],
  providers: [
    providePropsBinding([
      {
        key: 'p-dropdown',
        token: Dropdown,
      },
    ]),
  ],
  templateUrl: './ui-primeng-select.component.html',
  styles: [],
})
export class UiPrimengSelectComponent extends CustomControlComponent {
  override control = new UntypedFormControl('');

  onTouched = () => {};

  override registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
