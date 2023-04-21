import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgDynamicJsonFormCustomComponent } from 'ng-dynamic-json-form';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

  ngOnInit(): void {
    this.setValue();
  }

  setValue(): void {
    if (!this.control || !Array.isArray(this.control.value)) {
      return;
    }

    this.selectedItems = [...this.control.value];
  }
  
  onChanged(e: { checked: any[]; originalEvent: Event }): void {
    this.control?.setValue(e.checked);
  }
}
