import { UiComponents } from 'ng-dynamic-json-form';
import { UiPrimengCheckboxComponent } from './ui-primeng-checkbox/ui-primeng-checkbox.component';
import { UiPrimengDropdownComponent } from './ui-primeng-dropdown/ui-primeng-dropdown.component';
import { UiPrimengInputComponent } from './ui-primeng-input/ui-primeng-input.component';
import { UiPrimengRadioComponent } from './ui-primeng-radio/ui-primeng-radio.component';
import { UiPrimengSwitchComponent } from './ui-primeng-switch/ui-primeng-switch.component';
import { UiPrimengTextareaComponent } from './ui-primeng-textarea/ui-primeng-textarea.component';
import { UiPrimengInputMaskComponent } from './ui-primeng-input-mask/ui-primeng-input-mask.component';
import { UiPrimengRangeComponent } from './ui-primeng-range/ui-primeng-range.component';
import { UiPrimengDateComponent } from './ui-primeng-date/ui-primeng-date.component';

export const UI_PRIMENG_COMPONENTS: UiComponents = {
  checkbox: { type: 'primeng', component: UiPrimengCheckboxComponent },
  date: { type: 'primeng', component: UiPrimengDateComponent },
  dropdown: { type: 'primeng', component: UiPrimengDropdownComponent },
  password: { type: 'primeng', component: UiPrimengInputComponent },
  number: { type: 'primeng', component: UiPrimengInputComponent },
  email: { type: 'primeng', component: UiPrimengInputComponent },
  radio: { type: 'primeng', component: UiPrimengRadioComponent },
  range: { type: 'primeng', component: UiPrimengRangeComponent },
  switch: { type: 'primeng', component: UiPrimengSwitchComponent },
  text: { type: 'primeng', component: UiPrimengInputComponent },
  textMask: { type: 'primeng', component: UiPrimengInputMaskComponent },
  textarea: { type: 'primeng', component: UiPrimengTextareaComponent },
};
