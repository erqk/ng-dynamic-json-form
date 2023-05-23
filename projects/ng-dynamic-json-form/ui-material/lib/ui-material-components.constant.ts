import { UiComponents } from "ng-dynamic-json-form";
import { UiMaterialCheckboxComponent } from "./ui-material-checkbox/ui-material-checkbox.component";
import { UiMaterialDropdownComponent } from "./ui-material-dropdown/ui-material-dropdown.component";
import { UiMaterialInputComponent } from "./ui-material-input/ui-material-input.component";
import { UiMaterialRadioComponent } from "./ui-material-radio/ui-material-radio.component";
import { UiMaterialSwitchComponent } from "./ui-material-switch/ui-material-switch.component";
import { UiMaterialInputMaskComponent } from "./ui-material-input-mask/ui-material-input-mask.component";
import { UiMaterialTextareaComponent } from "./ui-material-textarea/ui-material-textarea.component";

export const UI_MATERIAL_COMPONENTS: UiComponents = {
    checkbox: UiMaterialCheckboxComponent,
    dropdown: UiMaterialDropdownComponent,
    password: UiMaterialInputComponent,
    number: UiMaterialInputComponent,
    email: UiMaterialInputComponent,
    radio: UiMaterialRadioComponent,
    switch: UiMaterialSwitchComponent,
    text: UiMaterialInputComponent,
    textMask: UiMaterialInputMaskComponent,
    textarea: UiMaterialTextareaComponent,
}