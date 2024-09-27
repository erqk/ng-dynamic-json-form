import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs';
import { CustomControlComponent } from '../../components/custom-control/custom-control.component';
import { PropsBindingDirective } from '../../directives';
import { ControlValueService } from '../../services/control-value.service';

@Component({
  selector: 'ui-basic-checkbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PropsBindingDirective],
  templateUrl: './ui-basic-checkbox.component.html',
  styles: [],
})
export class UiBasicCheckboxComponent extends CustomControlComponent {
  private _controlValueService = inject(ControlValueService);

  @HostBinding('class') hostClass = 'ui-basic';

  override control = new FormControl<any | any[]>('');

  override writeValue(obj: any): void {
    const value =
      this.data?.options?.data?.length === 1
        ? obj
        : this._controlValueService.getOptionsValue('stringified', obj);

    this.control.setValue(value);
  }

  override registerOnChange(fn: any): void {
    this.control.valueChanges
      .pipe(map((x) => this._controlValueService.getOptionsValue('parsed', x)))
      .subscribe(fn);
  }

  onCheckboxChange(e: Event): void {
    const input = e.target as HTMLInputElement;
    const value = input.value;
    const oldValue = Array.isArray(this.control.value)
      ? this.control.value || []
      : [];
    const removeItem = !input.checked || oldValue.includes(value);
    const newValue = removeItem
      ? oldValue.filter((x: any) => x !== value)
      : [...oldValue, value];

    this.control.setValue(newValue);
  }

  get groupButtonsStyles(): string {
    return `
      flex-direction: ${this.data?.options?.layout ?? 'row'};
      align-items: flex-start;
      ${this.data?.options?.containerStyles ?? ''}
    `.replace(/\s{2,}/g, '');
  }
}
