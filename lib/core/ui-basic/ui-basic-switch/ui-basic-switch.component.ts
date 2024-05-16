import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  CustomControlComponent,
  PropsBindingDirective,
} from '../../../public-api';

@Component({
  selector: 'ui-basic-switch',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PropsBindingDirective],
  templateUrl: './ui-basic-switch.component.html',
  styles: [],
})
export class UiBasicSwitchComponent extends CustomControlComponent {
  @HostBinding('class') hostClass = 'ui-basic';
  override control = new FormControl(false);
}
