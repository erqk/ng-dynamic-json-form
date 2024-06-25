import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs';
import { CustomControlComponent } from '../../components/custom-control/custom-control.component';
import { PropsBindingDirective } from '../../directives';
import { ControlValueService } from '../../services/control-value.service';

@Component({
  selector: 'ui-basic-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PropsBindingDirective],
  templateUrl: './ui-basic-select.component.html',
  styles: [],
})
export class UiBasicSelectComponent extends CustomControlComponent {
  private _controlValueService = inject(ControlValueService);

  @HostBinding('class') hostClass = 'ui-basic';

  override control = new FormControl('');

  onTouched = () => {};

  override writeValue(obj: any): void {
    const value = this._controlValueService.getOptionsValue('stringified', obj);
    requestAnimationFrame(() => this.control.setValue(value));
  }

  override registerOnChange(fn: any): void {
    this.control.valueChanges
      .pipe(map((x) => this._controlValueService.getOptionsValue('parsed', x)))
      .subscribe(fn);
  }

  override registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
