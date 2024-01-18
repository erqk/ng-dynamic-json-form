import { UiComponents } from 'ng-dynamic-json-form';
import { UiPrimengCheckboxComponent } from './ui-primeng-checkbox/ui-primeng-checkbox.component';
import { UiPrimengSelectComponent } from './ui-primeng-select/ui-primeng-select.component';
import { UiPrimengInputComponent } from './ui-primeng-input/ui-primeng-input.component';
import { UiPrimengRadioComponent } from './ui-primeng-radio/ui-primeng-radio.component';
import { UiPrimengSwitchComponent } from './ui-primeng-switch/ui-primeng-switch.component';
import { UiPrimengTextareaComponent } from './ui-primeng-textarea/ui-primeng-textarea.component';
import { UiPrimengInputMaskComponent } from './ui-primeng-input-mask/ui-primeng-input-mask.component';
import { UiPrimengRangeComponent } from './ui-primeng-range/ui-primeng-range.component';
import { UiPrimengDateComponent } from './ui-primeng-date/ui-primeng-date.component';

export const UI_PRIMENG_COMPONENTS: UiComponents = {
  checkbox: UiPrimengCheckboxComponent,
  date: UiPrimengDateComponent,
  password: UiPrimengInputComponent,
  number: UiPrimengInputComponent,
  email: UiPrimengInputComponent,
  radio: UiPrimengRadioComponent,
  range: UiPrimengRangeComponent,
  select: UiPrimengSelectComponent,
  switch: UiPrimengSwitchComponent,
  text: UiPrimengInputComponent,
  textMask: UiPrimengInputMaskComponent,
  textarea: UiPrimengTextareaComponent,
};
