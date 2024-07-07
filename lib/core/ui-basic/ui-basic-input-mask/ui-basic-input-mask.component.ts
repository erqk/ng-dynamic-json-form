import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IMaskDirective } from 'angular-imask';
import { CustomControlComponent } from '../../components/custom-control/custom-control.component';
import {
  ImaskValuePatchDirective,
  PropsBindingDirective,
} from '../../directives';
@Component({
  selector: 'ui-basic-input-mask',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IMaskDirective,
    ImaskValuePatchDirective,
    PropsBindingDirective,
  ],
  templateUrl: './ui-basic-input-mask.component.html',
  styles: [],
})
export class UiBasicInputMaskComponent extends CustomControlComponent {
  @HostBinding('class') hostClass = 'ui-basic';
  override control = new FormControl('');
}
