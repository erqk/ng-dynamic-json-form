import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PropertyBindingDirective } from '../../../directives';
import { CustomControlComponent } from '../../custom-control/custom-control.component';

@Component({
  selector: 'ui-basic-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PropertyBindingDirective],
  templateUrl: './ui-basic-select.component.html',
  styles: [],
})
export class UiBasicSelectComponent extends CustomControlComponent {
  override control = new FormControl('');
}
