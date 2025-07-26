import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
    }
})
export class UiBasicRadioComponent extends CustomControlComponent {
  private _onChange?: any;

  selectedIndex = -1;
  isDisabled = false;

  override writeValue(obj: any): void {
    const index =
      this.data?.options?.data?.findIndex(
        (x) => JSON.stringify(x.value) === JSON.stringify(obj)
      ) ?? -1;

    this.selectedIndex = index;
  }

  override registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  override setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChange(i: number): void {
    const value = this.data?.options?.data?.[i].value;
    this._onChange(value);
  }
}
