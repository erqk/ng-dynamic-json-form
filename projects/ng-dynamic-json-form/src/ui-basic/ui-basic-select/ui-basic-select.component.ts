import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  ControlValueService,
  CustomControlComponent,
  PropsBindingDirective,
} from '../../public-api';
import { map } from 'rxjs';

@Component({
  selector: 'ui-basic-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PropsBindingDirective],
  templateUrl: './ui-basic-select.component.html',
  styles: [],
})
export class UiBasicSelectComponent extends CustomControlComponent {
  private _controlValueService = inject(ControlValueService);
  override control = new FormControl('');

  override writeValue(obj: any): void {
    const value = this._controlValueService.getOptionsValue('stringified', obj);
    requestAnimationFrame(() => this.control.setValue(value));
  }

  override registerOnChange(fn: any): void {
    this.control.valueChanges
      .pipe(map((x) => this._controlValueService.getOptionsValue('parsed', x)))
      .subscribe(fn);
  }
}
