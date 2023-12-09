import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CustomControlComponent } from 'ng-dynamic-json-form';
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
  selector: 'ui-primeng-switch',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputSwitchModule],
  templateUrl: './ui-primeng-switch.component.html',
  styles: [],
})
export class UiPrimengSwitchComponent extends CustomControlComponent {
  override control = new FormControl(false);
}
