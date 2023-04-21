import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ErrorMessageComponent,
  NgDynamicJsonFormCustomComponent,
} from 'ng-dynamic-json-form';
import { UiPrimengCheckboxComponent } from './ui-primeng-checkbox/ui-primeng-checkbox.component';
import { UiPrimengDropdownComponent } from './ui-primeng-dropdown/ui-primeng-dropdown.component';
import { UiPrimengInputComponent } from './ui-primeng-input/ui-primeng-input.component';
import { UiPrimengRadioComponent } from './ui-primeng-radio/ui-primeng-radio.component';
import { UiPrimengSwitchComponent } from './ui-primeng-switch/ui-primeng-switch.component';
import { UiPrimengTextareaComponent } from './ui-primeng-textarea/ui-primeng-textarea.component';

@Component({
  selector: 'ui-primeng',
  templateUrl: './ui-primeng.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ErrorMessageComponent,
    UiPrimengCheckboxComponent,
    UiPrimengDropdownComponent,
    UiPrimengInputComponent,
    UiPrimengRadioComponent,
    UiPrimengSwitchComponent,
    UiPrimengTextareaComponent,
  ],
})
export class UiPrimengComponent extends NgDynamicJsonFormCustomComponent {}
