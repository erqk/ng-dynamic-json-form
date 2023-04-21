import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgDynamicJsonFormCustomComponent } from '../custom-component-base/custom-component-base.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { UiBasicCheckboxComponent } from './ui-basic-checkbox/ui-basic-checkbox.component';
import { UiBasicDropdownComponent } from './ui-basic-dropdown/ui-basic-dropdown.component';
import { UiBasicInputComponent } from './ui-basic-input/ui-basic-input.component';
import { UiBasicRadioComponent } from './ui-basic-radio/ui-basic-radio.component';
import { UiBasicSwitchComponent } from './ui-basic-switch/ui-basic-switch.component';

@Component({
  selector: 'ui-basic',
  templateUrl: './ui-basic.component.html',
  styles: [
    ':host, .ui-basic { display: flex; flex-direction: column; width: 100%;}',
  ],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorMessageComponent,
    UiBasicCheckboxComponent,
    UiBasicDropdownComponent,
    UiBasicInputComponent,
    UiBasicRadioComponent,
    UiBasicSwitchComponent,
  ],
})
export class UiBasicComponent extends NgDynamicJsonFormCustomComponent {}
