import { UiComponents } from 'ng-dynamic-json-form';
import { UiMaterialCheckboxComponent } from './ui-material-checkbox/ui-material-checkbox.component';
import { UiMaterialSelectComponent } from './ui-material-select/ui-material-select.component';
import { UiMaterialInputMaskComponent } from './ui-material-input-mask/ui-material-input-mask.component';
import { UiMaterialInputComponent } from './ui-material-input/ui-material-input.component';
import { UiMaterialRadioComponent } from './ui-material-radio/ui-material-radio.component';
import { UiMaterialRangeComponent } from './ui-material-range/ui-material-range.component';
import { UiMaterialSwitchComponent } from './ui-material-switch/ui-material-switch.component';
import { UiMaterialTextareaComponent } from './ui-material-textarea/ui-material-textarea.component';
import { UiMaterialDateComponent } from './ui-material-date/ui-material-date.component';

export const UI_MATERIAL_COMPONENTS: UiComponents = {
  checkbox: UiMaterialCheckboxComponent,
  date: UiMaterialDateComponent,
  password: UiMaterialInputComponent,
  number: UiMaterialInputComponent,
  email: UiMaterialInputComponent,
  radio: UiMaterialRadioComponent,
  range: UiMaterialRangeComponent,
  select: UiMaterialSelectComponent,
  switch: UiMaterialSwitchComponent,
  text: UiMaterialInputComponent,
  textMask: UiMaterialInputMaskComponent,
  textarea: UiMaterialTextareaComponent,
};
