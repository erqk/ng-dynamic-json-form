import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomControlComponent } from '../../components/custom-control/custom-control.component';
import { PropsBindingDirective } from '../../directives';

@Component({
  selector: 'ui-basic-radio',
  imports: [CommonModule, ReactiveFormsModule, PropsBindingDirective],
  templateUrl: './ui-basic-radio.component.html',
  styles: [],
  host: {
    class: 'ui-basic',
  },
})
export class UiBasicRadioComponent extends CustomControlComponent {
  private onChange?: any;

  options = computed(() => this.data()?.options?.data ?? []);

  selectedIndex = signal<number>(-1);
  isDisabled = signal<boolean>(false);

  override writeValue(obj: any): void {
    const index =
      this.options().findIndex(
        (x) => JSON.stringify(x.value) === JSON.stringify(obj),
      ) ?? -1;

    this.selectedIndex.set(index);
  }

  override registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  override setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  emitValue(i: number): void {
    const value = this.options()[i].value;
    this.onChange(value);
  }
}
