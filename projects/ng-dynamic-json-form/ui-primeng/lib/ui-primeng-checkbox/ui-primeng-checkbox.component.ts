import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgDynamicJsonFormCustomComponent } from 'ng-dynamic-json-form';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'ui-primeng-checkbox',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CheckboxModule],
  templateUrl: './ui-primeng-checkbox.component.html',
  styles: [],
})
export class UiPrimengCheckboxComponent extends NgDynamicJsonFormCustomComponent {
  selectedItems: any[] = [];

  override ngOnInit(): void {
    super.ngOnInit();
    this.setValue();
  }

  setValue(): void {
    if (!this.control || !Array.isArray(this.control.value)) {
      return;
    }

    this.selectedItems = [...this.control.value];
  }

  onChanged(e: CheckboxChangeEvent): void {
    this.control?.setValue(e.checked);
  }
}
