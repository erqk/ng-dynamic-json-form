import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgDynamicJsonFormCustomComponent } from 'ng-dynamic-json-form';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'ui-material-checkbox',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule,
  ],
  templateUrl: './ui-material-checkbox.component.html',
  styles: [],
})
export class UiMaterialCheckboxComponent extends NgDynamicJsonFormCustomComponent {
  onCheckboxChange(e: MatCheckboxChange): void {
    let currentValue = (this.control?.value as any[]) || [];

    if (!e.checked || currentValue.includes(e.source.value)) {
      currentValue = currentValue.filter((x) => x !== e.source.value);
    } else {
      currentValue.push(e.source.value);
    }

    this.control?.setValue(currentValue);
  }
}
