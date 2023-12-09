import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CustomControlComponent } from 'ng-dynamic-json-form';

@Component({
  selector: 'ui-material-dropdown',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './ui-material-dropdown.component.html',
  styles: [],
})
export class UiMaterialDropdownComponent extends CustomControlComponent {
  override control = new UntypedFormControl('');
}
