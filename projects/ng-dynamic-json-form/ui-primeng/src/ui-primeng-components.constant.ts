import { UiComponents } from 'ng-dynamic-json-form';
import { UiPrimengCheckboxComponent } from './ui-primeng-checkbox/ui-primeng-checkbox.component';
import { UiPrimengDropdownComponent } from './ui-primeng-dropdown/ui-primeng-dropdown.component';
import { UiPrimengInputComponent } from './ui-primeng-input/ui-primeng-input.component';
import { UiPrimengRadioComponent } from './ui-primeng-radio/ui-primeng-radio.component';
import { UiPrimengSwitchComponent } from './ui-primeng-switch/ui-primeng-switch.component';
import { UiPrimengTextareaComponent } from './ui-primeng-textarea/ui-primeng-textarea.component';
import { UiPrimengInputMaskComponent } from './ui-primeng-input-mask/ui-primeng-input-mask.component';

export const UI_PRIMENG_COMPONENTS: UiComponents = {
  checkbox: UiPrimengCheckboxComponent,
  dropdown: UiPrimengDropdownComponent,
  password: UiPrimengInputComponent,
  number: UiPrimengInputComponent,
  email: UiPrimengInputComponent,
  radio: UiPrimengRadioComponent,
  switch: UiPrimengSwitchComponent,
  text: UiPrimengInputComponent,
  textMask: UiPrimengInputMaskComponent,
  textarea: UiPrimengTextareaComponent,
};
