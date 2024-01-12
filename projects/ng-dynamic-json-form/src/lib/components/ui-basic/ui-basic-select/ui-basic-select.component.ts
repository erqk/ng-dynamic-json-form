import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PropsBindingDirective } from '../../../directives';
import { CustomControlComponent } from '../../custom-control/custom-control.component';

@Component({
  selector: 'ui-basic-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PropsBindingDirective],
  templateUrl: './ui-basic-select.component.html',
  styles: [],
})
export class UiBasicSelectComponent extends CustomControlComponent {
  override control = new FormControl('');
}
