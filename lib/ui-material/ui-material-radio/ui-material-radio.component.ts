import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioGroup, MatRadioModule } from '@angular/material/radio';
import {
  CustomControlComponent,
  PropsBindingDirective,
  providePropsBinding,
} from 'ng-dynamic-json-form';

@Component({
  selector: 'ui-material-radio',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatInputModule,
    PropsBindingDirective,
  ],
  providers: [
    providePropsBinding([
      {
        key: 'mat-radio-group',
        token: MatRadioGroup,
      },
    ]),
  ],
  templateUrl: './ui-material-radio.component.html',
  styles: [],
})
export class UiMaterialRadioComponent extends CustomControlComponent {
  private onChange?: any;

  override control = new FormControl('');

  options = computed(() => this.data()?.options?.data ?? []);

  selectedIndex = signal<number>(-1);

  override writeValue(obj: any): void {
    const index = this.options().findIndex(
      (x) => JSON.stringify(x.value) === JSON.stringify(obj),
    );

    this.selectedIndex.set(index);
  }

  override registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  emitValue(i: number): void {
    const value = this.options()[i].value;
    this.onChange(value);
  }
}
