import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CustomControlComponent } from '../../components/custom-control/custom-control.component';
import { PropsBindingDirective } from '../../directives';

@Component({
  selector: 'ui-basic-switch',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PropsBindingDirective],
  templateUrl: './ui-basic-switch.component.html',
  styles: [],
  host: {
    class: 'ui-basic',
  },
})
export class UiBasicSwitchComponent extends CustomControlComponent {
  private _onChange?: any;

  override control = new FormControl(false);

  override registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  updateControl(e: Event): void {
    const checked = (e.target as HTMLInputElement).checked;

    this.control.setValue(checked);
    this._onChange(checked);
  }
}
