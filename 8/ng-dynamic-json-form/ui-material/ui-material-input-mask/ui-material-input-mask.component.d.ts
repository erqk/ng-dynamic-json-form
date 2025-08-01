import { FormControl } from '@angular/forms';
import { CustomControlComponent } from 'ng-dynamic-json-form';
import * as i0 from "@angular/core";
export declare class UiMaterialInputMaskComponent extends CustomControlComponent {
    control: FormControl<string | null>;
    onChange?: any;
    registerOnChange(fn: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UiMaterialInputMaskComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UiMaterialInputMaskComponent, "ui-material-input-mask", never, {}, {}, never, never, true, never>;
}
