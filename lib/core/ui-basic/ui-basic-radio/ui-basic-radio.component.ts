import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  ControlValueService,
  CustomControlComponent,
  PropsBindingDirective,
} from '../../../public-api';
import { map } from 'rxjs';

@Component({
  selector: 'ui-basic-radio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PropsBindingDirective],
  templateUrl: './ui-basic-radio.component.html',
  styles: [],
})
export class UiBasicRadioComponent extends CustomControlComponent {
  private _controlValueService = inject(ControlValueService);
  override control = new FormControl('');

  @HostBinding('class') hostClass = 'ui-basic';
  
  override writeValue(obj: any): void {
    const value = this._controlValueService.getOptionsValue('stringified', obj);
    this.control.setValue(value);
  }

  override registerOnChange(fn: any): void {
    this.control.valueChanges
      .pipe(map((x) => this._controlValueService.getOptionsValue('parsed', x)))
      .subscribe(fn);
  }
}
