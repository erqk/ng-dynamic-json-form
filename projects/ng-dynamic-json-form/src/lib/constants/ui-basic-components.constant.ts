import { UiBasicCheckboxComponent } from '../components/ui-basic/ui-basic-checkbox/ui-basic-checkbox.component';
import { UiBasicDropdownComponent } from '../components/ui-basic/ui-basic-dropdown/ui-basic-dropdown.component';
import { UiBasicInputMaskComponent } from '../components/ui-basic/ui-basic-input-mask/ui-basic-input-mask.component';
import { UiBasicInputComponent } from '../components/ui-basic/ui-basic-input/ui-basic-input.component';
import { UiBasicRadioComponent } from '../components/ui-basic/ui-basic-radio/ui-basic-radio.component';
import { UiBasicRangeComponent } from '../components/ui-basic/ui-basic-range/ui-basic-range.component';
import { UiBasicSwitchComponent } from '../components/ui-basic/ui-basic-switch/ui-basic-switch.component';
import { UiBasicTextareaComponent } from '../components/ui-basic/ui-basic-textarea/ui-basic-textarea.component';
import { UiComponents } from '../models/ui-components-type.model';

export const UI_BASIC_COMPONENTS: UiComponents = {
  checkbox: { type: 'basic', component: UiBasicCheckboxComponent },
  dropdown: { type: 'basic', component: UiBasicDropdownComponent },
  password: { type: 'basic', component: UiBasicInputComponent },
  number: { type: 'basic', component: UiBasicInputComponent },
  email: { type: 'basic', component: UiBasicInputComponent },
  radio: { type: 'basic', component: UiBasicRadioComponent },
  range: { type: 'basic', component: UiBasicRangeComponent },
  switch: { type: 'basic', component: UiBasicSwitchComponent },
  text: { type: 'basic', component: UiBasicInputComponent },
  textMask: { type: 'basic', component: UiBasicInputMaskComponent },
  textarea: { type: 'basic', component: UiBasicTextareaComponent },
};
