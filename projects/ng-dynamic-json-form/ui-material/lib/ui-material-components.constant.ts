import { UiComponents } from 'ng-dynamic-json-form';
import { UiMaterialCheckboxComponent } from './ui-material-checkbox/ui-material-checkbox.component';
import { UiMaterialDropdownComponent } from './ui-material-dropdown/ui-material-dropdown.component';
import { UiMaterialInputMaskComponent } from './ui-material-input-mask/ui-material-input-mask.component';
import { UiMaterialInputComponent } from './ui-material-input/ui-material-input.component';
import { UiMaterialRadioComponent } from './ui-material-radio/ui-material-radio.component';
import { UiMaterialRangeComponent } from './ui-material-range/ui-material-range.component';
import { UiMaterialSwitchComponent } from './ui-material-switch/ui-material-switch.component';
import { UiMaterialTextareaComponent } from './ui-material-textarea/ui-material-textarea.component';

export const UI_MATERIAL_COMPONENTS: UiComponents = {
  checkbox: { type: 'material', component: UiMaterialCheckboxComponent },
  dropdown: { type: 'material', component: UiMaterialDropdownComponent },
  password: { type: 'material', component: UiMaterialInputComponent },
  number: { type: 'material', component: UiMaterialInputComponent },
  email: { type: 'material', component: UiMaterialInputComponent },
  radio: { type: 'material', component: UiMaterialRadioComponent },
  range: { type: 'material', component: UiMaterialRangeComponent },
  switch: { type: 'material', component: UiMaterialSwitchComponent },
  text: { type: 'material', component: UiMaterialInputComponent },
  textMask: { type: 'material', component: UiMaterialInputMaskComponent },
  textarea: { type: 'material', component: UiMaterialTextareaComponent },
};
