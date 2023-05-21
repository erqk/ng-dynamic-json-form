import { UiBasicCheckboxComponent } from '../components/ui-basic/ui-basic-checkbox/ui-basic-checkbox.component';
import { UiBasicDropdownComponent } from '../components/ui-basic/ui-basic-dropdown/ui-basic-dropdown.component';
import { UiBasicInputMaskComponent } from '../components/ui-basic/ui-basic-input-mask/ui-basic-input-mask.component';
import { UiBasicInputComponent } from '../components/ui-basic/ui-basic-input/ui-basic-input.component';
import { UiBasicRadioComponent } from '../components/ui-basic/ui-basic-radio/ui-basic-radio.component';
import { UiBasicSwitchComponent } from '../components/ui-basic/ui-basic-switch/ui-basic-switch.component';
import { UiBasicTextareaComponent } from '../components/ui-basic/ui-basic-textarea/ui-basic-textarea.component';
import { UiComponents } from '../models/ui-components-type.model';

export const UI_BASIC_COMPONENTS: UiComponents = {
  checkbox: UiBasicCheckboxComponent,
  dropdown: UiBasicDropdownComponent,
  password: UiBasicInputComponent,
  number: UiBasicInputComponent,
  email: UiBasicInputComponent,
  radio: UiBasicRadioComponent,
  switch: UiBasicSwitchComponent,
  text: UiBasicInputComponent,
  textMask: UiBasicInputMaskComponent,
  textarea: UiBasicTextareaComponent,
};
