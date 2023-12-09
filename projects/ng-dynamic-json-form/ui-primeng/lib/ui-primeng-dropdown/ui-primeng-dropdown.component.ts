import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { CustomControlComponent } from 'ng-dynamic-json-form';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'ui-primeng-dropdown',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownModule],
  templateUrl: './ui-primeng-dropdown.component.html',
  styles: [],
})
export class UiPrimengDropdownComponent extends CustomControlComponent {
  override control = new UntypedFormControl('');
}
