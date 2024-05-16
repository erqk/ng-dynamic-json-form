import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import {
  CustomControlComponent,
  PropsBindingDirective,
} from '../../../public-api';

@Component({
  selector: 'ui-basic-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PropsBindingDirective],
  templateUrl: './ui-basic-input.component.html',
  styles: [],
})
export class UiBasicInputComponent extends CustomControlComponent {
  @HostBinding('class') hostClass = 'ui-basic';
  override control = new UntypedFormControl('');
}
