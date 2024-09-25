import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { filter, map } from 'rxjs';
import { CustomControlComponent } from '../../components/custom-control/custom-control.component';
import { PropsBindingDirective } from '../../directives';
import { ControlValueService } from '../../services/control-value.service';

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
      .pipe(
        filter(() => this.userInteracted),
        map((x) => this._controlValueService.getOptionsValue('parsed', x))
      )
      .subscribe(fn);
  }
}
