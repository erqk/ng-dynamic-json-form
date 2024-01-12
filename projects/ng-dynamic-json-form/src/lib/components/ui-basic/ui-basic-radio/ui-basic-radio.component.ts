import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PropsBindingDirective } from '../../../directives';
import { CustomControlComponent } from '../../custom-control/custom-control.component';

@Component({
  selector: 'ui-basic-radio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PropsBindingDirective],
  templateUrl: './ui-basic-radio.component.html',
  styles: [],
})
export class UiBasicRadioComponent extends CustomControlComponent {
  override control = new FormControl('');
}
