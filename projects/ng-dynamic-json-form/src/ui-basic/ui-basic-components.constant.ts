import { UiComponents } from '../lib/models';
import { UiBasicCheckboxComponent } from './ui-basic-checkbox/ui-basic-checkbox.component';
import { UiBasicDateComponent } from './ui-basic-date/ui-basic-date.component';
import { UiBasicInputMaskComponent } from './ui-basic-input-mask/ui-basic-input-mask.component';
import { UiBasicInputComponent } from './ui-basic-input/ui-basic-input.component';
import { UiBasicRadioComponent } from './ui-basic-radio/ui-basic-radio.component';
import { UiBasicRangeComponent } from './ui-basic-range/ui-basic-range.component';
import { UiBasicSelectComponent } from './ui-basic-select/ui-basic-select.component';
import { UiBasicSwitchComponent } from './ui-basic-switch/ui-basic-switch.component';
import { UiBasicTextareaComponent } from './ui-basic-textarea/ui-basic-textarea.component';

export const UI_BASIC_COMPONENTS: UiComponents = {
  checkbox: UiBasicCheckboxComponent,
  date: UiBasicDateComponent,
  password: UiBasicInputComponent,
  number: UiBasicInputComponent,
  email: UiBasicInputComponent,
  radio: UiBasicRadioComponent,
  range: UiBasicRangeComponent,
  select: UiBasicSelectComponent,
  switch: UiBasicSwitchComponent,
  text: UiBasicInputComponent,
  textMask: UiBasicInputMaskComponent,
  textarea: UiBasicTextareaComponent,
};
