import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  CustomControlComponent,
  PropsBindingDirective,
  providePropsBinding,
} from 'ng-dynamic-json-form';
import { ToggleSwitch, ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'ui-primeng-switch',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PropsBindingDirective,
    ToggleSwitchModule,
  ],
  providers: [
    providePropsBinding([
      {
        key: 'p-toggle-switch',
        token: ToggleSwitch,
      },
    ]),
  ],
  templateUrl: './ui-primeng-switch.component.html',
  styles: [],
})
export class UiPrimengSwitchComponent extends CustomControlComponent {
  override control = new FormControl(false);
  onChange?: any;

  override registerOnChange(fn: any): void {
    this.onChange = fn;
  }
}
